from django.shortcuts import render
from meta.views import Meta


def home(request):
    """Home page view."""
    meta = Meta(
        title='Jacob Ràfols Morilla',
        description='Escric, programo, dissenyo. Portfolio personal de Jacob Ràfols Morilla.',
        keywords=['portfolio', 'developer', 'writer', 'designer', 'barcelona'],
        url=request.build_absolute_uri(),
        schemaorg_type='WebSite',
    )
    return render(request, 'app/home.html', {'meta': meta})
