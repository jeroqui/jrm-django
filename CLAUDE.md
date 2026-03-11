# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/website (jacob.rafols.cat) built with Django 5.x, migrated from Go. Features a blog, habit tracker, radio episode manager, and standalone project showcases.

## Common Commands

### Development

```bash
# Start Django dev server
python manage.py runserver

# Watch and compile frontend assets (SCSS + TypeScript in parallel)
npm run dev

# Run tests
python manage.py test

# Run a single test module
python manage.py test app.tests.test_habits_views

# Validate Django config after backend changes
python manage.py check

# Database migrations
python manage.py makemigrations
python manage.py migrate
```

### Frontend Build

```bash
npm run build:css    # Compile SCSS → app/static/app/css/main.css
npm run build:js     # Bundle TypeScript → app/static/app/js/main.js
npm run build        # Both (used by Makefile)
```

### Production

```bash
make production-build       # collectstatic + compress
make supervisor-restart     # Restart the gunicorn service
make deploy                 # Full deploy sequence
```

Settings module is selected via `DJANGO_SETTINGS_MODULE` env var (`.env` file loaded by python-decouple).

## Architecture

### Settings

Split into `jrm_django/settings/`: `base.py` (shared), `development.py` (SQLite, DEBUG, browser-reload), `production.py` (PostgreSQL, SSL, compression, logging).

### Apps & Modules

Single Django app (`app/`) with sub-modules:
- `app/models/` — User (extends AbstractUser), Post (blog), Habit, HabitCompletion, DeQueVaEpisode
- `app/views/` — Organized by feature: home, auth, blog, dashboard, projects. All exported via `app/views/__init__.py`
- `app/services/habits.py` — Business logic for habit tracking (keep domain logic out of views)
- `app/templatetags/` — `{% svg %}`, `{% debug %}`, `{% render_editorjs %}`
- `app/tests/` — Currently only habit model/service/view tests exist

### Frontend Pipeline

Source lives in `frontend/src/` (scss/, ts/); compiled output goes directly to `app/static/app/` (not a dist folder). esbuild handles TypeScript bundling; Sass handles SCSS. Three.js powers the 3D pen model on the homepage.

### URL & View Wiring

When adding URLs or views:
1. Add the view to the correct `app/views/<feature>.py`
2. Export it from `app/views/__init__.py`
3. Add the URL pattern to `app/urls.py`
4. Run `python manage.py check` to confirm no import errors

### Standalone Projects

`Doskvol Newspapers`, `Ortografia` (Vue.js), `Curriculum/CV` (Vue.js), and `Pomesagres` do **not** extend `base.html` — they are self-contained HTML pages to avoid CSS conflicts.

### Blog Content

Blog posts store content as Editor.js JSON in a `JSONField`. Rendering is done server-side via the `{% render_editorjs %}` template tag.

### Static Files

- **Development**: Django's built-in static file server
- **Production**: Whitenoise serves from `staticfiles/` (collected with `collectstatic`); django-compressor handles offline CSS/JS compression

### Deployment Stack

Gunicorn + Uvicorn workers bound to `127.0.0.1:8083`, managed by Supervisor (`/etc/supervisor/conf.d/jrm_django.conf`). Nginx handles SSL termination and proxying. Gunicorn is configured via `gunicorn.conf.py` (1 worker, 30s timeout).
