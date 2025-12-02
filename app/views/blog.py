import json
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from meta.views import Meta

from app.models import Post


def blog_list(request):
    """List all published blog posts."""
    posts = Post.objects.filter(status=Post.Status.PUBLISHED)
    paginator = Paginator(posts, 10)
    page = request.GET.get('page', 1)
    posts = paginator.get_page(page)
    
    meta = Meta(
        title='Blog',
        description='Articles i pensaments de Jacob Ràfols Morilla.',
        url=request.build_absolute_uri(),
        schema={'@type': 'Blog', '@id': request.build_absolute_uri()},
    )
    
    return render(request, 'app/blog/list.html', {'posts': posts, 'meta': meta})


def blog_detail(request, slug):
    """Show a single blog post."""
    post = get_object_or_404(Post, slug=slug)
    
    # Only show drafts to the author
    if post.status == Post.Status.DRAFT and post.author != request.user:
        return redirect('app:blog_list')
    
    meta = Meta(
        title=post.title,
        description=post.excerpt or f'Article per {post.author.username}',
        url=request.build_absolute_uri(),
        image=post.cover_image.url if post.cover_image else None,
        schema={'@type': 'Article', '@id': request.build_absolute_uri()},
    )
    return render(request, 'app/blog/detail.html', {'post': post, 'meta': meta})


@login_required
def blog_editor(request, slug=None):
    """Editor view for creating/editing posts."""
    post = None
    if slug:
        post = get_object_or_404(Post, slug=slug, author=request.user)
    
    return render(request, 'app/blog/editor.html', {'post': post})


@login_required
@require_http_methods(["POST"])
def blog_save(request, slug=None):
    """API endpoint to save post content."""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    if slug:
        post = get_object_or_404(Post, slug=slug, author=request.user)
    else:
        post = Post(author=request.user)
    
    post.title = data.get('title', 'Untitled')
    post.content = data.get('content', {})
    post.excerpt = data.get('excerpt', '')
    
    # Only update status if provided
    if 'status' in data:
        post.status = data['status']
    
    post.save()
    
    return JsonResponse({
        'success': True,
        'slug': post.slug,
        'id': post.id,
        'status': post.status,
    })


@login_required
def blog_list_drafts(request):
    """List user's draft posts."""
    posts = Post.objects.filter(author=request.user)
    return render(request, 'app/blog/drafts.html', {'posts': posts})
