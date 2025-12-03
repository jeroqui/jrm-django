from django.db import models


class DeQueVaEpisode(models.Model):
    """Episode for the 'De Que Va' radio section."""
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    # Audio clip of the section
    audio_clip = models.FileField(upload_to='de_que_va/clips/', blank=True, null=True)
    
    # Link to full episode on radio website
    full_episode_url = models.URLField(blank=True, verbose_name='Link al episodi complet')
    
    # Date of the episode
    date = models.DateField()
    
    # Optional: episode number
    episode_number = models.PositiveIntegerField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'de_que_va_episodes'
        ordering = ['-date']
        verbose_name = 'De Que Va Episode'
        verbose_name_plural = 'De Que Va Episodes'
    
    def __str__(self):
        return f"{self.date} - {self.title}"

