from django.urls import path
from django.views.generic import RedirectView

from . import views

app_name = "app"

urlpatterns = [
    # Home
    path("", views.home, name="home"),
    path("cv/", views.cv, name="cv"),
    path("narrativa/", views.narratives, name="narratives"),

    # Auth
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),

    # Dashboard
    path("dashboard/", views.dashboard, name="dashboard"),
    path("dashboard/episodes/", views.episode_list, name="episode_list"),
    path(
        "dashboard/episodes/new/",
        views.episode_create,
        name="episode_create",
    ),
    path(
        "dashboard/episodes/<int:pk>/edit/",
        views.episode_edit,
        name="episode_edit",
    ),
    path(
        "dashboard/episodes/<int:pk>/delete/",
        views.episode_delete,
        name="episode_delete",
    ),

    # Habits
    path("dashboard/habits/", views.habit_list, name="habit_list"),
    path("dashboard/habits/new/", views.habit_create, name="habit_create"),
    path(
        "dashboard/habits/<int:pk>/edit/",
        views.habit_edit,
        name="habit_edit",
    ),
    path("dashboard/habits/day/", views.habit_day, name="habit_day"),

    # Tasks (staff only)
    path("dashboard/tasks/", views.task_list, name="task_list"),
    path("dashboard/tasks/new/", views.task_create, name="task_create"),
    path("dashboard/tasks/<int:pk>/edit/", views.task_edit, name="task_edit"),
    path("dashboard/tasks/cleanup/", views.task_cleanup, name="task_cleanup"),
    path("dashboard/tasks/stats/", views.task_stats, name="task_stats"),
    path("dashboard/task-groups/", views.task_group_list, name="task_group_list"),
    path("dashboard/task-groups/<int:pk>/edit/", views.task_group_edit, name="task_group_edit"),
    path("dashboard/task-groups/<int:pk>/delete/", views.task_group_delete, name="task_group_delete"),
    path("dashboard/tasks/api/create/", views.task_api_create, name="task_api_create"),
    path("dashboard/tasks/api/reorder/", views.task_api_reorder, name="task_api_reorder"),
    path("dashboard/tasks/api/move-period/", views.task_api_move_period, name="task_api_move_period"),
    path("dashboard/tasks/<int:pk>/api/complete/", views.task_api_complete, name="task_api_complete"),
    path("dashboard/tasks/<int:pk>/api/discard/", views.task_api_discard, name="task_api_discard"),
    path("dashboard/tasks/<int:pk>/api/reschedule/", views.task_api_reschedule, name="task_api_reschedule"),
    path("dashboard/tasks/<int:pk>/api/update/", views.task_api_update, name="task_api_update"),

    # Projects
    path("projects/", views.projects_index, name="projects"),
    path("projects/de-que-va/", views.project_de_que_va, name="project_de_que_va"),
    path(
        "projects/doskvol-newspapers/",
        views.project_doskvol_newspapers,
        name="project_doskvol_newspapers",
    ),
    path("projects/ortografia/", views.project_ortografia, name="project_ortografia"),
    path("projects/pomesagres/", views.project_pomesagres, name="project_pomesagres"),
    path(
        "projects/pomesagres/normes/",
        views.project_pomesagres_normes,
        name="project_pomesagres_normes",
    ),
    path(
        "projects/jacobs-habits/",
        views.project_jacobs_habits,
        name="project_jacobs_habits",
    ),

    # Legacy redirects (old Go site URLs indexed by Google)
    path("projectes/", RedirectView.as_view(url="/projects/", permanent=True)),
    path("pomesagres/", RedirectView.as_view(url="/projects/pomesagres/", permanent=True)),
    path("pomesagres", RedirectView.as_view(url="/projects/pomesagres/", permanent=True)),
    path("projectes/tools/ortografia", RedirectView.as_view(url="/projects/ortografia/", permanent=True)),

    # Blog
    path("blog/", views.blog_list, name="blog_list"),
    path("blog/drafts/", views.blog_list_drafts, name="blog_drafts"),
    path("blog/new/", views.blog_editor, name="blog_new"),
    path("blog/edit/<slug:slug>/", views.blog_editor, name="blog_edit"),
    path("blog/save/", views.blog_save, name="blog_save_new"),
    path("blog/save/<slug:slug>/", views.blog_save, name="blog_save"),
    path("blog/<slug:slug>/", views.blog_detail, name="blog_detail"),
]
