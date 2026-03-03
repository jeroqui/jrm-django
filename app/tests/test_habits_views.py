from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse

from app.models import Habit, HabitCompletion


User = get_user_model()


class HabitDashboardViewTests(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob",
            email="jacob@example.com",
            password="testpass123",
        )
        self.client.force_login(self.user)

    def test_dashboard_updates_today_habit_completions(self):
        today = date.today()
        habit = Habit.objects.create(
            user=self.user,
            name="Write journal",
            start_date=today,
        )

        url = reverse("app:dashboard")
        response = self.client.post(
            url,
            {
                "form_type": "habits_today",
                "completed_habits": [str(habit.id)],
            },
            follow=True,
        )

        self.assertEqual(response.status_code, 200)
        completion = HabitCompletion.objects.get(habit=habit, date=today)
        self.assertTrue(completion.completed)

    def test_habit_day_updates_past_date(self):
        today = date.today()
        past = today - timedelta(days=3)
        habit = Habit.objects.create(
            user=self.user,
            name="Exercise",
            start_date=past,
        )

        url = reverse("app:habit_day")
        response = self.client.post(
            url,
            {
                "date": past.isoformat(),
                "completed_habits": [str(habit.id)],
            },
            follow=True,
        )

        self.assertEqual(response.status_code, 200)
        completion = HabitCompletion.objects.get(habit=habit, date=past)
        self.assertTrue(completion.completed)


class JacobsHabitsProjectViewTests(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob",
            email="jacob@example.com",
            password="testpass123",
        )
        # Treat this user as the public owner of habits
        self.user.is_superuser = True
        self.user.is_staff = True
        self.user.save()

    def test_project_page_renders_calendar_and_habits(self):
        habit = Habit.objects.create(
            user=self.user,
            name="Stretch",
            start_date=date.today(),
        )
        HabitCompletion.objects.create(
            habit=habit,
            date=date.today(),
            completed=True,
        )

        url = reverse("app:project_jacobs_habits")
        # View should be public (no login required)
        self.client.logout()
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)
        self.assertIn("calendar_weeks", response.context)
        self.assertIn("habits", response.context)
        self.assertContains(response, "Jacob&#x27;s Habits")

