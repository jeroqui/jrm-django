from datetime import date, timedelta

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


class TaskCompleteViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)

    def test_complete_marks_task_and_descendants(self):
        today = timezone.localdate()
        parent = Task.objects.create(user=self.user, title="Parent", scheduled_date=today)
        child = Task.objects.create(user=self.user, title="Child", parent=parent, scheduled_date=today)

        self.client.post(reverse("app:task_complete", kwargs={"pk": parent.pk}))

        parent.refresh_from_db()
        child.refresh_from_db()
        self.assertEqual(parent.status, Task.Status.COMPLETED)
        self.assertEqual(child.status, Task.Status.COMPLETED)

    def test_complete_other_user_task_returns_404(self):
        other = User.objects.create_user(username="other", password="pass", is_staff=True)
        today = timezone.localdate()
        task = Task.objects.create(user=other, title="Other task", scheduled_date=today)

        response = self.client.post(reverse("app:task_complete", kwargs={"pk": task.pk}))
        self.assertEqual(response.status_code, 404)


class TaskDiscardViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="admin", email="admin@example.com", password="pass", is_staff=True
        )
        self.client.force_login(self.user)
        self.task = Task.objects.create(
            user=self.user, title="To discard", scheduled_date=timezone.localdate()
        )

    def test_get_shows_fallback_form(self):
        response = self.client.get(reverse("app:task_discard", kwargs={"pk": self.task.pk}))
        self.assertEqual(response.status_code, 200)

    def test_post_with_reason_discards_task(self):
        self.client.post(
            reverse("app:task_discard", kwargs={"pk": self.task.pk}),
            {"reason": "Not needed anymore"},
        )
        self.task.refresh_from_db()
        self.assertEqual(self.task.status, Task.Status.DISCARDED)
        self.assertEqual(self.task.discard_reason, "Not needed anymore")

    def test_post_without_reason_shows_error(self):
        response = self.client.post(
            reverse("app:task_discard", kwargs={"pk": self.task.pk}),
            {"reason": ""},
        )
        self.assertEqual(response.status_code, 200)
        self.task.refresh_from_db()
        self.assertEqual(self.task.status, Task.Status.PENDING)


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
