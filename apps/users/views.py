from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from ..estates.pagination import SetPagination
from ..estates.serializers import PropertyListSerializer
from ..estates.models import Property
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

class ChangeNameView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        
        data = self.request.data
        name = data['new_name']
        
        if name is None:
            return Response({'error': 'El campo "name" es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.get(id=self.request.user.id)
        
        user.name = name
        user.save()
        serializer = UserSerializer(user)
        return Response({'user': serializer.data})
    
class GetFavoritesView(ListAPIView):
    permission_classes = [IsAuthenticated]
    

    def get(self,request,format=None):
        user = self.request.user
        favorites_posts = user.favorites.all()
        paginator = SetPagination()
        results = paginator.paginate_queryset(favorites_posts, request)
        serializer = PropertyListSerializer(results, many=True)
        return paginator.get_paginated_response(serializer.data)
    

class AddPropertyFavView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id, format=None):
        try:
            post = Property.objects.get(id=id)
        except Property.DoesNotExist:
            return Response({"error": "El post no existe"}, status=status.HTTP_404_NOT_FOUND)
        
        user = User.objects.get(id=self.request.user.id)
        if user.favorites.filter(id=id).exists():
            return Response({"message": "El post ya está en tus favoritos"}, status=status.HTTP_400_BAD_REQUEST)
        
        user.favorites.add(post)

        return Response({"message": "Post añadido a favoritos correctamente"}, status=status.HTTP_200_OK)

class RemovePropertyFavView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id, format=None):
        try:
            post = Property.objects.get(id=id)
        except Property.DoesNotExist:
            return Response({"error": "El post no existe"}, status=status.HTTP_404_NOT_FOUND)
        
        user = User.objects.get(id=self.request.user.id)
        if user.favorites.filter(id=id).exists():
            user.favorites.remove(post)
            return Response({"message": "Post eliminado de favoritos correctamente"}, status=status.HTTP_200_OK)

        return Response({"message": "El post no está en tus favoritos"}, status=status.HTTP_400_BAD_REQUEST)


class EditPictureProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        data = self.request.data
        picture = data['new_profile_picture']
        
        if(picture):
            user = User.objects.get(id=self.request.user.id)
            user.profile_picture = picture
            user.save()
            serializer = UserSerializer(user)
            return Response({'user': serializer.data})
        else:
            return Response({'error': 'Error al cambiar foto'})

class EditPictureBanner(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        data = self.request.data
        picture = data['new_banner_picture']
        if(picture):
            user = User.objects.get(id=self.request.user.id)
            user.banner_picture = picture
            user.save()
            serializer = UserSerializer(user)
            return Response({'user': serializer.data})
        else:
            return Response({'error': 'Error al cambiar foto'})

class EditPhoneNumber(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        data = self.request.data
        phone = data['new_phone_number']

        if(phone != 'undefined' and phone != ''):
            user = User.objects.get(id=self.request.user.id)
            user.phone_number = phone
            user.save()
            serializer = UserSerializer(user)
            return Response({'user': serializer.data})
        else:
            return Response({'error': 'Error al cambiar numero de tel'})
        
class EditDescription(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        data = self.request.data
        description = data['new_description']

        if(description != 'undefined' and description != ''):
            user = User.objects.get(id=self.request.user.id)
            user.description = description
            user.save()
            serializer = UserSerializer(user)
            return Response({'user': serializer.data})
        else:
            return Response({'error': 'Error al cambiar numero la descripcion'})

class EditDisclaimer(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        data = self.request.data
        disclaimer = data['new_disclaimer']

        if(disclaimer != 'undefined' and disclaimer != ''):
            user = User.objects.get(id=self.request.user.id)
            user.disclaimer = disclaimer
            user.save()
            serializer = UserSerializer(user)
            return Response({'user': serializer.data})
        else:
            return Response({'error': 'Error al cambiar numero el disclaimer'})

class EditOffice(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, format=None):
        data = self.request.data
        office = data['new_office']

        if(office != 'undefined' and office != ''):
            user = User.objects.get(id=self.request.user.id)
            user.office = office
            user.save()
            serializer = UserSerializer(user)
            return Response({'user': serializer.data})
        else:
            return Response({'error': 'Error al cambiar numero el disclaimer'})
