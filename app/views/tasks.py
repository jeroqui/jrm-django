from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from django.shortcuts import get_object_or_404, redirect, render
from django.utils import timezone

from app.forms import TaskDiscardForm, TaskForm, TaskGroupForm
from app.models import Task, TaskGroup
from app.services.tasks import (
    build_stats_chart_data,
    complete_task,
    discard_task,
    flatten_task_tree,
    get_pending_past_tasks,
    get_task_stats,
    get_tasks_for_date,
    needs_cleanup,
    reschedule_task,
)


def _staff_required(request):
    if not request.user.is_staff:
        return HttpResponseForbidden()
    return None


@login_required
def task_list(request):
    denied = _staff_required(request)
    if denied:
        return denied

    today = timezone.localdate()
    if needs_cleanup(user=request.user, today=today):
        return redirect("app:task_cleanup")

    tasks = get_tasks_for_date(user=request.user, target_date=today)
    nodes = flatten_task_tree(tasks)

    return render(
        request,
        "app/dashboard/tasks.html",
        {
            "nodes": nodes,
            "today": today,
        },
    )


@login_required
def task_create(request):
    denied = _staff_required(request)
    if denied:
        return denied

    today = timezone.localdate()

    if request.method == "POST":
        form = TaskForm(request.POST, user=request.user)
        if form.is_valid():
            task = form.save(commit=False)
            task.user = request.user
            task.save()
            messages.success(request, "Tasca creada.")
            return redirect("app:task_list")
    else:
        initial = {"scheduled_date": today}
        if parent_pk := request.GET.get("parent"):
            initial["parent"] = parent_pk
        if date_param := request.GET.get("date"):
            initial["scheduled_date"] = date_param
        form = TaskForm(initial=initial, user=request.user)

    return render(
        request,
        "app/dashboard/task_form.html",
        {"form": form, "title": "Nova tasca"},
    )


@login_required
def task_edit(request, pk):
    denied = _staff_required(request)
    if denied:
        return denied

    task = get_object_or_404(Task, pk=pk, user=request.user)

    if request.method == "POST":
        form = TaskForm(request.POST, instance=task, user=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, "Tasca actualitzada.")
            return redirect("app:task_list")
    else:
        form = TaskForm(instance=task, user=request.user)

    return render(
        request,
        "app/dashboard/task_form.html",
        {"form": form, "task": task, "title": "Editar tasca"},
    )


@login_required
def task_complete(request, pk):
    denied = _staff_required(request)
    if denied:
        return denied

    if request.method != "POST":
        return redirect("app:task_list")

    task = get_object_or_404(Task, pk=pk, user=request.user)
    complete_task(task=task)
    messages.success(request, f"«{task.title}» completada.")
    return redirect("app:task_list")


@login_required
def task_discard(request, pk):
    denied = _staff_required(request)
    if denied:
        return denied

    task = get_object_or_404(Task, pk=pk, user=request.user)

    if request.method == "POST":
        form = TaskDiscardForm(request.POST)
        if form.is_valid():
            discard_task(task=task, reason=form.cleaned_data["reason"])
            messages.success(request, f"«{task.title}» descartada.")
            return redirect("app:task_list")
    else:
        form = TaskDiscardForm()

    return render(
        request,
        "app/dashboard/task_discard.html",
        {"form": form, "task": task},
    )


@login_required
def task_cleanup(request):
    denied = _staff_required(request)
    if denied:
        return denied

    today = timezone.localdate()
    past_tasks = get_pending_past_tasks(user=request.user, today=today)

    if not past_tasks:
        return redirect("app:task_list")

    errors: list[str] = []

    if request.method == "POST":
        task_ids = request.POST.getlist("task_id")
        all_ok = True

        for task_id in task_ids:
            try:
                task = Task.objects.get(pk=task_id, user=request.user, status=Task.Status.PENDING)
            except Task.DoesNotExist:
                continue

            action = request.POST.get(f"action_{task_id}", "reschedule")

            if action == "discard":
                reason = request.POST.get(f"reason_{task_id}", "").strip()
                if not reason:
                    errors.append(f"«{task.title}»: cal un motiu per descartar.")
                    all_ok = False
                    continue
                discard_task(task=task, reason=reason)
            else:
                raw_date = request.POST.get(f"to_date_{task_id}", "").strip()
                try:
                    from datetime import date as date_type
                    new_date = date_type.fromisoformat(raw_date)
                except ValueError:
                    errors.append(f"«{task.title}»: data invàlida.")
                    all_ok = False
                    continue
                reschedule_task(task=task, to_date=new_date)

        if all_ok:
            if not needs_cleanup(user=request.user, today=today):
                messages.success(request, "Tasques pendents processades.")
                return redirect("app:task_list")
            past_tasks = get_pending_past_tasks(user=request.user, today=today)

    today_str = today.isoformat()
    cleanup_tasks = [
        {
            "task": t,
            "days_overdue": (today - t.scheduled_date).days,
        }
        for t in past_tasks
    ]

    return render(
        request,
        "app/dashboard/task_cleanup.html",
        {
            "cleanup_tasks": cleanup_tasks,
            "today": today,
            "today_str": today_str,
            "errors": errors,
        },
    )


@login_required
def task_stats(request):
    denied = _staff_required(request)
    if denied:
        return denied

    stats = get_task_stats(user=request.user, days=30)
    chart = build_stats_chart_data(stats)
    return render(request, "app/dashboard/task_stats.html", {"chart": chart})


@login_required
def task_group_list(request):
    denied = _staff_required(request)
    if denied:
        return denied

    if request.method == "POST":
        form = TaskGroupForm(request.POST)
        if form.is_valid():
            group = form.save(commit=False)
            group.user = request.user
            group.save()
            messages.success(request, "Grup creat.")
            return redirect("app:task_group_list")
    else:
        form = TaskGroupForm()

    groups = TaskGroup.objects.filter(user=request.user)
    return render(
        request,
        "app/dashboard/task_groups.html",
        {"groups": groups, "form": form},
    )


@login_required
def task_group_edit(request, pk):
    denied = _staff_required(request)
    if denied:
        return denied

    group = get_object_or_404(TaskGroup, pk=pk, user=request.user)

    if request.method == "POST":
        form = TaskGroupForm(request.POST, instance=group)
        if form.is_valid():
            form.save()
            messages.success(request, "Grup actualitzat.")
            return redirect("app:task_group_list")
    else:
        form = TaskGroupForm(instance=group)

    return render(
        request,
        "app/dashboard/task_group_form.html",
        {"form": form, "group": group},
    )


@login_required
def task_group_delete(request, pk):
    denied = _staff_required(request)
    if denied:
        return denied

    group = get_object_or_404(TaskGroup, pk=pk, user=request.user)

    if request.method == "POST":
        group.delete()
        messages.success(request, "Grup eliminat.")
        return redirect("app:task_group_list")

    return render(
        request,
        "app/dashboard/task_group_delete.html",
        {"group": group},
    )
