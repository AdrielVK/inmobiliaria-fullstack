# Generated by Django 4.2.9 on 2024-03-02 23:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estates', '0002_alter_property_antiquity_alter_property_type'),
        ('users', '0006_remove_user_favorites_user_favorites_posts'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='favorites_posts',
        ),
        migrations.AddField(
            model_name='user',
            name='favorites',
            field=models.ManyToManyField(blank=True, to='estates.property'),
        ),
    ]
