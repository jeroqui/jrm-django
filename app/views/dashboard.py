from datetime import date

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone

from app.forms import DeQueVaEpisodeForm, HabitForm
from app.models import DeQueVaEpisode, Habit, HabitCompletion, Post


@login_required
def dashboard(request):
    """Dashboard view with user utilities."""
    posts = Post.objects.filter(author=request.user)
    draft_count = posts.filter(status=Post.Status.DRAFT).count()
    published_count = posts.filter(status=Post.Status.PUBLISHED).count()

    episodes = DeQueVaEpisode.objects.all()[:5]
    episodes_count = DeQueVaEpisode.objects.count()

    today = timezone.localdate()
    habits_qs = Habit.objects.filter(user=request.user).order_by("name")
    active_habits = [h for h in habits_qs if h.is_active_on(today)]

    existing_completions = {
        c.habit_id: c
        for c in HabitCompletion.objects.filter(
            habit__in=active_habits, date=today
        )
    }

    if request.method == "POST" and request.POST.get("form_type") == "habits_today":
        selected_ids = {
            int(hid) for hid in request.POST.getlist("completed_habits")
        }

        for habit in active_habits:
            completed = habit.id in selected_ids
            completion = existing_completions.get(habit.id)
            if completion:
                if completion.completed != completed:
                    completion.completed = completed
                    completion.save(update_fields=["completed"])
            else:
                HabitCompletion.objects.create(
                    habit=habit,
                    date=today,
                    completed=completed,
                )

        messages.success(request, "Hàbits d'avui actualitzats.")
        return redirect("app:dashboard")

    today_habits = [
        {
            "id": habit.id,
            "name": habit.name,
            "completed": bool(
                existing_completions.get(habit.id)
                and existing_completions[habit.id].completed
            ),
        }
        for habit in active_habits
    ]

    context = {
        "posts": posts[:5],
        "draft_count": draft_count,
        "published_count": published_count,
        "total_posts": posts.count(),
        "episodes": episodes,
        "episodes_count": episodes_count,
        "today_habits": today_habits,
        "today": today,
    }

    return render(request, "app/dashboard.html", context)


@login_required
def episode_list(request):
    """List all De Que Va episodes."""
    episodes = DeQueVaEpisode.objects.all()
    return render(request, "app/dashboard/episodes.html", {"episodes": episodes})


@login_required
def episode_create(request):
    """Create a new episode."""
    if request.method == "POST":
        form = DeQueVaEpisodeForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Episodi creat correctament!")
            return redirect("app:episode_list")
    else:
        form = DeQueVaEpisodeForm()

    return render(
        request,
        "app/dashboard/episode_form.html",
        {
            "form": form,
            "title": "Nou Episodi",
        },
    )


@login_required
def episode_edit(request, pk):
    """Edit an existing episode."""
    episode = get_object_or_404(DeQueVaEpisode, pk=pk)

    if request.method == "POST":
        form = DeQueVaEpisodeForm(
            request.POST, request.FILES, instance=episode
        )
        if form.is_valid():
            form.save()
            messages.success(request, "Episodi actualitzat!")
            return redirect("app:episode_list")
    else:
        form = DeQueVaEpisodeForm(instance=episode)

    return render(
        request,
        "app/dashboard/episode_form.html",
        {
            "form": form,
            "episode": episode,
            "title": "Editar Episodi",
        },
    )


@login_required
def episode_delete(request, pk):
    """Delete an episode."""
    episode = get_object_or_404(DeQueVaEpisode, pk=pk)

    if request.method == "POST":
        episode.delete()
        messages.success(request, "Episodi eliminat!")
        return redirect("app:episode_list")

    return render(
        request,
        "app/dashboard/episode_delete.html",
        {"episode": episode},
    )


@login_required
def habit_list(request):
    """List and manage habits for the current user."""
    habits = Habit.objects.filter(user=request.user).order_by("name")
    return render(
        request,
        "app/dashboard/habits.html",
        {
            "habits": habits,
        },
    )


@login_required
def habit_create(request):
    """Create a new habit."""
    if request.method == "POST":
        form = HabitForm(request.POST)
        if form.is_valid():
            habit = form.save(commit=False)
            habit.user = request.user
            if habit.end_date and habit.status == Habit.Status.TRACKING:
                # If an end date is set, default to completed unless user chose otherwise
                habit.status = Habit.Status.COMPLETED
            habit.save()
            messages.success(request, "Hàbit creat correctament.")
            return redirect("app:habit_list")
    else:
        form = HabitForm(
            initial={
                "start_date": timezone.localdate(),
                "status": Habit.Status.TRACKING,
            }
        )

    return render(
        request,
        "app/dashboard/habit_form.html",
        {
            "form": form,
            "title": "Nou hàbit",
        },
    )


@login_required
def habit_edit(request, pk):
    """Edit an existing habit (including status and reason)."""
    habit = get_object_or_404(Habit, pk=pk, user=request.user)

    if request.method == "POST":
        form = HabitForm(request.POST, instance=habit)
        if form.is_valid():
            form.save()
            messages.success(request, "Hàbit actualitzat.")
            return redirect("app:habit_list")
    else:
        form = HabitForm(instance=habit)

    return render(
        request,
        "app/dashboard/habit_form.html",
        {
            "form": form,
            "habit": habit,
            "title": "Editar hàbit",
        },
    )


@login_required
def habit_day(request):
    """
    Edit completions for a specific day (past or future).

    This lets you fix days you forgot to log or logged incorrectly.
    """
    param = request.GET.get("date") or request.POST.get("date")
    try:
        selected_date = (
            date.fromisoformat(param) if param else timezone.localdate()
        )
    except ValueError:
        selected_date = timezone.localdate()

    habits_qs = Habit.objects.filter(user=request.user).order_by("name")
    active_habits = [h for h in habits_qs if h.is_active_on(selected_date)]

    existing_completions = {
        c.habit_id: c
        for c in HabitCompletion.objects.filter(
            habit__in=active_habits,
            date=selected_date,
        )
    }

    if request.method == "POST":
        selected_ids = {
            int(hid) for hid in request.POST.getlist("completed_habits")
        }

        for habit in active_habits:
            completed = habit.id in selected_ids
            completion = existing_completions.get(habit.id)
            if completion:
                if completion.completed != completed:
                    completion.completed = completed
                    completion.save(update_fields=["completed"])
            else:
                HabitCompletion.objects.create(
                    habit=habit,
                    date=selected_date,
                    completed=completed,
                )

        messages.success(
            request,
            f"Hàbits actualitzats per al dia {selected_date.isoformat()}.",
        )
        return redirect(
            f"{reverse('app:habit_day')}?date={selected_date.isoformat()}"
        )

    day_habits = [
        {
            "id": habit.id,
            "name": habit.name,
            "completed": bool(
                existing_completions.get(habit.id)
                and existing_completions[habit.id].completed
            ),
        }
        for habit in active_habits
    ]

    return render(
        request,
        "app/dashboard/habits_day.html",
        {
            "selected_date": selected_date,
            "day_habits": day_habits,
        },
    )
