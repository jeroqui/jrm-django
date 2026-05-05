from datetime import date

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone

from app.forms import DeQueVaEpisodeForm, HabitForm
from app.models import DeQueVaEpisode, Habit, Post, Task
from app.services.habits import get_habit_checkoff_state


@login_required
def dashboard(request):
    """Dashboard view with user utilities."""
    posts = Post.objects.filter(author=request.user)
    draft_count = posts.filter(status=Post.Status.DRAFT).count()
    published_count = posts.filter(status=Post.Status.PUBLISHED).count()

    episodes = DeQueVaEpisode.objects.all()[:5]
    episodes_count = DeQueVaEpisode.objects.count()

    today = timezone.localdate()
    checkoff = get_habit_checkoff_state(
        request=request,
        user=request.user,
        target_date=today,
        expected_form_type="habits_today",
    )
    if checkoff.was_submitted:
        messages.success(request, "Hàbits d'avui actualitzats.")
        return redirect("app:dashboard")

    context = {
        "posts": posts[:5],
        "draft_count": draft_count,
        "published_count": published_count,
        "total_posts": posts.count(),
        "episodes": episodes,
        "episodes_count": episodes_count,
        "today_habits": checkoff.habits,
        "today": today,
    }

    if request.user.is_staff:
        context["pending_task_count"] = Task.objects.filter(
            user=request.user, status=Task.Status.PENDING, scheduled_date=today
        ).count()
        context["overdue_count"] = Task.objects.filter(
            user=request.user, status=Task.Status.PENDING, scheduled_date__lt=today
        ).count()

    return render(request, "app/dashboard.html", context)


@login_required
def episode_list(request):
    """List all De Que Va episodes."""
    paginator = Paginator(DeQueVaEpisode.objects.all(), 20)
    page = paginator.get_page(request.GET.get("page", 1))
    return render(request, "app/dashboard/episodes.html", {"episodes": page})


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
    today = timezone.localdate()
    habits = Habit.objects.filter(user=request.user).order_by("name")
    checkoff = get_habit_checkoff_state(
        request=request,
        user=request.user,
        target_date=today,
        expected_form_type="habits_today_manage",
    )
    if checkoff.was_submitted:
        messages.success(request, "Hàbits d'avui actualitzats.")
        return redirect("app:habit_list")

    return render(
        request,
        "app/dashboard/habits.html",
        {
            "habits": habits,
            "today_habits": checkoff.habits,
            "today": today,
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

    checkoff = get_habit_checkoff_state(
        request=request,
        user=request.user,
        target_date=selected_date,
        expected_form_type=None,
    )
    if checkoff.was_submitted:
        messages.success(
            request,
            f"Hàbits actualitzats per al dia {selected_date.isoformat()}.",
        )
        return redirect(
            f"{reverse('app:habit_day')}?date={selected_date.isoformat()}"
        )

    return render(
        request,
        "app/dashboard/habits_day.html",
        {
            "selected_date": selected_date,
            "day_habits": checkoff.habits,
        },
    )
