# Generated by Django 4.2.9 on 2024-04-28 03:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estates', '0004_alter_feature_name_alter_property_features_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='features',
            field=models.ManyToManyField(blank=True, null=True, to='estates.feature'),
        ),
    ]
