# Generated by Django 4.2.9 on 2024-02-29 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estates', '0002_alter_property_antiquity_alter_property_type'),
        ('users', '0003_alter_user_banner_picture_alter_user_profile_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favorites',
            field=models.ManyToManyField(to='estates.property'),
        ),
    ]
