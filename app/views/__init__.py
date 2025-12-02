from .home import home
from .blog import blog_list, blog_detail, blog_editor, blog_save, blog_list_drafts
from .auth import login_view, logout_view
from .dashboard import dashboard

__all__ = [
    'home',
    'blog_list',
    'blog_detail', 
    'blog_editor',
    'blog_save',
    'blog_list_drafts',
    'login_view',
    'logout_view',
    'dashboard',
]
