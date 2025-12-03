from django import template
from django.conf import settings

register = template.Library()


@register.tag('debug')
def do_debug(parser, token):
    """
    Only render content when DEBUG is True.
    
    Usage:
        {% debug %}
        <link rel="stylesheet" href="...">
        {% enddebug %}
    """
    nodelist = parser.parse(('enddebug',))
    parser.delete_first_token()
    return DebugNode(nodelist)


class DebugNode(template.Node):
    def __init__(self, nodelist):
        self.nodelist = nodelist

    def render(self, context):
        if settings.DEBUG:
            return self.nodelist.render(context)
        return ''

