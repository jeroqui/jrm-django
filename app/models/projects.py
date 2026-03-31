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
    
    duration_seconds = models.PositiveIntegerField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.audio_clip and self.duration_seconds is None:
            try:
                import mutagen
                audio = mutagen.File(self.audio_clip.path)
                if audio and audio.info:
                    self.duration_seconds = int(audio.info.length)
                    super().save(update_fields=["duration_seconds"])
            except Exception:
                pass

    @property
    def duration_display(self) -> str:
        if not self.duration_seconds:
            return "--:--"
        m, s = divmod(self.duration_seconds, 60)
        return f"{m}:{s:02d}"

    class Meta:
        db_table = 'de_que_va_episodes'
        ordering = ['-date']
        verbose_name = 'De Que Va Episode'
        verbose_name_plural = 'De Que Va Episodes'
    
    def __str__(self):
        return f"{self.date} - {self.title}"

