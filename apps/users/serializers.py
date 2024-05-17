from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            'id',
            'email',
            'name',
            'password',
            'is_active',
            'is_staff',
            'type',
            'profile_picture',
            'banner_picture',
            'disclaimer',
            'phone_number',
            'description',
            'office',
            'favorites'
        ]

