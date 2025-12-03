from django import template
from django.utils.safestring import mark_safe
from django.conf import settings
from pathlib import Path

register = template.Library()


@register.simple_tag
def svg(name, css_class='icon'):
    """
    Include an SVG file inline so it can be styled with CSS.
    
    Usage: {% svg 'youtube' %} or {% svg 'youtube' 'custom-class' %}
    """
    svg_path = Path(settings.BASE_DIR) / 'app' / 'static' / 'app' / 'icons' / f'{name}.svg'
    
    try:
        with open(svg_path, 'r') as f:
            svg_content = f.read()
            
        # Add class to the SVG tag
        if css_class:
            svg_content = svg_content.replace('<svg ', f'<svg class="{css_class}" ', 1)
        
        return mark_safe(svg_content)
    except FileNotFoundError:
        return ''


