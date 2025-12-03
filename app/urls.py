from django.urls import path
from . import views

app_name = 'app'

urlpatterns = [
    # Home
    path('', views.home, name='home'),
    
    # Auth
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    # Dashboard
    path('dashboard/', views.dashboard, name='dashboard'),
    path('dashboard/episodes/', views.episode_list, name='episode_list'),
    path('dashboard/episodes/new/', views.episode_create, name='episode_create'),
    path('dashboard/episodes/<int:pk>/edit/', views.episode_edit, name='episode_edit'),
    path('dashboard/episodes/<int:pk>/delete/', views.episode_delete, name='episode_delete'),
    
    # Projects
    path('projects/', views.projects_index, name='projects'),
    path('projects/de-que-va/', views.project_de_que_va, name='project_de_que_va'),
    path('projects/doskvol-newspapers/', views.project_doskvol_newspapers, name='project_doskvol_newspapers'),
    path('projects/ortografia/', views.project_ortografia, name='project_ortografia'),
    
    # Blog
    path('blog/', views.blog_list, name='blog_list'),
    path('blog/drafts/', views.blog_list_drafts, name='blog_drafts'),
    path('blog/new/', views.blog_editor, name='blog_new'),
    path('blog/edit/<slug:slug>/', views.blog_editor, name='blog_edit'),
    path('blog/save/', views.blog_save, name='blog_save_new'),
    path('blog/save/<slug:slug>/', views.blog_save, name='blog_save'),
    path('blog/<slug:slug>/', views.blog_detail, name='blog_detail'),
]
