from __future__ import annotations

from dataclasses import dataclass
from datetime import date, timedelta
from typing import Iterable, List, Optional

from django.db.models import Prefetch

from app.models import Habit, HabitCompletion


@dataclass
class DaySummary:
    date: date
    total_habits: int
    completed_habits: int

    @property
    def completion_rate(self) -> Optional[float]:
        if self.total_habits == 0:
            return None
        return self.completed_habits / self.total_habits

    @property
    def level(self) -> str:
        """
        Map completion rate to a discrete level for calendar coloring.
        """
        rate = self.completion_rate
        if rate is None:
            return "empty"
        if rate == 0:
            return "level-0"
        if rate <= 0.25:
            return "level-1"
        if rate <= 0.5:
            return "level-2"
        if rate <= 0.75:
            return "level-3"
        return "level-4"


def _date_range(start: date, end: date) -> Iterable[date]:
    current = start
    while current <= end:
        yield current
        current += timedelta(days=1)


def build_habit_calendar(user, days: int = 365, today: Optional[date] = None) -> List[DaySummary]:
    """
    Build a per-day summary for the given user over the last `days` days.

    Only habits that are active on a given day are counted when calculating
    completion percentage.
    """
    if today is None:
        today = date.today()
    start_date = today - timedelta(days=days - 1)

    habits = list(
        Habit.objects.filter(user=user).prefetch_related(
            Prefetch(
                "completions",
                queryset=HabitCompletion.objects.filter(
                    date__range=(start_date, today), completed=True
                ),
            )
        )
    )

    completions_by_day: dict[date, set[int]] = {}
    for habit in habits:
        for completion in habit.completions.all():
            completions_by_day.setdefault(completion.date, set()).add(habit.id)

    summaries: List[DaySummary] = []
    for day in _date_range(start_date, today):
        active_habits = [h for h in habits if h.is_active_on(day)]
        total = len(active_habits)
        completed = 0
        if total:
            completed_ids = completions_by_day.get(day, set())
            completed = sum(1 for h in active_habits if h.id in completed_ids)

        summaries.append(
            DaySummary(
                date=day,
                total_habits=total,
                completed_habits=completed,
            )
        )

    return summaries


def group_calendar_by_week(summaries: List[DaySummary]) -> List[list[Optional[DaySummary]]]:
    """
    Group a flat list of DaySummary objects into weeks for calendar display.

    Returned structure is a list of weeks, each week is a list of up to 7
    DaySummary instances or None (for leading/trailing padding cells).
    """
    if not summaries:
        return []

    weeks: List[list[Optional[DaySummary]]] = []
    current_week: list[Optional[DaySummary]] = []

    first_weekday = summaries[0].date.weekday()  # Monday=0
    for _ in range(first_weekday):
        current_week.append(None)

    for summary in summaries:
        if len(current_week) == 7:
            weeks.append(current_week)
            current_week = []
        current_week.append(summary)

    if current_week:
        while len(current_week) < 7:
            current_week.append(None)
        weeks.append(current_week)

    return weeks

