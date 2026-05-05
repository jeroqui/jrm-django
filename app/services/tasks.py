from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, timedelta
from typing import Optional

from django.db import transaction
from django.utils import timezone

from app.models import Task, TaskGroup, TaskReschedule

# SVG chart constants
_BAR_MAX_HEIGHT = 140
_CHART_HEIGHT = 180


@dataclass
class TaskDayStat:
    date: date
    scheduled: int
    completed: int
    discarded: int
    rescheduled: int
    bar_heights: dict = field(default_factory=dict)

    @property
    def completion_rate(self) -> Optional[float]:
        if self.scheduled == 0:
            return None
        return self.completed / self.scheduled


@dataclass
class FlatTaskNode:
    task: Task
    depth: int
    indent_rem: float  # pre-computed depth * 1.5


def needs_cleanup(*, user, today: Optional[date] = None) -> bool:
    if today is None:
        today = timezone.localdate()
    return Task.objects.filter(
        user=user,
        status=Task.Status.PENDING,
        scheduled_date__lt=today,
    ).exists()


def get_pending_past_tasks(*, user, today: Optional[date] = None) -> list[Task]:
    if today is None:
        today = timezone.localdate()
    return list(
        Task.objects.filter(
            user=user,
            status=Task.Status.PENDING,
            scheduled_date__lt=today,
        )
        .select_related("group", "parent")
        .order_by("scheduled_date", "title")
    )


@transaction.atomic
def complete_task(*, task: Task) -> None:
    ids = [task.id] + [d.id for d in task.get_all_descendants()]
    Task.objects.filter(id__in=ids).update(
        status=Task.Status.COMPLETED,
        updated_at=timezone.now(),
    )


@transaction.atomic
def discard_task(*, task: Task, reason: str) -> None:
    ids = [task.id] + [d.id for d in task.get_all_descendants()]
    Task.objects.filter(id__in=ids).update(
        status=Task.Status.DISCARDED,
        discard_reason=reason,
        updated_at=timezone.now(),
    )


@transaction.atomic
def reschedule_task(*, task: Task, to_date: date) -> TaskReschedule:
    from_date = task.scheduled_date
    task.scheduled_date = to_date
    task.save(update_fields=["scheduled_date", "updated_at"])
    return TaskReschedule.objects.create(task=task, from_date=from_date, to_date=to_date)


def get_tasks_for_date(*, user, target_date: date) -> list[Task]:
    return list(
        Task.objects.filter(user=user, scheduled_date=target_date)
        .select_related("group", "parent")
        .prefetch_related("subtasks__group")
        .order_by("group__name", "title")
    )


def flatten_task_tree(tasks: list[Task]) -> list[FlatTaskNode]:
    """
    Convert a list of tasks (for a single day) into a flat depth-annotated list
    ordered depth-first: parent, child1, grandchild1, child2, etc.
    Only root-level tasks (no parent, or parent not in this list) are entry points.
    """
    task_ids = {t.id for t in tasks}
    by_id = {t.id: t for t in tasks}

    roots = [t for t in tasks if t.parent_id is None or t.parent_id not in task_ids]

    result: list[FlatTaskNode] = []

    def _walk(task: Task, depth: int) -> None:
        result.append(FlatTaskNode(task=task, depth=depth, indent_rem=depth * 1.5))
        children = [t for t in tasks if t.parent_id == task.id]
        children.sort(key=lambda t: t.title)
        for child in children:
            _walk(child, depth + 1)

    for root in roots:
        _walk(root, 0)

    return result


def get_task_stats(*, user, days: int = 30) -> list[TaskDayStat]:
    today = timezone.localdate()
    start = today - timedelta(days=days - 1)

    tasks = list(
        Task.objects.filter(
            user=user,
            scheduled_date__range=(start, today),
        ).values("id", "status", "scheduled_date")
    )

    reschedule_counts: dict[date, int] = {}
    for r in TaskReschedule.objects.filter(
        task__user=user,
        from_date__range=(start, today),
    ).values("from_date"):
        d = r["from_date"]
        reschedule_counts[d] = reschedule_counts.get(d, 0) + 1

    daily: dict[date, dict] = {}
    for day_offset in range(days):
        d = start + timedelta(days=day_offset)
        daily[d] = {"scheduled": 0, "completed": 0, "discarded": 0}

    for t in tasks:
        d = t["scheduled_date"]
        if d in daily:
            daily[d]["scheduled"] += 1
            if t["status"] == Task.Status.COMPLETED:
                daily[d]["completed"] += 1
            elif t["status"] == Task.Status.DISCARDED:
                daily[d]["discarded"] += 1

    max_scheduled = max((v["scheduled"] for v in daily.values()), default=1) or 1

    stats = []
    for d in sorted(daily):
        v = daily[d]
        rescheduled = reschedule_counts.get(d, 0)
        bar_heights = {
            "scheduled": int(v["scheduled"] / max_scheduled * _BAR_MAX_HEIGHT),
            "completed": int(v["completed"] / max_scheduled * _BAR_MAX_HEIGHT),
            "discarded": int(v["discarded"] / max_scheduled * _BAR_MAX_HEIGHT),
            "rescheduled": int(rescheduled / max_scheduled * _BAR_MAX_HEIGHT),
        }
        stats.append(
            TaskDayStat(
                date=d,
                scheduled=v["scheduled"],
                completed=v["completed"],
                discarded=v["discarded"],
                rescheduled=rescheduled,
                bar_heights=bar_heights,
            )
        )

    return stats


def build_stats_chart_data(stats: list[TaskDayStat]) -> dict:
    max_scheduled = max((s.scheduled for s in stats), default=0)
    return {
        "stats": stats,
        "max_scheduled": max_scheduled,
        "chart_height": _CHART_HEIGHT,
        "today": timezone.localdate(),
    }
