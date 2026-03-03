from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.test import TestCase

from app.models import Habit, HabitCompletion
from app.services.habits import build_habit_calendar, group_calendar_by_week


User = get_user_model()


class HabitModelTests(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user(
            username="jacob",
            email="jacob@example.com",
            password="testpass123",
        )

    def test_is_active_on_respects_start_and_end_dates(self):
        habit = Habit.objects.create(
            user=self.user,
            name="Write",
            start_date=date(2024, 1, 10),
            end_date=date(2024, 1, 20),
        )

        self.assertFalse(habit.is_active_on(date(2024, 1, 9)))
        self.assertTrue(habit.is_active_on(date(2024, 1, 10)))
        self.assertTrue(habit.is_active_on(date(2024, 1, 20)))
        self.assertFalse(habit.is_active_on(date(2024, 1, 21)))

    def test_is_active_on_without_end_date_is_open_ended(self):
        habit = Habit.objects.create(
            user=self.user,
            name="Meditate",
            start_date=date(2024, 1, 1),
        )

        self.assertTrue(habit.is_active_on(date(2024, 1, 1)))
        self.assertTrue(habit.is_active_on(date(2024, 12, 31)))


class HabitCalendarServiceTests(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create_user(
            username="jacob",
            email="jacob@example.com",
            password="testpass123",
        )

    def test_build_habit_calendar_counts_only_active_habits(self):
        today = date(2024, 1, 10)
        start_range = today - timedelta(days=2)

        tracking = Habit.objects.create(
            user=self.user,
            name="Reading",
            start_date=start_range,
        )
        completed = Habit.objects.create(
            user=self.user,
            name="Run",
            start_date=start_range,
            end_date=today - timedelta(days=1),
        )

        # Mark completions: tracking done all 3 days, completed only on first 2
        for i in range(3):
            day = start_range + timedelta(days=i)
            HabitCompletion.objects.create(
                habit=tracking,
                date=day,
                completed=True,
            )
            if day <= completed.end_date:
                HabitCompletion.objects.create(
                    habit=completed,
                    date=day,
                    completed=True,
                )

        summaries = build_habit_calendar(self.user, days=3, today=today)

        # On the last day, the completed habit should no longer count as active.
        last_day = summaries[-1]
        self.assertEqual(last_day.date, today)
        self.assertEqual(last_day.total_habits, 1)
        self.assertEqual(last_day.completed_habits, 1)
        self.assertAlmostEqual(last_day.completion_rate, 1.0)

        # On first day, both habits are active and completed.
        first_day = summaries[0]
        self.assertEqual(first_day.total_habits, 2)
        self.assertEqual(first_day.completed_habits, 2)
        self.assertAlmostEqual(first_day.completion_rate, 1.0)

    def test_group_calendar_by_week_pads_weeks(self):
        today = date(2024, 1, 7)  # Sunday
        summaries = [
            build
            for build in build_habit_calendar(
                self.user,
                days=7,
                today=today,
            )
        ]

        weeks = group_calendar_by_week(summaries)
        self.assertEqual(len(weeks), 1)
        self.assertEqual(len(weeks[0]), 7)

