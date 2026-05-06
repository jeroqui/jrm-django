from datetime import date
from collections import deque

from django.conf import settings
from django.db import models


class TaskGroup(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="task_groups",
    )
    name = models.CharField(max_length=100)
    color = models.CharField(
        max_length=20,
        default="orange",
        help_text="CSS color value (e.g. orange, #ff6b6b, rgb(255,100,0)).",
    )

    class Meta:
        ordering = ["name"]
        unique_together = ("user", "name")

    def __str__(self) -> str:
        return self.name


class Task(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pendent"
        COMPLETED = "completed", "Completada"
        DISCARDED = "discarded", "Descartada"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="tasks",
    )
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="subtasks",
    )
    group = models.ForeignKey(
        TaskGroup,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="tasks",
    )
    title = models.CharField(max_length=200)
    notes = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )
    discard_reason = models.TextField(blank=True)
    scheduled_date = models.DateField(default=date.today)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["scheduled_date", "order", "title"]

    def __str__(self) -> str:
        return self.title

    def get_all_descendants(self) -> list["Task"]:
        """BFS over all descendant tasks."""
        result = []
        queue = deque(self.subtasks.all())
        while queue:
            child = queue.popleft()
            result.append(child)
            queue.extend(child.subtasks.all())
        return result


class TaskReschedule(models.Model):
    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name="reschedules",
    )
    from_date = models.DateField()
    to_date = models.DateField()
    rescheduled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-rescheduled_at"]

    def __str__(self) -> str:
        return f"{self.task.title}: {self.from_date} → {self.to_date}"
