# Generated by Django 4.2.9 on 2024-03-13 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users_messages', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='saw',
            field=models.BooleanField(default=False),
        ),
    ]
