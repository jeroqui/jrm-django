"""
Development settings for jrm_django project.
"""

from .base import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Add browser reload for development
INSTALLED_APPS += ['django_browser_reload']
MIDDLEWARE.insert(
    MIDDLEWARE.index('htmlmin.middleware.HtmlMinifyMiddleware'),
    'django_browser_reload.middleware.BrowserReloadMiddleware'
)

# Django Compressor settings (disabled in dev)
COMPRESS_ENABLED = False
COMPRESS_OFFLINE = False
COMPRESS_CSS_FILTERS = [
    'compressor.filters.css_default.CssAbsoluteFilter',
    'compressor.filters.cssmin.rCSSMinFilter',
]
COMPRESS_JS_FILTERS = [
    'compressor.filters.jsmin.rJSMinFilter',
]

# HTML Minification (disabled in dev)
HTML_MINIFY = False
EXCLUDE_FROM_MINIFYING = ['^admin/']

# Whitenoise (simple config for dev)
STORAGES = {
    'default': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    },
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedStaticFilesStorage',
    },
}

