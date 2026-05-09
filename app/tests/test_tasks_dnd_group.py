"""
End-to-end tests for the drag-and-drop group-inference feature in the tasks page.

The drag-and-drop logic lives in frontend/src/ts/tasks.ts.  After every drop the
browser calls task_api_reorder with a JSON ``items`` list.  The key rule: the
``group_id`` key is included in the dragged item's entry *only when the group
changed*; all other items omit the key so their group is left untouched.

These tests exercise the backend endpoint directly (as the JS would call it) and
verify both the immediate JSON response and the persisted database state — which
covers "persists after reload" as well.

The three scenarios from the feature spec:
  1. Drag into group   – ungrouped task dropped next to a grouped task
                         → task joins that group
  2. Drag out of group – grouped task dropped next to an ungrouped task
                         → task loses its group (group_id = null)
  3. Reorder within    – grouped task dropped onto another task in the *same* group
                         → task keeps its group (group_id key omitted entirely)
"""

import json

from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse
from django.utils import timezone

from app.models import Task, TaskGroup

User = get_user_model()


class DndGroupTestBase(TestCase):
    """Shared setUp: one staff user, today's date, the reorder URL."""

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="staff", email="staff@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)
        self.today = timezone.localdate()
        self.url = reverse("app:task_api_reorder")

    # ── helpers ──────────────────────────────────────────────────────────────

    def _task(self, title, order=0, group=None):
        return Task.objects.create(
            user=self.user,
            title=title,
            scheduled_date=self.today,
            order=order,
            group=group,
        )

    def _group(self, name="Work", color="orange"):
        return TaskGroup.objects.create(user=self.user, name=name, color=color)

    def _reorder(self, items):
        """POST the reorder endpoint with a JSON items list and return parsed JSON."""
        response = self.client.post(self.url, {"items": json.dumps(items)})
        return response, response.json()


# ─── Scenario 1: drag ungrouped task INTO a group ─────────────────────────────

class DragIntoGroupTests(DndGroupTestBase):
    """
    An ungrouped task is dragged and dropped next to a grouped task.

    JS behaviour: the dragged item's entry in the reorder payload includes
    ``group_id: <id>`` (the target's group id); all other items omit group_id.
    Expected result: the dragged task's group is set to that group.
    """

    def _setup_tasks(self):
        group = self._group("Work")
        ungrouped = self._task("Ungrouped", order=0)
        grouped_a = self._task("Grouped A", order=1, group=group)
        grouped_b = self._task("Grouped B", order=2, group=group)
        return group, ungrouped, grouped_a, grouped_b

    def test_drop_before_grouped_task_assigns_group(self):
        """Drop ungrouped task BEFORE a grouped task → joins that group."""
        group, ungrouped, grouped_a, grouped_b = self._setup_tasks()

        # Simulates: ungrouped moved to position 0 (before grouped_a)
        # group_id included for ungrouped because its group changed (None → group)
        items = [
            {"id": ungrouped.pk, "order": 0, "group_id": group.pk},
            {"id": grouped_a.pk, "order": 1},
            {"id": grouped_b.pk, "order": 2},
        ]
        response, data = self._reorder(items)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(data["ok"])

        ungrouped.refresh_from_db()
        self.assertEqual(ungrouped.group, group,
                         "Ungrouped task should have joined the group after drag")
        self.assertEqual(ungrouped.order, 0)

    def test_drop_after_grouped_task_assigns_group(self):
        """Drop ungrouped task AFTER a grouped task → joins that group."""
        group, ungrouped, grouped_a, grouped_b = self._setup_tasks()

        # Simulates: ungrouped moved to position 2 (after grouped_a)
        items = [
            {"id": grouped_a.pk, "order": 0},
            {"id": ungrouped.pk, "order": 1, "group_id": group.pk},
            {"id": grouped_b.pk, "order": 2},
        ]
        response, data = self._reorder(items)

        self.assertTrue(data["ok"])
        ungrouped.refresh_from_db()
        self.assertEqual(ungrouped.group, group)
        self.assertEqual(ungrouped.order, 1)

    def test_grouped_tasks_not_affected_by_drag(self):
        """Tasks whose entries omit group_id must not lose their existing group."""
        group, ungrouped, grouped_a, grouped_b = self._setup_tasks()

        items = [
            {"id": ungrouped.pk, "order": 0, "group_id": group.pk},
            {"id": grouped_a.pk, "order": 1},
            {"id": grouped_b.pk, "order": 2},
        ]
        self._reorder(items)

        grouped_a.refresh_from_db()
        grouped_b.refresh_from_db()
        self.assertEqual(grouped_a.group, group, "grouped_a should keep its group")
        self.assertEqual(grouped_b.group, group, "grouped_b should keep its group")

    def test_drag_into_group_persists_after_second_fetch(self):
        """
        Simulate 'persists after reload': after the reorder call the DB record
        must have the new group, verifiable by a fresh queryset lookup.
        """
        group, ungrouped, grouped_a, _ = self._setup_tasks()
        items = [
            {"id": ungrouped.pk, "order": 0, "group_id": group.pk},
            {"id": grouped_a.pk, "order": 1},
        ]
        self._reorder(items)

        # Fresh DB lookup — no cached object
        persisted = Task.objects.get(pk=ungrouped.pk)
        self.assertEqual(persisted.group_id, group.pk)

    def test_drag_into_group_returns_ok_true(self):
        group, ungrouped, grouped_a, _ = self._setup_tasks()
        items = [{"id": ungrouped.pk, "order": 0, "group_id": group.pk}]
        _, data = self._reorder(items)
        self.assertEqual(data, {"ok": True})


# ─── Scenario 2: drag grouped task OUT of a group ────────────────────────────

class DragOutOfGroupTests(DndGroupTestBase):
    """
    A grouped task is dragged and dropped next to an ungrouped task.

    JS behaviour: the dragged item's entry includes ``group_id: null``; other
    items omit the key.
    Expected result: the dragged task's group is cleared (NULL in DB).
    """

    def _setup_tasks(self):
        group = self._group("Work")
        ungrouped_a = self._task("Ungrouped A", order=0)
        ungrouped_b = self._task("Ungrouped B", order=1)
        grouped = self._task("Grouped", order=2, group=group)
        return group, ungrouped_a, ungrouped_b, grouped

    def test_drop_before_ungrouped_task_removes_group(self):
        """Drop grouped task BEFORE an ungrouped task → group cleared."""
        group, ungrouped_a, ungrouped_b, grouped = self._setup_tasks()

        # Simulates: grouped moved to position 0, group changes to null
        items = [
            {"id": grouped.pk, "order": 0, "group_id": None},
            {"id": ungrouped_a.pk, "order": 1},
            {"id": ungrouped_b.pk, "order": 2},
        ]
        response, data = self._reorder(items)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(data["ok"])

        grouped.refresh_from_db()
        self.assertIsNone(grouped.group,
                          "Grouped task should have lost its group after drag out")
        self.assertEqual(grouped.order, 0)

    def test_drop_after_ungrouped_task_removes_group(self):
        """Drop grouped task AFTER an ungrouped task → group cleared."""
        group, ungrouped_a, ungrouped_b, grouped = self._setup_tasks()

        items = [
            {"id": ungrouped_a.pk, "order": 0},
            {"id": grouped.pk, "order": 1, "group_id": None},
            {"id": ungrouped_b.pk, "order": 2},
        ]
        _, data = self._reorder(items)

        self.assertTrue(data["ok"])
        grouped.refresh_from_db()
        self.assertIsNone(grouped.group)
        self.assertEqual(grouped.order, 1)

    def test_ungrouped_tasks_unchanged_during_drag_out(self):
        """Tasks without group_id in payload must not acquire a group."""
        group, ungrouped_a, ungrouped_b, grouped = self._setup_tasks()
        items = [
            {"id": grouped.pk, "order": 0, "group_id": None},
            {"id": ungrouped_a.pk, "order": 1},
            {"id": ungrouped_b.pk, "order": 2},
        ]
        self._reorder(items)

        ungrouped_a.refresh_from_db()
        ungrouped_b.refresh_from_db()
        self.assertIsNone(ungrouped_a.group)
        self.assertIsNone(ungrouped_b.group)

    def test_drag_out_persists_after_second_fetch(self):
        """Fresh DB lookup confirms group removal is durable."""
        group, ungrouped_a, _, grouped = self._setup_tasks()
        items = [
            {"id": grouped.pk, "order": 0, "group_id": None},
            {"id": ungrouped_a.pk, "order": 1},
        ]
        self._reorder(items)

        persisted = Task.objects.get(pk=grouped.pk)
        self.assertIsNone(persisted.group_id)

    def test_drag_out_returns_ok_true(self):
        group, ungrouped_a, _, grouped = self._setup_tasks()
        items = [{"id": grouped.pk, "order": 0, "group_id": None}]
        _, data = self._reorder(items)
        self.assertEqual(data, {"ok": True})


# ─── Scenario 3: reorder within the same group ───────────────────────────────

class ReorderWithinGroupTests(DndGroupTestBase):
    """
    A grouped task is dragged onto another task that belongs to the same group.

    JS behaviour: the dragged item's group has NOT changed so ``group_id`` is
    *omitted* from the payload entirely.  The task must keep its group and only
    its ``order`` field changes.
    """

    def _setup_tasks(self):
        group = self._group("Work")
        task_a = self._task("Task A", order=0, group=group)
        task_b = self._task("Task B", order=1, group=group)
        task_c = self._task("Task C", order=2, group=group)
        return group, task_a, task_b, task_c

    def test_reorder_within_group_preserves_group(self):
        """Swap two tasks within a group; both must keep the group."""
        group, task_a, task_b, task_c = self._setup_tasks()

        # Move task_c to the front (no group_id key → group unchanged)
        items = [
            {"id": task_c.pk, "order": 0},
            {"id": task_a.pk, "order": 1},
            {"id": task_b.pk, "order": 2},
        ]
        response, data = self._reorder(items)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(data["ok"])

        task_a.refresh_from_db()
        task_b.refresh_from_db()
        task_c.refresh_from_db()
        self.assertEqual(task_a.group, group, "task_a should keep its group")
        self.assertEqual(task_b.group, group, "task_b should keep its group")
        self.assertEqual(task_c.group, group, "task_c should keep its group")

    def test_reorder_within_group_updates_order(self):
        """The order field must reflect the new position."""
        group, task_a, task_b, task_c = self._setup_tasks()

        # Move task_b to the front
        items = [
            {"id": task_b.pk, "order": 0},
            {"id": task_a.pk, "order": 1},
            {"id": task_c.pk, "order": 2},
        ]
        self._reorder(items)

        task_a.refresh_from_db()
        task_b.refresh_from_db()
        task_c.refresh_from_db()
        self.assertEqual(task_b.order, 0)
        self.assertEqual(task_a.order, 1)
        self.assertEqual(task_c.order, 2)

    def test_reorder_within_group_persists_after_second_fetch(self):
        """Fresh DB query confirms both new order and preserved group."""
        group, task_a, task_b, task_c = self._setup_tasks()
        items = [
            {"id": task_c.pk, "order": 0},
            {"id": task_a.pk, "order": 1},
            {"id": task_b.pk, "order": 2},
        ]
        self._reorder(items)

        for pk, expected_order in [(task_c.pk, 0), (task_a.pk, 1), (task_b.pk, 2)]:
            t = Task.objects.get(pk=pk)
            self.assertEqual(t.order, expected_order)
            self.assertEqual(t.group_id, group.pk,
                             f"Task {t.title} should still belong to group after reorder")


# ─── Cross-scenario: mixed payload (one task changes group, others don't) ─────

class MixedPayloadTests(DndGroupTestBase):
    """
    Realistic payloads contain a mix of entries: one with group_id (the dragged
    task) and many without (the bystanders).  Verify only the dragged task is
    mutated.
    """

    def test_only_dragged_task_group_changes(self):
        """
        A three-task list: two are in a group; one ungrouped is dragged INTO
        the group.  The two already-grouped tasks must not change.
        """
        group = self._group("Work")
        ungrouped = self._task("Ungrouped", order=0)
        grouped_a = self._task("Grouped A", order=1, group=group)
        grouped_b = self._task("Grouped B", order=2, group=group)

        items = [
            {"id": grouped_a.pk, "order": 0},            # bystander
            {"id": ungrouped.pk, "order": 1, "group_id": group.pk},  # dragged
            {"id": grouped_b.pk, "order": 2},            # bystander
        ]
        _, data = self._reorder(items)

        self.assertTrue(data["ok"])

        ungrouped.refresh_from_db()
        grouped_a.refresh_from_db()
        grouped_b.refresh_from_db()

        self.assertEqual(ungrouped.group, group)
        self.assertEqual(grouped_a.group, group)
        self.assertEqual(grouped_b.group, group)

    def test_drag_between_two_different_groups(self):
        """
        Task moves from group_a to group_b.  Its entry has group_id = group_b.pk.
        Other tasks in both groups must be unchanged.
        """
        group_a = self._group("Group A", color="red")
        group_b = self._group("Group B", color="blue")
        task_in_a = self._task("In A", order=0, group=group_a)
        other_in_a = self._task("Other in A", order=1, group=group_a)
        task_in_b = self._task("In B", order=2, group=group_b)

        # Drag task_in_a to after task_in_b (into group_b)
        items = [
            {"id": other_in_a.pk, "order": 0},
            {"id": task_in_b.pk, "order": 1},
            {"id": task_in_a.pk, "order": 2, "group_id": group_b.pk},
        ]
        _, data = self._reorder(items)

        self.assertTrue(data["ok"])

        task_in_a.refresh_from_db()
        other_in_a.refresh_from_db()
        task_in_b.refresh_from_db()

        self.assertEqual(task_in_a.group, group_b, "task_in_a should have moved to group_b")
        self.assertEqual(other_in_a.group, group_a, "other_in_a should still be in group_a")
        self.assertEqual(task_in_b.group, group_b, "task_in_b should still be in group_b")


# ─── Security: isolation from other users ────────────────────────────────────

class DndGroupSecurityTests(DndGroupTestBase):
    """
    Drag-and-drop must not allow one user to affect another user's tasks or
    assign another user's groups to their own tasks.
    """

    def test_cannot_assign_other_users_group_via_reorder(self):
        """Supplying another user's group_id in the payload is silently ignored."""
        other = User.objects.create_user(username="other", password="p", is_staff=True)
        other_group = TaskGroup.objects.create(user=other, name="Private", color="red")
        task = self._task("Mine", order=0)

        items = [{"id": task.pk, "order": 0, "group_id": other_group.pk}]
        _, data = self._reorder(items)

        self.assertTrue(data["ok"])
        task.refresh_from_db()
        self.assertIsNone(task.group,
                          "Assigning another user's group via reorder must be silently ignored")

    def test_cannot_reorder_other_users_task(self):
        """Supplying another user's task id in the payload must not change that task."""
        other = User.objects.create_user(username="other2", password="p", is_staff=True)
        group = self._group()
        other_task = Task.objects.create(
            user=other, title="Other", scheduled_date=self.today, order=99, group=group
        )

        # Attempt to strip the group from another user's task
        items = [{"id": other_task.pk, "order": 0, "group_id": None}]
        self._reorder(items)

        other_task.refresh_from_db()
        self.assertEqual(other_task.order, 99, "Other user's order must not change")
        self.assertEqual(other_task.group_id, group.pk,
                         "Other user's group must not be cleared")

    def test_non_staff_user_gets_403(self):
        """Non-staff users must be rejected."""
        self.client.logout()
        regular = User.objects.create_user(username="regular", password="p", is_staff=False)
        self.client.force_login(regular)
        task = Task.objects.create(user=self.user, title="T", scheduled_date=self.today)
        response, data = self._reorder([{"id": task.pk, "order": 0, "group_id": None}])
        self.assertEqual(response.status_code, 403)
        self.assertFalse(data["ok"])

    def test_unauthenticated_user_is_redirected(self):
        """Unauthenticated requests must be redirected to login."""
        self.client.logout()
        response = self.client.post(self.url, {"items": json.dumps([])})
        self.assertEqual(response.status_code, 302)
        self.assertIn("/login/", response["Location"])
