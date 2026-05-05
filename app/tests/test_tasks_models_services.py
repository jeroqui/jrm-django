from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone

from app.models import Task, TaskGroup, TaskReschedule
from app.services.tasks import (
    needs_cleanup,
    get_pending_past_tasks,
    complete_task,
    discard_task,
    reschedule_task,
    flatten_task_tree,
    get_task_stats,
    build_stats_chart_data,
)

User = get_user_model()


class TaskModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass"
        )

    def test_default_status_is_pending(self):
        task = Task.objects.create(user=self.user, title="Test")
        self.assertEqual(task.status, Task.Status.PENDING)

    def test_get_all_descendants_empty_for_leaf(self):
        task = Task.objects.create(user=self.user, title="Leaf")
        self.assertEqual(task.get_all_descendants(), [])

    def test_get_all_descendants_returns_all_levels(self):
        parent = Task.objects.create(user=self.user, title="Parent")
        child = Task.objects.create(user=self.user, title="Child", parent=parent)
        grandchild = Task.objects.create(user=self.user, title="Grandchild", parent=child)

        descendants = parent.get_all_descendants()
        self.assertIn(child, descendants)
        self.assertIn(grandchild, descendants)
        self.assertEqual(len(descendants), 2)

    def test_task_reschedule_str(self):
        task = Task.objects.create(
            user=self.user, title="Reschedule me", scheduled_date=date(2026, 1, 1)
        )
        r = TaskReschedule.objects.create(
            task=task, from_date=date(2026, 1, 1), to_date=date(2026, 1, 3)
        )
        self.assertIn("Reschedule me", str(r))
        self.assertIn("2026-01-01", str(r))


class TaskServiceTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass"
        )
        self.today = date(2026, 5, 5)
        self.yesterday = self.today - timedelta(days=1)

    def _task(self, title="Task", scheduled_date=None, parent=None):
        return Task.objects.create(
            user=self.user,
            title=title,
            scheduled_date=scheduled_date or self.today,
            parent=parent,
        )

    def test_needs_cleanup_false_when_no_past_pending(self):
        self._task("Today task", scheduled_date=self.today)
        self.assertFalse(needs_cleanup(user=self.user, today=self.today))

    def test_needs_cleanup_true_when_past_pending_exists(self):
        self._task("Old task", scheduled_date=self.yesterday)
        self.assertTrue(needs_cleanup(user=self.user, today=self.today))

    def test_needs_cleanup_false_when_past_task_completed(self):
        task = self._task("Old completed", scheduled_date=self.yesterday)
        task.status = Task.Status.COMPLETED
        task.save()
        self.assertFalse(needs_cleanup(user=self.user, today=self.today))

    def test_get_pending_past_tasks_returns_only_past_pending(self):
        past = self._task("Past", scheduled_date=self.yesterday)
        self._task("Today", scheduled_date=self.today)
        results = get_pending_past_tasks(user=self.user, today=self.today)
        self.assertEqual(results, [past])

    def test_complete_task_cascades_to_descendants(self):
        parent = self._task("Parent")
        child1 = self._task("Child1", parent=parent)
        child2 = self._task("Child2", parent=parent)
        grandchild = self._task("Grandchild", parent=child1)

        complete_task(task=parent)

        for pk in [parent.pk, child1.pk, child2.pk, grandchild.pk]:
            t = Task.objects.get(pk=pk)
            self.assertEqual(t.status, Task.Status.COMPLETED)

    def test_discard_task_cascades_with_reason(self):
        parent = self._task("Parent")
        child = self._task("Child", parent=parent)

        discard_task(task=parent, reason="not needed")

        parent.refresh_from_db()
        child.refresh_from_db()
        self.assertEqual(parent.status, Task.Status.DISCARDED)
        self.assertEqual(child.status, Task.Status.DISCARDED)
        self.assertEqual(parent.discard_reason, "not needed")
        self.assertEqual(child.discard_reason, "not needed")

    def test_reschedule_task_creates_record_and_updates_date(self):
        task = self._task("Move me", scheduled_date=self.yesterday)
        new_date = self.today + timedelta(days=1)

        record = reschedule_task(task=task, to_date=new_date)

        task.refresh_from_db()
        self.assertEqual(task.scheduled_date, new_date)
        self.assertIsInstance(record, TaskReschedule)
        self.assertEqual(record.from_date, self.yesterday)
        self.assertEqual(record.to_date, new_date)

    def test_reschedule_preserves_original_from_date(self):
        task = self._task("Multi-reschedule", scheduled_date=date(2026, 4, 1))
        reschedule_task(task=task, to_date=date(2026, 4, 10))
        record2 = reschedule_task(task=task, to_date=date(2026, 4, 20))
        self.assertEqual(record2.from_date, date(2026, 4, 10))

    def test_flatten_task_tree_depth_first_order(self):
        parent = self._task("Parent")
        child = self._task("Child", parent=parent)
        self._task("Sibling")  # separate root

        nodes = flatten_task_tree(
            list(Task.objects.filter(user=self.user).order_by("title"))
        )
        titles = [n.task.title for n in nodes]
        parent_idx = titles.index("Parent")
        child_idx = titles.index("Child")
        self.assertLess(parent_idx, child_idx)

    def test_flatten_task_tree_depth_values(self):
        parent = self._task("Parent")
        child = self._task("Child", parent=parent)
        grandchild = self._task("Grandchild", parent=child)

        nodes = flatten_task_tree(
            list(Task.objects.filter(user=self.user).order_by("title"))
        )
        by_title = {n.task.title: n for n in nodes}
        self.assertEqual(by_title["Parent"].depth, 0)
        self.assertEqual(by_title["Child"].depth, 1)
        self.assertEqual(by_title["Grandchild"].depth, 2)

    def test_get_task_stats_counts_correctly(self):
        t1 = self._task("Done", scheduled_date=self.today)
        t1.status = Task.Status.COMPLETED
        t1.save()
        self._task("Pending", scheduled_date=self.today)

        stats = get_task_stats(user=self.user, days=1)
        self.assertEqual(len(stats), 1)
        s = stats[0]
        self.assertEqual(s.date, self.today)
        self.assertEqual(s.scheduled, 2)
        self.assertEqual(s.completed, 1)
        self.assertEqual(s.discarded, 0)

    def test_build_stats_chart_data_has_required_keys(self):
        stats = get_task_stats(user=self.user, days=7)
        chart = build_stats_chart_data(stats)
        self.assertIn("stats", chart)
        self.assertIn("max_scheduled", chart)
        self.assertIn("chart_height", chart)
        self.assertIn("today", chart)
