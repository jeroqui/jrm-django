from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from django.conf import settings


class Post(models.Model):
    """Blog post model with Editor.js content storage."""
    
    class Status(models.TextChoices):
        DRAFT = 'draft', 'Draft'
        PUBLISHED = 'published', 'Published'
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='posts'
    )
    
    # Editor.js stores content as JSON
    content = models.JSONField(default=dict, blank=True)
    excerpt = models.TextField(blank=True)
    
    cover_image = models.ImageField(upload_to='posts/covers/', blank=True, null=True)
    
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.DRAFT
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(blank=True, null=True)
    
    class Meta:
        db_table = 'posts'
        ordering = ['-published_at', '-created_at']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        
        # Set published_at when first published
        if self.status == self.Status.PUBLISHED and not self.published_at:
            self.published_at = timezone.now()
        
        super().save(*args, **kwargs)
    
    @property
    def is_published(self):
        return self.status == self.Status.PUBLISHED

