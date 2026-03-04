# Gunicorn configuration file (ASGI with uvicorn workers)
import multiprocessing

# Server socket
bind = "127.0.0.1:8083"
backlog = 2048

# Worker processes (using uvicorn workers for ASGI)
workers = 1
worker_class = "uvicorn.workers.UvicornWorker"
worker_connections = 1000
timeout = 30
keepalive = 2

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"
access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# Process naming
proc_name = "jrm_django"

# Server mechanics
daemon = False
pidfile = None
umask = 0
user = None
group = None
tmp_upload_dir = None

# SSL (uncomment and configure if terminating SSL at gunicorn)
# keyfile = "/path/to/keyfile"
# certfile = "/path/to/certfile"

