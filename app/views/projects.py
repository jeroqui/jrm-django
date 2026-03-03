from django.contrib.auth import get_user_model
from django.shortcuts import render
from meta.views import Meta

from app.models import DeQueVaEpisode, Habit
from app.services.habits import build_habit_calendar, group_calendar_by_week


def projects_index(request):
    """Projects listing page."""
    meta = Meta(
        title="Projectes",
        description="Projectes de Jacob Ràfols Morilla.",
        url=request.build_absolute_uri(),
        schemaorg_type="CollectionPage",
    )

    return render(request, "app/projects/index.html", {"meta": meta})


def project_de_que_va(request):
    """De Que Va - Radio section project page."""
    episodes = DeQueVaEpisode.objects.all()[:10]

    meta = Meta(
        title="De Que Va",
        description='Secció de ràdio "De Que Va" - Filosofia i cinema a Ràdio Sant Boi.',
        url=request.build_absolute_uri(),
        schemaorg_type="RadioSeries",
    )

    return render(
        request,
        "app/projects/de_que_va.html",
        {
            "episodes": episodes,
            "meta": meta,
        },
    )


def project_doskvol_newspapers(request):
    """Doskvol Newspapers - Blades in the Dark campaign props."""
    meta = Meta(
        title="Periòdics de Doskvol",
        description='Periòdics creats per a la campanya de Blades in the Dark "Lime & Wine".',
        url=request.build_absolute_uri(),
        schemaorg_type="CreativeWork",
    )

    return render(
        request,
        "app/projects/doskvol_newspapers.html",
        {"meta": meta},
    )


def project_ortografia(request):
    """Ortografia - Spelling practice game."""
    meta = Meta(
        title="Ortografia",
        description="Joc per practicar l'ortografia en català i castellà.",
        url=request.build_absolute_uri(),
        schemaorg_type="WebApplication",
    )

    return render(
        request,
        "app/projects/ortografia.html",
        {"meta": meta},
    )


def project_pomesagres(request):
    """Pomes Agres - Social role-playing game."""
    meta = Meta(
        title="Pomes Agres: Un joc de rol social",
        description=(
            "Un joc de rol social on encarnareu uns mafiosos sense escrupuls "
            "mentre disfruteu d'una festa com manen els anys 20."
        ),
        url=request.build_absolute_uri(),
        schemaorg_type="Game",
    )

    return render(
        request,
        "app/projects/pomesagres/index.html",
        {"meta": meta},
    )


def project_pomesagres_normes(request):
    """Pomes Agres - Rules page."""
    meta = Meta(
        title="Normes | Pomes Agres",
        description="Les normes de Pomes Agres - Un joc de rol social.",
        url=request.build_absolute_uri(),
        schemaorg_type="Game",
    )

    return render(
        request,
        "app/projects/pomesagres/normes.html",
        {"meta": meta},
    )


def project_jacobs_habits(request):
    """
    Jacob's Habits - GitHub-like habit calendar.

    Shows how many active habits were completed each day, plus a per-habit
    breakdown of status and completion history.
    """
    User = get_user_model()
    owner = User.objects.filter(is_superuser=True).first() or User.objects.first()

    if owner is None:
        summaries = []
        weeks = []
        habits = Habit.objects.none()
    else:
        summaries = build_habit_calendar(user=owner)
        weeks = group_calendar_by_week(summaries)
        habits = Habit.objects.filter(user=owner).prefetch_related("completions")

    meta = Meta(
        title="Jacob's Habits",
        description=(
            "Seguiment visual dels hàbits diaris de Jacob amb un calendari "
            "tipus GitHub."
        ),
        url=request.build_absolute_uri(),
        schemaorg_type="WebApplication",
    )

    return render(
        request,
        "app/projects/jacobs_habits.html",
        {
            "meta": meta,
            "calendar_weeks": weeks,
            "habits": habits,
        },
    )

