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


def cv(request):
    """CV/Curriculum page view."""
    meta = Meta(
        title='Curriculum Vitae',
        description='Curriculum vitae de Jacob Ràfols Morilla.',
        url=request.build_absolute_uri(),
        schemaorg_type='Person',
    )
    return render(request, 'app/curriculum/curriculum.html', {'meta': meta})
