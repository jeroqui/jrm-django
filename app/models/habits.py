from datetime import date

from django.conf import settings
from django.db import models


class Habit(models.Model):
    class Status(models.TextChoices):
        TRACKING = "tracking", "Tracking"
        COMPLETED = "completed", "Completed"
        ABANDONED = "abandoned", "Abandoned"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="habits",
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.TRACKING,
    )
    status_reason = models.TextField(
        blank=True,
        help_text="Explanation of why the habit was completed or abandoned.",
    )
    start_date = models.DateField(default=date.today)
    end_date = models.DateField(
        null=True,
        blank=True,
        help_text="Date when the habit was marked completed or abandoned.",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name

    def is_active_on(self, day: date) -> bool:
        """
        Return True if this habit should be counted for the given day.

        A habit is active from start_date up to and including end_date (if set).
        Completed or abandoned habits stop being counted *after* their end_date.
        """
        if day < self.start_date:
            return False
        if self.end_date and day > self.end_date:
            return False
        return True


class HabitCompletion(models.Model):
    habit = models.ForeignKey(
        Habit,
        on_delete=models.CASCADE,
        related_name="completions",
    )
    date = models.DateField()
    completed = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("habit", "date")
        ordering = ["-date"]

    def __str__(self) -> str:
        status = "✓" if self.completed else "✗"
        return f"{self.habit.name} on {self.date}: {status}"

