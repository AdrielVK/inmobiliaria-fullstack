# Generated by Django 4.2.9 on 2024-04-19 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estates', '0003_alter_property_latitude_alter_property_longitude'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feature',
            name='name',
            field=models.CharField(choices=[('bedrooms', 'Bedrooms'), ('toilets', 'Toilets'), ('bathroom', 'Bathroom'), ('environments', 'Environments'), ('flats', 'Flats'), ('garage', 'Garage')], max_length=20),
        ),
        migrations.AlterField(
            model_name='property',
            name='features',
            field=models.ManyToManyField(null=True, to='estates.feature'),
        ),
        migrations.AlterField(
            model_name='property',
            name='images',
            field=models.ManyToManyField(blank=True, null=True, related_name='property_images', to='estates.image'),
        ),
    ]