"""
Tests for the task_api_reorder endpoint (drag-and-drop reordering).

The browser calls task_api_reorder with a JSON ``items`` list after every drop.
Each item has ``id`` and ``order``; the dragged item may also include
``parent_id`` (null to become a root task, or an integer pk to become a subtask).
The ``group_id`` field is not handled by this endpoint — group changes go
through task_api_update instead.

Tests cover:
  - Order updates persist
  - parent_id changes reparent tasks
  - TaskGroup fields are never touched by this endpoint
  - Security: users cannot affect other users' tasks
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

    def _task(self, title, order=0, group=None, parent=None):
        return Task.objects.create(
            user=self.user,
            title=title,
            scheduled_date=self.today,
            order=order,
            group=group,
            parent=parent,
        )

    def _group(self, name="Work", color="orange"):
        return TaskGroup.objects.create(user=self.user, name=name, color=color)

    def _reorder(self, items):
        response = self.client.post(self.url, {"items": json.dumps(items)})
        return response, response.json()


# ─── Order updates ────────────────────────────────────────────────────────────

class ReorderTests(DndGroupTestBase):

    def test_order_updated(self):
        task_a = self._task("A", order=0)
        task_b = self._task("B", order=1)
        task_c = self._task("C", order=2)

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
        self.assertEqual(task_c.order, 0)
        self.assertEqual(task_a.order, 1)
        self.assertEqual(task_b.order, 2)

    def test_order_persists_after_second_fetch(self):
        task_a = self._task("A", order=0)
        task_b = self._task("B", order=1)
        items = [{"id": task_b.pk, "order": 0}, {"id": task_a.pk, "order": 1}]
        self._reorder(items)

        self.assertEqual(Task.objects.get(pk=task_b.pk).order, 0)
        self.assertEqual(Task.objects.get(pk=task_a.pk).order, 1)

    def test_returns_ok_true(self):
        task = self._task("T", order=0)
        _, data = self._reorder([{"id": task.pk, "order": 0}])
        self.assertEqual(data, {"ok": True})

    def test_group_field_not_touched_by_reorder(self):
        """Reordering must never change a task's TaskGroup."""
        group = self._group()
        task_a = self._task("A", order=0, group=group)
        task_b = self._task("B", order=1, group=group)

        items = [{"id": task_b.pk, "order": 0}, {"id": task_a.pk, "order": 1}]
        self._reorder(items)

        task_a.refresh_from_db()
        task_b.refresh_from_db()
        self.assertEqual(task_a.group, group)
        self.assertEqual(task_b.group, group)

    def test_unknown_group_id_in_payload_is_ignored(self):
        """group_id in payload is not handled; the task group must be unchanged."""
        group = self._group()
        task = self._task("T", order=0, group=group)
        items = [{"id": task.pk, "order": 0, "group_id": None}]
        self._reorder(items)
        task.refresh_from_db()
        self.assertEqual(task.group, group)


# ─── parent_id / subtask reparenting ─────────────────────────────────────────

class ReparentTests(DndGroupTestBase):

    def test_drag_into_subtask(self):
        """Supplying parent_id makes the task a subtask of that parent."""
        parent = self._task("Parent", order=0)
        child = self._task("Child", order=1)

        items = [
            {"id": parent.pk, "order": 0},
            {"id": child.pk, "order": 1, "parent_id": parent.pk},
        ]
        _, data = self._reorder(items)

        self.assertTrue(data["ok"])
        child.refresh_from_db()
        self.assertEqual(child.parent_id, parent.pk)

    def test_drag_out_of_subtask(self):
        """Supplying parent_id=null promotes a subtask to a root task."""
        parent = self._task("Parent", order=0)
        child = self._task("Child", order=1, parent=parent)

        items = [
            {"id": parent.pk, "order": 0},
            {"id": child.pk, "order": 1, "parent_id": None},
        ]
        _, data = self._reorder(items)

        self.assertTrue(data["ok"])
        child.refresh_from_db()
        self.assertIsNone(child.parent_id)

    def test_reparent_persists_after_second_fetch(self):
        parent = self._task("Parent", order=0)
        child = self._task("Child", order=1)

        items = [{"id": parent.pk, "order": 0}, {"id": child.pk, "order": 1, "parent_id": parent.pk}]
        self._reorder(items)

        self.assertEqual(Task.objects.get(pk=child.pk).parent_id, parent.pk)

    def test_unrelated_tasks_parent_unchanged(self):
        """Tasks without parent_id in the payload must not be reparented."""
        parent = self._task("Parent", order=0)
        child = self._task("Child", order=1, parent=parent)
        other = self._task("Other", order=2)

        # Only change other's order; child's parent_id is omitted → unchanged
        items = [
            {"id": other.pk, "order": 0},
            {"id": parent.pk, "order": 1},
            {"id": child.pk, "order": 2},
        ]
        self._reorder(items)

        child.refresh_from_db()
        self.assertEqual(child.parent_id, parent.pk)


# ─── Security ─────────────────────────────────────────────────────────────────

class DndGroupSecurityTests(DndGroupTestBase):

    def test_cannot_assign_other_users_group_via_reorder(self):
        """Supplying another user's group_id in the payload is silently ignored."""
        other = User.objects.create_user(username="other", password="p", is_staff=True)
        other_group = TaskGroup.objects.create(user=other, name="Private", color="red")
        task = self._task("Mine", order=0)

        items = [{"id": task.pk, "order": 0, "group_id": other_group.pk}]
        _, data = self._reorder(items)

        self.assertTrue(data["ok"])
        task.refresh_from_db()
        self.assertIsNone(task.group)

    def test_cannot_reorder_other_users_task(self):
        """Supplying another user's task id in the payload must not change that task."""
        other = User.objects.create_user(username="other2", password="p", is_staff=True)
        group = self._group()
        other_task = Task.objects.create(
            user=other, title="Other", scheduled_date=self.today, order=99, group=group
        )

        items = [{"id": other_task.pk, "order": 0, "group_id": None}]
        self._reorder(items)

        other_task.refresh_from_db()
        self.assertEqual(other_task.order, 99)
        self.assertEqual(other_task.group_id, group.pk)

    def test_cannot_reparent_to_other_users_task(self):
        """Using another user's task pk as parent_id must be silently ignored."""
        other = User.objects.create_user(username="other3", password="p", is_staff=True)
        other_parent = Task.objects.create(
            user=other, title="OtherParent", scheduled_date=self.today, order=0
        )
        my_task = self._task("Mine", order=0)

        items = [{"id": my_task.pk, "order": 0, "parent_id": other_parent.pk}]
        self._reorder(items)

        my_task.refresh_from_db()
        self.assertIsNone(my_task.parent_id)

    def test_non_staff_user_gets_403(self):
        self.client.logout()
        regular = User.objects.create_user(username="regular", password="p", is_staff=False)
        self.client.force_login(regular)
        task = Task.objects.create(user=self.user, title="T", scheduled_date=self.today)
        response, data = self._reorder([{"id": task.pk, "order": 0}])
        self.assertEqual(response.status_code, 403)
        self.assertFalse(data["ok"])

    def test_unauthenticated_user_is_redirected(self):
        self.client.logout()
        response = self.client.post(self.url, {"items": json.dumps([])})
        self.assertEqual(response.status_code, 302)
