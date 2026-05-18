from datetime import timedelta

from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse
from django.utils import timezone

from app.models import Task, TaskGroup, TaskReschedule

User = get_user_model()


class TaskAccessTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.staff = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.regular = User.objects.create_user(
            username="user", email="user@example.com", password="pass", is_staff=False
        )

    def test_task_list_redirects_when_unauthenticated(self):
        response = self.client.get(reverse("app:task_list"))
        self.assertEqual(response.status_code, 302)
        self.assertIn("/login/", response["Location"])

    def test_task_list_forbidden_for_non_staff(self):
        self.client.force_login(self.regular)
        response = self.client.get(reverse("app:task_list"))
        self.assertEqual(response.status_code, 403)

    def test_task_list_ok_for_staff(self):
        self.client.force_login(self.staff)
        response = self.client.get(reverse("app:task_list"))
        self.assertEqual(response.status_code, 200)

    def test_task_create_forbidden_for_non_staff(self):
        self.client.force_login(self.regular)
        response = self.client.get(reverse("app:task_create"))
        self.assertEqual(response.status_code, 403)


class TaskListCleanupRedirectTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)

    def test_task_list_redirects_to_cleanup_when_past_pending(self):
        yesterday = timezone.localdate() - timedelta(days=1)
        Task.objects.create(user=self.user, title="Old task", scheduled_date=yesterday)
        response = self.client.get(reverse("app:task_list"))
        self.assertRedirects(response, reverse("app:task_cleanup"))

    def test_task_list_shows_page_when_no_past_pending(self):
        today = timezone.localdate()
        Task.objects.create(user=self.user, title="Today task", scheduled_date=today)
        response = self.client.get(reverse("app:task_list"))
        self.assertEqual(response.status_code, 200)


class TaskCreateViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)

    def test_get_shows_form(self):
        response = self.client.get(reverse("app:task_create"))
        self.assertEqual(response.status_code, 200)

    def test_post_creates_task_for_logged_in_user(self):
        today = timezone.localdate()
        response = self.client.post(
            reverse("app:task_create"),
            {"title": "My task", "scheduled_date": today.isoformat(), "notes": ""},
            follow=True,
        )
        self.assertEqual(response.status_code, 200)
        task = Task.objects.get(title="My task")
        self.assertEqual(task.user, self.user)
        self.assertEqual(task.scheduled_date, today)

    def test_post_with_parent_sets_parent(self):
        today = timezone.localdate()
        parent = Task.objects.create(user=self.user, title="Parent", scheduled_date=today)
        self.client.post(
            reverse("app:task_create"),
            {
                "title": "Child",
                "scheduled_date": today.isoformat(),
                "notes": "",
                "parent": parent.pk,
            },
        )
        child = Task.objects.get(title="Child")
        self.assertEqual(child.parent, parent)

    def test_group_queryset_scoped_to_user(self):
        other = User.objects.create_user(username="other", password="pass", is_staff=True)
        TaskGroup.objects.create(user=other, name="Other group")
        response = self.client.get(reverse("app:task_create"))
        form = response.context["form"]
        self.assertFalse(form.fields["group"].queryset.filter(user=other).exists())


class TaskCleanupViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)

    def _past_task(self, title="Old task", days_ago=1):
        d = timezone.localdate() - timedelta(days=days_ago)
        return Task.objects.create(user=self.user, title=title, scheduled_date=d)

    def test_get_shows_past_pending_tasks(self):
        task = self._past_task()
        response = self.client.get(reverse("app:task_cleanup"))
        self.assertEqual(response.status_code, 200)
        titles = [item["task"].title for item in response.context["cleanup_tasks"]]
        self.assertIn(task.title, titles)

    def test_get_redirects_when_no_past_pending(self):
        response = self.client.get(reverse("app:task_cleanup"))
        self.assertRedirects(response, reverse("app:task_list"))

    def test_post_reschedules_task(self):
        task = self._past_task()
        tomorrow = timezone.localdate() + timedelta(days=1)
        self.client.post(
            reverse("app:task_cleanup"),
            {
                "task_id": [task.pk],
                f"action_{task.pk}": "reschedule",
                f"to_date_{task.pk}": tomorrow.isoformat(),
            },
            follow=True,
        )
        task.refresh_from_db()
        self.assertEqual(task.scheduled_date, tomorrow)
        self.assertTrue(TaskReschedule.objects.filter(task=task).exists())

    def test_post_discards_task(self):
        task = self._past_task()
        self.client.post(
            reverse("app:task_cleanup"),
            {
                "task_id": [task.pk],
                f"action_{task.pk}": "discard",
                f"reason_{task.pk}": "No longer relevant",
            },
            follow=True,
        )
        task.refresh_from_db()
        self.assertEqual(task.status, Task.Status.DISCARDED)

    def test_post_error_shown_when_discard_reason_missing(self):
        task = self._past_task()
        response = self.client.post(
            reverse("app:task_cleanup"),
            {
                "task_id": [task.pk],
                f"action_{task.pk}": "discard",
                f"reason_{task.pk}": "",
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.context["errors"]) > 0)


class TaskStatsViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)

    def test_stats_renders(self):
        Task.objects.create(
            user=self.user,
            title="Done",
            scheduled_date=timezone.localdate(),
            status=Task.Status.COMPLETED,
        )
        response = self.client.get(reverse("app:task_stats"))
        self.assertEqual(response.status_code, 200)
        self.assertIn("chart", response.context)


class TaskApiCreateTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)
        self.today = timezone.localdate()
        self.url = reverse("app:task_api_create")

    def test_creates_task_returns_html(self):
        response = self.client.post(self.url, {
            "title": "New task",
            "scheduled_date": self.today.isoformat(),
        })
        data = response.json()
        self.assertTrue(data["ok"])
        self.assertIn("html", data)
        task = Task.objects.get(title="New task")
        self.assertEqual(task.user, self.user)

    def test_assigns_incrementing_order(self):
        Task.objects.create(user=self.user, title="Existing", scheduled_date=self.today, order=5)
        self.client.post(self.url, {
            "title": "Second",
            "scheduled_date": self.today.isoformat(),
        })
        task = Task.objects.get(title="Second")
        self.assertEqual(task.order, 6)

    def test_missing_title_returns_error(self):
        response = self.client.post(self.url, {"title": "", "scheduled_date": self.today.isoformat()})
        data = response.json()
        self.assertFalse(data["ok"])

    def test_creates_subtask_with_parent(self):
        parent = Task.objects.create(user=self.user, title="Parent", scheduled_date=self.today)
        response = self.client.post(self.url, {
            "title": "Sub",
            "scheduled_date": self.today.isoformat(),
            "parent": parent.pk,
        })
        data = response.json()
        self.assertTrue(data["ok"])
        self.assertEqual(data["parent_id"], parent.pk)
        child = Task.objects.get(title="Sub")
        self.assertEqual(child.parent, parent)

    def test_non_staff_returns_403(self):
        self.client.logout()
        regular = User.objects.create_user(username="u", password="p", is_staff=False)
        self.client.force_login(regular)
        response = self.client.post(self.url, {"title": "X", "scheduled_date": self.today.isoformat()})
        self.assertEqual(response.status_code, 403)


class TaskApiCompleteTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)
        self.today = timezone.localdate()

    def test_complete_returns_affected_ids(self):
        parent = Task.objects.create(user=self.user, title="Parent", scheduled_date=self.today)
        child = Task.objects.create(user=self.user, title="Child", parent=parent, scheduled_date=self.today)
        url = reverse("app:task_api_complete", kwargs={"pk": parent.pk})
        response = self.client.post(url)
        data = response.json()
        self.assertTrue(data["ok"])
        self.assertIn(parent.pk, data["affected_ids"])
        self.assertIn(child.pk, data["affected_ids"])
        parent.refresh_from_db()
        self.assertEqual(parent.status, Task.Status.COMPLETED)

    def test_complete_other_users_task_returns_404(self):
        other = User.objects.create_user(username="other", password="p", is_staff=True)
        task = Task.objects.create(user=other, title="T", scheduled_date=self.today)
        url = reverse("app:task_api_complete", kwargs={"pk": task.pk})
        response = self.client.post(url)
        self.assertEqual(response.status_code, 404)


class TaskApiDiscardTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)
        self.task = Task.objects.create(
            user=self.user, title="To discard", scheduled_date=timezone.localdate()
        )
        self.url = reverse("app:task_api_discard", kwargs={"pk": self.task.pk})

    def test_discard_with_reason_returns_affected_ids(self):
        parent = self.task
        child = Task.objects.create(user=self.user, title="Child", parent=parent,
                                    scheduled_date=timezone.localdate())
        response = self.client.post(self.url, {"reason": "Not needed"})
        data = response.json()
        self.assertTrue(data["ok"])
        self.assertIn(parent.pk, data["affected_ids"])
        self.assertIn(child.pk, data["affected_ids"])
        parent.refresh_from_db()
        self.assertEqual(parent.discard_reason, "Not needed")

    def test_discard_without_reason_returns_error(self):
        response = self.client.post(self.url, {"reason": ""})
        data = response.json()
        self.assertFalse(data["ok"])
        self.task.refresh_from_db()
        self.assertEqual(self.task.status, Task.Status.PENDING)


class TaskApiUpdateTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)
        self.today = timezone.localdate()
        self.task = Task.objects.create(
            user=self.user, title="Original title", notes="", scheduled_date=self.today
        )
        self.url = reverse("app:task_api_update", kwargs={"pk": self.task.pk})

    def test_update_title(self):
        response = self.client.post(self.url, {"title": "Updated title"})
        self.assertEqual(response.json(), {"ok": True})
        self.task.refresh_from_db()
        self.assertEqual(self.task.title, "Updated title")

    def test_update_title_ignores_blank(self):
        response = self.client.post(self.url, {"title": "   "})
        self.assertEqual(response.json(), {"ok": True})
        self.task.refresh_from_db()
        self.assertEqual(self.task.title, "Original title")

    def test_update_notes(self):
        response = self.client.post(self.url, {"notes": "Some notes here"})
        self.assertEqual(response.json(), {"ok": True})
        self.task.refresh_from_db()
        self.assertEqual(self.task.notes, "Some notes here")

    def test_update_clears_notes(self):
        self.task.notes = "Old notes"
        self.task.save()
        self.client.post(self.url, {"notes": ""})
        self.task.refresh_from_db()
        self.assertEqual(self.task.notes, "")

    def test_update_assigns_group(self):
        group = TaskGroup.objects.create(user=self.user, name="Work", color="orange")
        response = self.client.post(self.url, {"group": group.pk})
        self.assertEqual(response.json(), {"ok": True})
        self.task.refresh_from_db()
        self.assertEqual(self.task.group, group)

    def test_update_clears_group(self):
        group = TaskGroup.objects.create(user=self.user, name="Work", color="orange")
        self.task.group = group
        self.task.save()
        self.client.post(self.url, {"group": ""})
        self.task.refresh_from_db()
        self.assertIsNone(self.task.group)

    def test_update_rejects_other_users_group(self):
        other = User.objects.create_user(username="other", password="p", is_staff=True)
        other_group = TaskGroup.objects.create(user=other, name="Private", color="red")
        response = self.client.post(self.url, {"group": other_group.pk})
        data = response.json()
        self.assertFalse(data["ok"])
        self.task.refresh_from_db()
        self.assertIsNone(self.task.group)

    def test_update_other_users_task_returns_404(self):
        other = User.objects.create_user(username="other2", password="p", is_staff=True)
        other_task = Task.objects.create(user=other, title="T", scheduled_date=self.today)
        url = reverse("app:task_api_update", kwargs={"pk": other_task.pk})
        response = self.client.post(url, {"title": "Hijacked"})
        self.assertEqual(response.status_code, 404)

    def test_partial_update_does_not_touch_other_fields(self):
        group = TaskGroup.objects.create(user=self.user, name="Work", color="orange")
        self.task.group = group
        self.task.notes = "Keep me"
        self.task.save()
        # Only update title
        self.client.post(self.url, {"title": "New title"})
        self.task.refresh_from_db()
        self.assertEqual(self.task.notes, "Keep me")
        self.assertEqual(self.task.group, group)


