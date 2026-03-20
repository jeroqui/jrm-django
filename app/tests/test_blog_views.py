import json
from datetime import date

from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from django.urls import reverse

from app.models import Post


User = get_user_model()

SAMPLE_CONTENT = {"blocks": [{"type": "paragraph", "data": {"text": "Hello"}}]}


class BlogListViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )

    def _make_post(self, title, status=Post.Status.PUBLISHED):
        return Post.objects.create(
            title=title, author=self.user, status=status, content=SAMPLE_CONTENT
        )

    def test_list_shows_published_posts(self):
        post = self._make_post("Published post")
        response = self.client.get(reverse("app:blog_list"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Published post")

    def test_list_hides_draft_posts(self):
        self._make_post("Secret draft", status=Post.Status.DRAFT)
        response = self.client.get(reverse("app:blog_list"))
        self.assertNotContains(response, "Secret draft")


class BlogDetailViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.author = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )
        self.other = User.objects.create_user(
            username="other", email="other@example.com", password="testpass123"
        )

    def test_published_post_is_visible_to_anyone(self):
        post = Post.objects.create(
            title="Public post",
            author=self.author,
            status=Post.Status.PUBLISHED,
            content=SAMPLE_CONTENT,
        )
        response = self.client.get(reverse("app:blog_detail", kwargs={"slug": post.slug}))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Public post")

    def test_draft_is_visible_to_author(self):
        post = Post.objects.create(
            title="My draft",
            author=self.author,
            status=Post.Status.DRAFT,
            content=SAMPLE_CONTENT,
        )
        self.client.force_login(self.author)
        response = self.client.get(reverse("app:blog_detail", kwargs={"slug": post.slug}))
        self.assertEqual(response.status_code, 200)

    def test_draft_redirects_for_non_author(self):
        post = Post.objects.create(
            title="Hidden draft",
            author=self.author,
            status=Post.Status.DRAFT,
            content=SAMPLE_CONTENT,
        )
        self.client.force_login(self.other)
        response = self.client.get(reverse("app:blog_detail", kwargs={"slug": post.slug}))
        self.assertRedirects(response, reverse("app:blog_list"))

    def test_draft_redirects_for_anonymous(self):
        post = Post.objects.create(
            title="Anon draft",
            author=self.author,
            status=Post.Status.DRAFT,
            content=SAMPLE_CONTENT,
        )
        response = self.client.get(reverse("app:blog_detail", kwargs={"slug": post.slug}))
        self.assertRedirects(response, reverse("app:blog_list"))


class BlogSaveViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )
        self.client.force_login(self.user)

    def test_create_post(self):
        response = self.client.post(
            reverse("app:blog_save_new"),
            data=json.dumps({"title": "New post", "content": SAMPLE_CONTENT, "excerpt": ""}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["success"])
        self.assertTrue(Post.objects.filter(slug=data["slug"]).exists())

    def test_update_post(self):
        post = Post.objects.create(
            title="Old title", author=self.user, content=SAMPLE_CONTENT
        )
        response = self.client.post(
            reverse("app:blog_save", kwargs={"slug": post.slug}),
            data=json.dumps({"title": "New title", "content": SAMPLE_CONTENT}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        post.refresh_from_db()
        self.assertEqual(post.title, "New title")

    def test_publish_sets_published_at(self):
        response = self.client.post(
            reverse("app:blog_save_new"),
            data=json.dumps(
                {"title": "Go live", "content": SAMPLE_CONTENT, "status": "published"}
            ),
            content_type="application/json",
        )
        slug = response.json()["slug"]
        post = Post.objects.get(slug=slug)
        self.assertEqual(post.status, Post.Status.PUBLISHED)
        self.assertIsNotNone(post.published_at)

    def test_save_requires_login(self):
        self.client.logout()
        response = self.client.post(
            reverse("app:blog_save_new"),
            data=json.dumps({"title": "x", "content": {}}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 302)

    def test_save_rejects_invalid_json(self):
        response = self.client.post(
            reverse("app:blog_save_new"),
            data="not json",
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)

    def test_cannot_edit_another_users_post(self):
        other = User.objects.create_user(
            username="other", email="other@example.com", password="testpass123"
        )
        post = Post.objects.create(
            title="Theirs", author=other, content=SAMPLE_CONTENT
        )
        response = self.client.post(
            reverse("app:blog_save", kwargs={"slug": post.slug}),
            data=json.dumps({"title": "Hijacked"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)


class BlogDraftsViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )

    def test_drafts_requires_login(self):
        response = self.client.get(reverse("app:blog_drafts"))
        self.assertEqual(response.status_code, 302)

    def test_drafts_shows_all_own_posts(self):
        Post.objects.create(
            title="Draft one", author=self.user, status=Post.Status.DRAFT, content=SAMPLE_CONTENT
        )
        Post.objects.create(
            title="Published one",
            author=self.user,
            status=Post.Status.PUBLISHED,
            content=SAMPLE_CONTENT,
        )
        self.client.force_login(self.user)
        response = self.client.get(reverse("app:blog_drafts"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Draft one")
        self.assertContains(response, "Published one")


class PostModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="jacob", email="jacob@example.com", password="testpass123"
        )

    def test_slug_is_auto_generated_from_title(self):
        post = Post.objects.create(
            title="Hello World", author=self.user, content=SAMPLE_CONTENT
        )
        self.assertEqual(post.slug, "hello-world")

    def test_published_at_set_on_first_publish(self):
        post = Post.objects.create(
            title="Draft", author=self.user, content=SAMPLE_CONTENT
        )
        self.assertIsNone(post.published_at)
        post.status = Post.Status.PUBLISHED
        post.save()
        self.assertIsNotNone(post.published_at)

    def test_published_at_not_overwritten_on_resave(self):
        post = Post.objects.create(
            title="Live", author=self.user, status=Post.Status.PUBLISHED, content=SAMPLE_CONTENT
        )
        original_ts = post.published_at
        post.title = "Live (edited)"
        post.save()
        post.refresh_from_db()
        self.assertEqual(post.published_at, original_ts)
