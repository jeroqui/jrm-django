.PHONY: dev build collectstatic migrate deploy install

# Development
dev:
	python manage.py runserver

# Build frontend assets
build:
	echo "npm not building for now..."
# npm run build

# Collect static files
collectstatic:
	python manage.py collectstatic --noinput

# Run migrations
migrate:
	python manage.py migrate

# Compress static files (for production)
compress:
	python manage.py compress --force

# Production commands (use these on the server)
prod-migrate:
	DJANGO_SETTINGS_MODULE=jrm_django.settings.production python manage.py migrate

prod-collectstatic:
	DJANGO_SETTINGS_MODULE=jrm_django.settings.production python manage.py collectstatic --noinput --clear

prod-compress:
	DJANGO_SETTINGS_MODULE=jrm_django.settings.production python manage.py compress --force

prod-superuser:
	DJANGO_SETTINGS_MODULE=jrm_django.settings.production python manage.py createsuperuser

# Install dependencies
install:
	pip install -r requirements.txt
	npm install

# Full production build (run on server)
production-build: build prod-collectstatic prod-compress

# Run with gunicorn + uvicorn workers (production ASGI)
serve:
	DJANGO_SETTINGS_MODULE=jrm_django.settings.production gunicorn jrm_django.asgi:application -c gunicorn.conf.py

# Run with uvicorn directly (simpler, good for smaller deployments)
uvicorn:
	DJANGO_SETTINGS_MODULE=jrm_django.settings.production uvicorn jrm_django.asgi:application --host 0.0.0.0 --port 8083

# Run uvicorn in development mode (with reload)
uvicorn-dev:
	uvicorn jrm_django.asgi:application --reload --host 127.0.0.1 --port 8000

# Create superuser
superuser:
	python manage.py createsuperuser

# Supervisor commands
supervisor-install:
	sudo cp supervisor.conf /etc/supervisor/conf.d/jrm_django.conf
	sudo mkdir -p /var/log/supervisor
	sudo supervisorctl reread
	sudo supervisorctl update

supervisor-start:
	sudo supervisorctl start jrm_django

supervisor-stop:
	sudo supervisorctl stop jrm_django

supervisor-restart:
	sudo supervisorctl restart jrm_django

supervisor-status:
	sudo supervisorctl status jrm_django

supervisor-logs:
	sudo tail -f /var/log/supervisor/jrm_django.log

