from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Post, DeQueVaEpisode


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """Custom User admin."""
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (
        ('Profile', {'fields': ('bio', 'avatar', 'website')}),
    )


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    """Post admin."""
    list_display = ('title', 'author', 'status', 'created_at', 'published_at')
    list_filter = ('status', 'created_at', 'author')
    search_fields = ('title', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)


@admin.register(DeQueVaEpisode)
class DeQueVaEpisodeAdmin(admin.ModelAdmin):
    """De Que Va Episode admin."""
    list_display = ('title', 'date', 'episode_number', 'has_clip', 'has_link')
    list_filter = ('date',)
    search_fields = ('title', 'description')
    date_hierarchy = 'date'
    ordering = ('-date',)
    
    @admin.display(boolean=True, description='Clip')
    def has_clip(self, obj):
        return bool(obj.audio_clip)
    
    @admin.display(boolean=True, description='Link')
    def has_link(self, obj):
        return bool(obj.full_episode_url)
