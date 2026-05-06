import json as _json
from datetime import date as date_type

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Max
from django.http import HttpResponseForbidden, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.template.loader import render_to_string
from django.utils import timezone
from django.views.decorators.http import require_POST

from app.forms import TaskDiscardForm, TaskForm, TaskGroupForm
from app.models import Task, TaskGroup
from app.services.tasks import (
    FlatTaskNode,
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
    groups = list(TaskGroup.objects.filter(user=request.user))
    groups_json = _json.dumps([
        {"id": g.pk, "name": g.name, "color": g.color}
        for g in groups
    ])

    return render(
        request,
        "app/dashboard/tasks.html",
        {
            "nodes": nodes,
            "groups": groups,
            "groups_json": groups_json,
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


# ─── AJAX API views ───────────────────────────────────────────────────────────

@login_required
@require_POST
def task_api_create(request):
    denied = _staff_required(request)
    if denied:
        return JsonResponse({"ok": False, "error": "Forbidden"}, status=403)

    title = request.POST.get("title", "").strip()
    if not title:
        return JsonResponse({"ok": False, "error": "Cal un títol."})

    group_id = request.POST.get("group") or None
    parent_id = request.POST.get("parent") or None
    scheduled_date_str = request.POST.get("scheduled_date", "").strip()

    today = timezone.localdate()

    group = None
    if group_id:
        try:
            group = TaskGroup.objects.get(pk=int(group_id), user=request.user)
        except (TaskGroup.DoesNotExist, ValueError):
            pass

    parent = None
    depth = 0
    if parent_id:
        try:
            parent = Task.objects.get(pk=int(parent_id), user=request.user)
            depth = 1
        except (Task.DoesNotExist, ValueError):
            pass

    scheduled_date = today
    if scheduled_date_str:
        try:
            scheduled_date = date_type.fromisoformat(scheduled_date_str)
        except ValueError:
            pass

    max_order = Task.objects.filter(
        user=request.user,
        scheduled_date=scheduled_date,
        parent=parent,
    ).aggregate(m=Max("order"))["m"]
    next_order = (max_order or 0) + 1

    task = Task.objects.create(
        user=request.user,
        title=title,
        group=group,
        parent=parent,
        scheduled_date=scheduled_date,
        order=next_order,
    )

    node = FlatTaskNode(task=task, depth=depth, indent_rem=depth * 1.5)
    html = render_to_string(
        "app/dashboard/_task_node.html",
        {"node": node},
        request=request,
    )

    return JsonResponse({
        "ok": True,
        "html": html,
        "task_id": task.pk,
        "parent_id": parent.pk if parent else None,
    })


@login_required
@require_POST
def task_api_complete(request, pk):
    denied = _staff_required(request)
    if denied:
        return JsonResponse({"ok": False, "error": "Forbidden"}, status=403)

    task = get_object_or_404(Task, pk=pk, user=request.user)
    descendants = task.get_all_descendants()
    complete_task(task=task)

    return JsonResponse({
        "ok": True,
        "affected_ids": [task.pk] + [d.pk for d in descendants],
    })


@login_required
@require_POST
def task_api_discard(request, pk):
    denied = _staff_required(request)
    if denied:
        return JsonResponse({"ok": False, "error": "Forbidden"}, status=403)

    task = get_object_or_404(Task, pk=pk, user=request.user)
    reason = request.POST.get("reason", "").strip()
    if not reason:
        return JsonResponse({"ok": False, "error": "Cal un motiu per descartar."})

    descendants = task.get_all_descendants()
    discard_task(task=task, reason=reason)

    return JsonResponse({
        "ok": True,
        "affected_ids": [task.pk] + [d.pk for d in descendants],
    })


@login_required
@require_POST
def task_api_update(request, pk):
    denied = _staff_required(request)
    if denied:
        return JsonResponse({"ok": False, "error": "Forbidden"}, status=403)

    task = get_object_or_404(Task, pk=pk, user=request.user)

    if "title" in request.POST:
        title = request.POST["title"].strip()
        if title:
            task.title = title

    if "notes" in request.POST:
        task.notes = request.POST["notes"]

    if "group" in request.POST:
        group_id = request.POST.get("group") or None
        if group_id:
            try:
                task.group = TaskGroup.objects.get(pk=int(group_id), user=request.user)
            except (TaskGroup.DoesNotExist, ValueError):
                return JsonResponse({"ok": False, "error": "Grup no trobat."})
        else:
            task.group = None

    task.save()
    return JsonResponse({"ok": True})


@login_required
@require_POST
def task_api_reorder(request):
    denied = _staff_required(request)
    if denied:
        return JsonResponse({"ok": False, "error": "Forbidden"}, status=403)

    try:
        items = _json.loads(request.POST.get("items", "[]"))
    except (_json.JSONDecodeError, ValueError):
        return JsonResponse({"ok": False, "error": "Format invàlid."})

    for i, item in enumerate(items):
        try:
            task_id = int(item["id"])
        except (KeyError, ValueError, TypeError):
            continue
        Task.objects.filter(pk=task_id, user=request.user).update(order=i)

    return JsonResponse({"ok": True})
