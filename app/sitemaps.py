from django.contrib.sitemaps import Sitemap
from django.urls import reverse

from .models import Post


class StaticViewSitemap(Sitemap):
    """Sitemap for static pages."""
    priority = 0.8
    changefreq = 'weekly'

    def items(self):
        return ['app:home', 'app:cv', 'app:blog_list', 'app:projects']

    def location(self, item):
        return reverse(item)


class BlogPostSitemap(Sitemap):
    """Sitemap for blog posts."""
    changefreq = 'monthly'
    priority = 0.6

    def items(self):
        return Post.objects.filter(status=Post.Status.PUBLISHED)

    def lastmod(self, obj):
        return obj.updated_at

    def location(self, obj):
        return reverse('app:blog_detail', kwargs={'slug': obj.slug})


class ProjectsSitemap(Sitemap):
    """Sitemap for project pages."""
    priority = 0.7
    changefreq = 'monthly'

    def items(self):
        # Add project URLs here as you create them
        return ['app:project_de_que_va', 'app:project_doskvol_newspapers', 'app:project_ortografia', 'app:project_pomesagres']

    def location(self, item):
        return reverse(item)

