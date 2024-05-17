from rest_framework import generics
from .models import Message
from .serializers import MessageSerializer
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from ..users.models import User
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count
from ..users.serializers import UserSerializer

class GetMessagesList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = self.request.user
        
        # Obtener los mensajes agrupados por remitente (sender)
        grouped_messages = Message.objects.filter(receiver=user, saw=False).values('sender').annotate(message_count=Count('id'))
        # Inicializar una lista para almacenar los mensajes agrupados
        grouped_messages_list = []

        # Iterar sobre cada grupo de mensajes
        for group in grouped_messages:
            sender_id = group['sender']
            message_count = group['message_count']
            sender_user = User.objects.filter(id=sender_id)
            sender_user_serializer = UserSerializer(sender_user, many=True)
            # Obtener todos los mensajes del remitente actual
            messages = Message.objects.filter(receiver=user, sender=sender_id)

            # Serializar los mensajes del remitente actual
            serializer = MessageSerializer(messages, many=True)

            # Agregar los mensajes serializados al grupo actual
            grouped_messages_list.append({
                'sender_id': sender_user_serializer.data,
                'message_count': message_count,
                'messages': serializer.data  # Lista de mensajes serializados
            })

        # Devolver la lista de mensajes agrupados por remitente en formato JSON
        return Response(grouped_messages_list, status=status.HTTP_200_OK)


class SendMessage(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):

        sender = self.request.user
        try:
            id_user_receiver = int(self.request.data.get('id_user_receiver', ''))
        except ValueError:
            return Response({"error": "Invalid user ID"}, status=status.HTTP_400_BAD_REQUEST)
        
        receiver = User.objects.filter(id=id_user_receiver).first()
        

        if not receiver:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        content = self.request.data.get('content', '')
        message_new = Message.objects.create(sender=sender, content=content, receiver=receiver)
        
        serializer = MessageSerializer(message_new)

        if serializer:
            
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PutSawMessages(APIView):
    permission_classes = (permissions.AllowAny,)

    def put(self, request, id_sender,id_receiver, format=None):
        try:
            user = User.objects.get(id=id_receiver)
            sender = User.objects.get(id=id_sender)
            messages_rec = Message.objects.filter(saw=False, sender=sender, receiver=user)
            for message in messages_rec:
                message.saw = True
                message.save()
            return Response({'Exito': 'Mensajes marcados como visto'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

class DeleteMessages(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, format=None):
        # Obtener todos los mensajes con saw=True
        messages_to_delete = Message.objects.filter(saw=True)

        # Eliminar los mensajes encontrados
        messages_to_delete.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

class GetChat(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id_sender, format=None):
        user = self.request.user
        try:
            sender = User.objects.get(id=id_sender)
            messages_rec = Message.objects.filter(saw=False, sender=sender, receiver=user)
            messages_sen = Message.objects.filter(saw=False, sender=user, receiver=sender)
            if messages_sen or messages_rec:
                serializer_rec = MessageSerializer(messages_rec, many=True)
                serializer_sen = MessageSerializer(messages_sen, many=True)
                return Response({'received': serializer_rec.data, 'sent': serializer_sen.data})
            else:
                return Response({'No hay mensajes'}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)