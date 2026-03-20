import io
from datetime import date

from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import Client, TestCase
from django.urls import reverse

from app.models import DeQueVaEpisode


User = get_user_model()


def _make_episode(**kwargs):
    defaults = {
        "title": "Test episode",
        "description": "A test description",
        "date": date(2024, 1, 15),
        "episode_number": 1,
        "full_episode_url": "https://example.com/ep1",
    }
    defaults.update(kwargs)
    return DeQueVaEpisode.objects.create(**defaults)


class EpisodeListViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )
        self.client.force_login(self.user)

    def test_list_requires_login(self):
        self.client.logout()
        response = self.client.get(reverse("app:episode_list"))
        self.assertEqual(response.status_code, 302)

    def test_list_shows_all_episodes(self):
        _make_episode(title="Episode one")
        _make_episode(title="Episode two", date=date(2024, 2, 1), episode_number=2)
        response = self.client.get(reverse("app:episode_list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Episode one")
        self.assertContains(response, "Episode two")


class EpisodeCreateViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )
        self.client.force_login(self.user)

    def test_create_requires_login(self):
        self.client.logout()
        response = self.client.get(reverse("app:episode_create"))
        self.assertEqual(response.status_code, 302)

    def test_get_renders_empty_form(self):
        response = self.client.get(reverse("app:episode_create"))
        self.assertEqual(response.status_code, 200)
        self.assertIn("form", response.context)

    def test_post_creates_episode_and_redirects(self):
        response = self.client.post(
            reverse("app:episode_create"),
            {
                "title": "New episode",
                "description": "desc",
                "date": "2024-03-01",
                "episode_number": 5,
                "full_episode_url": "https://example.com/ep5",
            },
            follow=True,
        )
        self.assertEqual(response.status_code, 200)
        self.assertTrue(DeQueVaEpisode.objects.filter(title="New episode").exists())
        self.assertRedirects(response, reverse("app:episode_list"))

    def test_post_invalid_does_not_create(self):
        response = self.client.post(
            reverse("app:episode_create"),
            {"title": ""},  # title is required
        )
        self.assertEqual(response.status_code, 200)
        self.assertFalse(DeQueVaEpisode.objects.exists())


class EpisodeEditViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )
        self.client.force_login(self.user)
        self.episode = _make_episode()

    def test_edit_requires_login(self):
        self.client.logout()
        response = self.client.get(
            reverse("app:episode_edit", kwargs={"pk": self.episode.pk})
        )
        self.assertEqual(response.status_code, 302)

    def test_get_prepopulates_form(self):
        response = self.client.get(
            reverse("app:episode_edit", kwargs={"pk": self.episode.pk})
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context["episode"], self.episode)

    def test_post_updates_episode(self):
        response = self.client.post(
            reverse("app:episode_edit", kwargs={"pk": self.episode.pk}),
            {
                "title": "Updated title",
                "description": "desc",
                "date": "2024-01-15",
                "episode_number": 1,
                "full_episode_url": "https://example.com/ep1",
            },
            follow=True,
        )
        self.assertRedirects(response, reverse("app:episode_list"))
        self.episode.refresh_from_db()
        self.assertEqual(self.episode.title, "Updated title")

    def test_404_for_missing_episode(self):
        response = self.client.get(
            reverse("app:episode_edit", kwargs={"pk": 9999})
        )
        self.assertEqual(response.status_code, 404)


class EpisodeDeleteViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )
        self.client.force_login(self.user)
        self.episode = _make_episode()

    def test_delete_requires_login(self):
        self.client.logout()
        response = self.client.post(
            reverse("app:episode_delete", kwargs={"pk": self.episode.pk})
        )
        self.assertEqual(response.status_code, 302)
        self.assertTrue(DeQueVaEpisode.objects.filter(pk=self.episode.pk).exists())

    def test_get_renders_confirmation_page(self):
        response = self.client.get(
            reverse("app:episode_delete", kwargs={"pk": self.episode.pk})
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.episode.title)

    def test_post_deletes_episode_and_redirects(self):
        response = self.client.post(
            reverse("app:episode_delete", kwargs={"pk": self.episode.pk}),
            follow=True,
        )
        self.assertRedirects(response, reverse("app:episode_list"))
        self.assertFalse(DeQueVaEpisode.objects.filter(pk=self.episode.pk).exists())

    def test_404_for_missing_episode(self):
        response = self.client.post(
            reverse("app:episode_delete", kwargs={"pk": 9999})
        )
        self.assertEqual(response.status_code, 404)
