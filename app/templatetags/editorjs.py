from django import template
from django.utils.safestring import mark_safe
from django.utils.html import escape

register = template.Library()


@register.filter
def render_editorjs(content):
    """Render Editor.js JSON content to HTML."""
    if not content or not isinstance(content, dict):
        return ''
    
    blocks = content.get('blocks', [])
    html_parts = []
    
    for block in blocks:
        rendered = render_block(block)
        if rendered:
            html_parts.append(rendered)
    
    return mark_safe('\n'.join(html_parts))


def render_block(block):
    """Render a single Editor.js block to HTML."""
    block_type = block.get('type')
    data = block.get('data', {})
    
    renderers = {
        'header': render_header,
        'paragraph': render_paragraph,
        'list': render_list,
        'code': render_code,
        'quote': render_quote,
        'image': render_image,
        'delimiter': render_delimiter,
    }
    
    renderer = renderers.get(block_type)
    if renderer:
        return renderer(data)
    
    return None


def render_header(data):
    level = data.get('level', 2)
    text = data.get('text', '')
    # Text may contain inline formatting, keep it
    return f'<h{level}>{text}</h{level}>'


def render_paragraph(data):
    text = data.get('text', '')
    return f'<p>{text}</p>'


def render_list(data):
    style = data.get('style', 'unordered')
    items = data.get('items', [])
    
    tag = 'ol' if style == 'ordered' else 'ul'
    items_html = '\n'.join(f'<li>{item}</li>' for item in items)
    
    return f'<{tag} class="content-list">\n{items_html}\n</{tag}>'


def render_code(data):
    code = escape(data.get('code', ''))
    return f'<pre><code>{code}</code></pre>'


def render_quote(data):
    text = data.get('text', '')
    caption = data.get('caption', '')
    
    html = f'<blockquote>{text}'
    if caption:
        html += f'\n<cite>{caption}</cite>'
    html += '</blockquote>'
    
    return html


def render_image(data):
    url = data.get('file', {}).get('url') or data.get('url', '')
    caption = data.get('caption', '')
    
    if not url:
        return None
    
    html = f'<figure>\n<img src="{escape(url)}" alt="{escape(caption)}">'
    if caption:
        html += f'\n<figcaption>{caption}</figcaption>'
    html += '\n</figure>'
    
    return html


def render_delimiter(data):
    return '<hr>'

