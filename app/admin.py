from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Post


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
