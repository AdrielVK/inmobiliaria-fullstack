# En tu archivo serializers.py
from rest_framework import serializers
from .models import Message
from apps.users.serializers import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(many=False)
    receiver = UserSerializer(many=False)
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp', 'saw']
