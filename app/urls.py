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
    
    # Blog
    path('blog/', views.blog_list, name='blog_list'),
    path('blog/drafts/', views.blog_list_drafts, name='blog_drafts'),
    path('blog/new/', views.blog_editor, name='blog_new'),
    path('blog/edit/<slug:slug>/', views.blog_editor, name='blog_edit'),
    path('blog/save/', views.blog_save, name='blog_save_new'),
    path('blog/save/<slug:slug>/', views.blog_save, name='blog_save'),
    path('blog/<slug:slug>/', views.blog_detail, name='blog_detail'),
]
