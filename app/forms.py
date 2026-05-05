from django import forms

from .models import DeQueVaEpisode, Habit, Task, TaskGroup


class DeQueVaEpisodeForm(forms.ModelForm):
    """Form for De Que Va episodes."""

    class Meta:
        model = DeQueVaEpisode
        fields = [
            "title",
            "description",
            "date",
            "episode_number",
            "audio_clip",
            "full_episode_url",
        ]
        widgets = {
            "title": forms.TextInput(
                attrs={
                    "class": "form-input",
                    "placeholder": "Títol de l'episodi",
                }
            ),
            "description": forms.Textarea(
                attrs={
                    "class": "form-input",
                    "rows": 3,
                    "placeholder": "Descripció (opcional)",
                }
            ),
            "date": forms.DateInput(
                attrs={
                    "class": "form-input",
                    "type": "date",
                }
            ),
            "episode_number": forms.NumberInput(
                attrs={
                    "class": "form-input",
                    "placeholder": "Número d'episodi (opcional)",
                }
            ),
            "audio_clip": forms.FileInput(
                attrs={
                    "class": "form-input",
                    "accept": "audio/*",
                }
            ),
            "full_episode_url": forms.URLInput(
                attrs={
                    "class": "form-input",
                    "placeholder": "https://...",
                }
            ),
        }
        labels = {
            "title": "Títol",
            "description": "Descripció",
            "date": "Data",
            "episode_number": "Número d'episodi",
            "audio_clip": "Clip d'àudio",
            "full_episode_url": "Link al episodi complet",
        }


class HabitForm(forms.ModelForm):
    """Form to configure a habit and its lifecycle."""

    class Meta:
        model = Habit
        fields = [
            "name",
            "description",
            "status",
            "status_reason",
            "start_date",
            "end_date",
        ]
        widgets = {
            "name": forms.TextInput(
                attrs={
                    "class": "form-input",
                    "placeholder": "Nom de l'hàbit",
                }
            ),
            "description": forms.Textarea(
                attrs={
                    "class": "form-input",
                    "rows": 3,
                    "placeholder": "Descripció (opcional)",
                }
            ),
            "status": forms.Select(
                attrs={
                    "class": "form-input",
                }
            ),
            "status_reason": forms.Textarea(
                attrs={
                    "class": "form-input",
                    "rows": 2,
                    "placeholder": "Per què l'has completat o abandonat?",
                }
            ),
            "start_date": forms.DateInput(
                attrs={
                    "class": "form-input",
                    "type": "date",
                }
            ),
            "end_date": forms.DateInput(
                attrs={
                    "class": "form-input",
                    "type": "date",
                }
            ),
        }
        labels = {
            "name": "Nom",
            "description": "Descripció",
            "status": "Estat",
            "status_reason": "Motiu",
            "start_date": "Data d'inici",
            "end_date": "Data de finalització",
        }


class TaskGroupForm(forms.ModelForm):
    class Meta:
        model = TaskGroup
        fields = ["name", "color"]
        widgets = {
            "name": forms.TextInput(
                attrs={"class": "form-input", "placeholder": "Nom del grup"}
            ),
            "color": forms.TextInput(
                attrs={"class": "form-input", "placeholder": "orange / #ff6b6b / rgb(255,100,0)"}
            ),
        }
        labels = {
            "name": "Nom",
            "color": "Color",
        }


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ["title", "notes", "group", "parent", "scheduled_date"]
        widgets = {
            "title": forms.TextInput(
                attrs={"class": "form-input", "placeholder": "Títol de la tasca"}
            ),
            "notes": forms.Textarea(
                attrs={"class": "form-input", "rows": 3, "placeholder": "Notes (opcional)"}
            ),
            "group": forms.Select(attrs={"class": "form-input"}),
            "parent": forms.Select(attrs={"class": "form-input"}),
            "scheduled_date": forms.DateInput(
                attrs={"class": "form-input", "type": "date"}
            ),
        }
        labels = {
            "title": "Títol",
            "notes": "Notes",
            "group": "Grup",
            "parent": "Tasca pare",
            "scheduled_date": "Data programada",
        }

    def __init__(self, *args, user=None, **kwargs):
        super().__init__(*args, **kwargs)
        if user is not None:
            self.fields["group"].queryset = TaskGroup.objects.filter(user=user)
            self.fields["parent"].queryset = Task.objects.filter(
                user=user, status=Task.Status.PENDING
            ).exclude(pk=self.instance.pk if self.instance.pk else None)
        self.fields["group"].required = False
        self.fields["parent"].required = False


class TaskDiscardForm(forms.Form):
    reason = forms.CharField(
        widget=forms.Textarea(
            attrs={
                "class": "form-input",
                "rows": 3,
                "placeholder": "Per què descartes aquesta tasca?",
            }
        ),
        label="Motiu",
    )

