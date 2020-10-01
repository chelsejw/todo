FROM python:3.6
ENV PYTHONUNBUFFERED 1
WORKDIR /code
VOLUME /code
ADD . /code
RUN pip install -r requirements.txt
RUN python manage.py collectstatic --no-input
CMD ["sh", "entry.sh"]