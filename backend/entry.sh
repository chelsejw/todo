echo Starting Django-React Blueprint with Gunicorn!
exec gunicorn todo_backend.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 3