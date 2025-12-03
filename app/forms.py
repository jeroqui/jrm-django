from django import forms
from .models import DeQueVaEpisode


class DeQueVaEpisodeForm(forms.ModelForm):
    """Form for De Que Va episodes."""
    
    class Meta:
        model = DeQueVaEpisode
        fields = ['title', 'description', 'date', 'episode_number', 'audio_clip', 'full_episode_url']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Títol de l\'episodi',
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-input',
                'rows': 3,
                'placeholder': 'Descripció (opcional)',
            }),
            'date': forms.DateInput(attrs={
                'class': 'form-input',
                'type': 'date',
            }),
            'episode_number': forms.NumberInput(attrs={
                'class': 'form-input',
                'placeholder': 'Número d\'episodi (opcional)',
            }),
            'audio_clip': forms.FileInput(attrs={
                'class': 'form-input',
                'accept': 'audio/*',
            }),
            'full_episode_url': forms.URLInput(attrs={
                'class': 'form-input',
                'placeholder': 'https://...',
            }),
        }
        labels = {
            'title': 'Títol',
            'description': 'Descripció',
            'date': 'Data',
            'episode_number': 'Número d\'episodi',
            'audio_clip': 'Clip d\'àudio',
            'full_episode_url': 'Link al episodi complet',
        }

