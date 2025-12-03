from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from app.models import Post, DeQueVaEpisode
from app.forms import DeQueVaEpisodeForm


@login_required
def dashboard(request):
    """Dashboard view with user utilities."""
    posts = Post.objects.filter(author=request.user)
    draft_count = posts.filter(status=Post.Status.DRAFT).count()
    published_count = posts.filter(status=Post.Status.PUBLISHED).count()
    
    episodes = DeQueVaEpisode.objects.all()[:5]
    episodes_count = DeQueVaEpisode.objects.count()
    
    context = {
        'posts': posts[:5],
        'draft_count': draft_count,
        'published_count': published_count,
        'total_posts': posts.count(),
        'episodes': episodes,
        'episodes_count': episodes_count,
    }
    
    return render(request, 'app/dashboard.html', context)


@login_required
def episode_list(request):
    """List all De Que Va episodes."""
    episodes = DeQueVaEpisode.objects.all()
    return render(request, 'app/dashboard/episodes.html', {'episodes': episodes})


@login_required
def episode_create(request):
    """Create a new episode."""
    if request.method == 'POST':
        form = DeQueVaEpisodeForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Episodi creat correctament!')
            return redirect('app:episode_list')
    else:
        form = DeQueVaEpisodeForm()
    
    return render(request, 'app/dashboard/episode_form.html', {
        'form': form,
        'title': 'Nou Episodi',
    })


@login_required
def episode_edit(request, pk):
    """Edit an existing episode."""
    episode = get_object_or_404(DeQueVaEpisode, pk=pk)
    
    if request.method == 'POST':
        form = DeQueVaEpisodeForm(request.POST, request.FILES, instance=episode)
        if form.is_valid():
            form.save()
            messages.success(request, 'Episodi actualitzat!')
            return redirect('app:episode_list')
    else:
        form = DeQueVaEpisodeForm(instance=episode)
    
    return render(request, 'app/dashboard/episode_form.html', {
        'form': form,
        'episode': episode,
        'title': 'Editar Episodi',
    })


@login_required
def episode_delete(request, pk):
    """Delete an episode."""
    episode = get_object_or_404(DeQueVaEpisode, pk=pk)
    
    if request.method == 'POST':
        episode.delete()
        messages.success(request, 'Episodi eliminat!')
        return redirect('app:episode_list')
    
    return render(request, 'app/dashboard/episode_delete.html', {'episode': episode})
