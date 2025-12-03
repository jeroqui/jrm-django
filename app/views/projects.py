from django.shortcuts import render
from meta.views import Meta

from app.models import DeQueVaEpisode


def projects_index(request):
    """Projects listing page."""
    meta = Meta(
        title='Projectes',
        description='Projectes de Jacob Ràfols Morilla.',
        url=request.build_absolute_uri(),
        schemaorg_type='CollectionPage',
    )
    
    return render(request, 'app/projects/index.html', {'meta': meta})


def project_de_que_va(request):
    """De Que Va - Radio section project page."""
    episodes = DeQueVaEpisode.objects.all()[:10]
    
    meta = Meta(
        title='De Que Va',
        description='Secció de ràdio "De Que Va" - Filosofia i cinema a Ràdio Sant Boi.',
        url=request.build_absolute_uri(),
        schemaorg_type='RadioSeries',
    )
    
    return render(request, 'app/projects/de_que_va.html', {
        'episodes': episodes,
        'meta': meta,
    })


