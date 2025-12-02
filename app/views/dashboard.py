from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from app.models import Post


@login_required
def dashboard(request):
    """Dashboard view with user utilities."""
    posts = Post.objects.filter(author=request.user)
    draft_count = posts.filter(status=Post.Status.DRAFT).count()
    published_count = posts.filter(status=Post.Status.PUBLISHED).count()
    
    context = {
        'posts': posts[:5],  # Recent 5 posts
        'draft_count': draft_count,
        'published_count': published_count,
        'total_posts': posts.count(),
    }
    
    return render(request, 'app/dashboard.html', context)

