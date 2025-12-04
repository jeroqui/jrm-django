from .home import home, cv, narratives
from .blog import blog_list, blog_detail, blog_editor, blog_save, blog_list_drafts
from .auth import login_view, logout_view
from .dashboard import dashboard, episode_list, episode_create, episode_edit, episode_delete
from .projects import projects_index, project_de_que_va, project_doskvol_newspapers, project_ortografia, project_pomesagres, project_pomesagres_normes

__all__ = [
    'home',
    'cv',
    'narratives',
    'blog_list',
    'blog_detail', 
    'blog_editor',
    'blog_save',
    'blog_list_drafts',
    'login_view',
    'logout_view',
    'dashboard',
    'episode_list',
    'episode_create',
    'episode_edit',
    'episode_delete',
    'projects_index',
    'project_de_que_va',
    'project_doskvol_newspapers',
    'project_ortografia',
    'project_pomesagres',
    'project_pomesagres_normes',
]
