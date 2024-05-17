# Generated by Django 4.2.9 on 2024-03-07 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estates', '0002_alter_property_antiquity_alter_property_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='latitude',
            field=models.DecimalField(decimal_places=8, max_digits=11),
        ),
        migrations.AlterField(
            model_name='property',
            name='longitude',
            field=models.DecimalField(decimal_places=8, max_digits=11),
        ),
    ]
