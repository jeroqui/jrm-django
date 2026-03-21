"""
Ensure every page that renders a navbar also loads main.js and includes
the hamburger button markup needed for the mobile menu.
"""
from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse

from app.models import Post

User = get_user_model()

SCRIPT_MARKER = "main.js"
HAMBURGER_MARKER = "navbar-hamburger"


class PublicNavbarPagesTests(TestCase):
    """Pages that extend base.html (public navbar)."""

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )
        self.post = Post.objects.create(
            title="Test post",
            author=self.user,
            status=Post.Status.PUBLISHED,
            content={"blocks": []},
        )

    def _assert_navbar_assets(self, url):
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200, f"Unexpected status for {url}")
        self.assertContains(response, SCRIPT_MARKER, msg_prefix=url)
        self.assertContains(response, HAMBURGER_MARKER, msg_prefix=url)

    def test_home(self):
        self._assert_navbar_assets(reverse("app:home"))

    def test_blog_list(self):
        self._assert_navbar_assets(reverse("app:blog_list"))

    def test_blog_detail(self):
        self._assert_navbar_assets(
            reverse("app:blog_detail", kwargs={"slug": self.post.slug})
        )

    def test_projects(self):
        self._assert_navbar_assets(reverse("app:projects"))

class DashboardNavbarPagesTests(TestCase):
    """Pages that extend dashboard_base.html (dashboard navbar)."""

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )
        self.client.force_login(self.user)

    def _assert_navbar_assets(self, url):
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200, f"Unexpected status for {url}")
        self.assertContains(response, SCRIPT_MARKER, msg_prefix=url)
        self.assertContains(response, HAMBURGER_MARKER, msg_prefix=url)

    def test_dashboard(self):
        self._assert_navbar_assets(reverse("app:dashboard"))

    def test_habit_list(self):
        self._assert_navbar_assets(reverse("app:habit_list"))

    def test_episode_list(self):
        self._assert_navbar_assets(reverse("app:episode_list"))
