from django.db import migrations

DEFAULT_GROUPS = [
    ("Personal", "#f97316"),
    ("Feina", "#3b82f6"),
    ("Urgent", "#ef4444"),
    ("Projecte", "#a855f7"),
]


def seed_default_groups(apps, schema_editor):
    TaskGroup = apps.get_model("app", "TaskGroup")
    User = apps.get_model("app", "User")
    for user in User.objects.all():
        if not TaskGroup.objects.filter(user=user).exists():
            for name, color in DEFAULT_GROUPS:
                TaskGroup.objects.create(user=user, name=name, color=color)


def reverse_seed(apps, schema_editor):
    TaskGroup = apps.get_model("app", "TaskGroup")
    TaskGroup.objects.filter(name__in=[name for name, _ in DEFAULT_GROUPS]).delete()


class Migration(migrations.Migration):
    dependencies = [
        ("app", "0006_add_task_order"),
    ]

    operations = [
        migrations.RunPython(seed_default_groups, reverse_seed),
    ]
