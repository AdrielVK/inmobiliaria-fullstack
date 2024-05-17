from rest_framework import serializers
from .models import *
from apps.users.serializers import UserSerializer

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'

class FeatureSerializers(serializers.ModelSerializer):
   
    class Meta:
        model=Feature
        fields = '__all__'

class PropertyListSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    features = FeatureSerializers(many=True)
    
    author = UserSerializer()
    class Meta:
        model=Property
        fields = [
            'id',
            'uid',
            'status',
            'author',
            'type',
            'title',
            'price',
            'expenses',
            'currency_price',
            'currency_expenses',
            'images',
            'video',
            'features',
            'latitude',
            'longitude',
            'province',
            'city',
            'street',
           
            'services',
            'operation',
            'street_number',
            'cover_sup'
        ]
from rest_framework import fields
services = (
    ('electricity', 'Electricity'),
    ('gas', 'Gas'),
    ('water', 'Water'),
    ('sewer', 'Sewer'),
    ('care', 'Care'),
    ('maintenance', 'Maintenance'),
) 
class PropertySerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    features = FeatureSerializers(many=True, read_only=True)
    author = UserSerializer(many=False)
    services = fields.MultipleChoiceField(choices=services)
    class Meta:
        model = Property
        fields = [
            'id',
            'uid',
            'status',
            'author',
            'type',
            'operation',
            'title',
            'num_flat',
            'price',
            'expenses',
            'currency_price',
            'currency_expenses',
            'description',
            'images',
            'video',
            'features',
            'latitude',
            'longitude',
            'province',
            'city',
            'street',
            'promotion',
            'street_number',
            'state',
            'antiquity',
            'id_department',
            'terrain_sup',
            'total_sup',
            'cover_sup',
            
            'financing',
            'services',
            'views',
            'published',
        ]

    