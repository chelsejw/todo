# Generated by Django 3.1.1 on 2020-09-28 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='status',
        ),
        migrations.AddField(
            model_name='item',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]