from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework import status, permissions
from .models import *
from .pagination import SetPagination
from .serializers import *
from rest_framework.response import Response
from django.db.models import Count
from django.db.models import Q
from rest_framework.permissions import AllowAny
from django.db import transaction
import json
from rest_framework.exceptions import ValidationError
from ..users.models import User
from rest_framework.parsers import MultiPartParser, FormParser
from .permissions import IsPostAuthorOrReadOnly

class PropertyDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, uid, format=None):
        if Property.objects.filter(uid=uid).exists():
            property = Property.objects.get(uid=uid)
            serializer = PropertySerializer(property)
            
            address = request.META.get('HTTP_X_FORWARDED_FOR')
            if address:
                ip = address.split(',')[-1].strip()
            else:
                ip = request.META.get('REMOTE_ADDR')
            
            if not ViewCount.objects.filter(property=property, ip_address=ip):
                view = ViewCount(property=property,ip_address=ip)
                view.save()
                property.views += 1
                property.save()

            return Response({'property': serializer.data})
        else:
            return Response({"error": "Property no existe"}, status=status.HTTP_404_NOT_FOUND)

class FilterByOperationListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, operation, format=None):
        
        
        properties = Property.propertyobjects.filter(operation=operation)

        if properties:
        
            paginator = SetPagination()
            results = paginator.paginate_queryset(properties, request)
            serializer = PropertyListSerializer(results, many=True)
            return paginator.get_paginated_response(serializer.data)
        else:
            return Response({'error': 'No se encontraron inmuebles'}, status=status.HTTP_404_NOT_FOUND)
        
class PropertiesFilterView(ListAPIView):
    permissions_classes = (permissions.AllowAny,)
    serializer_class = PropertySerializer
    #filter_backends = [DjangoFilterBackend]
    #filterset_class = PropertyFilter
    
    def get_queryset(self):
        queryset = Property.objects.all()
        city_param = self.request.query_params.get('city')
        types_param = self.request.query_params.get('types')
        operation_param = self.request.query_params.get('operation')
        price_gte_param = self.request.query_params.get('price__gte')
        price_lte_param = self.request.query_params.get('price__lte')
        province_param = self.request.query_params.get('province')
        street_param = self.request.query_params.get('street')
        services_param = self.request.query_params.get('services')
        currency_param = self.request.query_params.get('currency_price')
        
        if street_param:
            queryset = queryset.filter(street__iexact=street_param)

        if province_param:
            queryset = queryset.filter(province__iexact=province_param)
        
        if services_param:
            services_list = services_param.split(',')
            for service in services_list:
                queryset = queryset.filter(Q(services__icontains=service))
            

        if currency_param:
            currency_param = currency_param.split(',')
            queryset = queryset.filter(currency_price__in=currency_param)

        if price_gte_param and price_lte_param:
           
           queryset = queryset.filter(price__range=(price_lte_param, price_gte_param))
        elif price_gte_param or price_lte_param:
            if price_gte_param:
                queryset = queryset.filter(price__range=(0, price_gte_param))
            else:
                queryset = queryset.filter(price__range=(price_lte_param, 999999999))
        else:
            queryset = queryset.filter(price__range=(0, 999999999))
        if types_param:

            types_list = types_param.split(',')
            queryset = queryset.filter(type__in=types_list)
        if operation_param:
    
            operation_list = operation_param.split(',')
            queryset = queryset.filter(operation__in=operation_list)

        if city_param:
            queryset = queryset.filter(city__iexact=city_param)
            
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        paginator = SetPagination()
        results = paginator.paginate_queryset(queryset, request)
        serializer = PropertyListSerializer(results, many=True)
        return paginator.get_paginated_response(serializer.data)

class CreatePropertyView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    @transaction.atomic
    def post(self, request, format=None,*args, **kwargs):
        data = self.request.data
        author = User.objects.get(id = self.request.user.id)
        
        
        financing_str = data.get('financing', '').lower()   
        if  financing_str == 'true':
                financing = True
        else:
            financing = False

        
        services_str = data['services']  
        ser = services_str.split(',')

        post = Property.objects.create(
            author = author,
            title = data['title'],
            type = data['type'],
            state = data['state'],
            description = data['description'],
            services = ser,
            province = data['province'],
            city = data['city'],
            street = data['street'],
            street_number = data['street_number'],
            latitude = data['latitude'],
            longitude = data['longitude'],
            operation = data['operation'],
            financing = financing,
            price = data['price'],
            status = 'published',  
            
            
        )

        

        optional_fields = [
            'price',
            'currency_price',
            'terrain_sup',
            'num_flat',
            'id_department',
            'total_sup',
            'cover_sup',
            'antiquity',
            'expenses',
            'video',
            'currency_expenses'
        ]

        for field in optional_fields:
            if field in data:
                setattr(post, field, data[field])

        post.save()

        if 'imagenes' in data:
            images_files = request.FILES.getlist('imagenes')
            images = [Image.objects.create(image=imagen) for imagen in images_files]
            post.images.set(images)

        if 'features' in data:
            features_data = json.loads(data['features'])
            features = [Feature.objects.create(name=ft_object['name'], value=ft_object['value']) for ft_object in features_data]
            post.features.set(features)
            serializer = PropertySerializer(post)
        
        
            
            #post.images.set(images)
            #post.features.set(features)
        if serializer: 
            return Response({'property': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            
            raise ValidationError(serializer.errors)
        
class EditStatusView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )

    def put(self, request, uid, format=None):
        post = Property.objects.get(uid=uid)
        status = self.request.data
        if status == 'draft':
            
            post.status = 'published'
            post.save()
            serializer = PropertySerializer(post)
            return Response({'property':serializer.data})   
        elif status == 'published':
            post.status = 'draft'
            post.save()
            serializer = PropertySerializer(post)
            return Response({'property':serializer.data})   
        else:
            return Response({"error": "No se pudo realizar el cambio"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EditTitleView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )
    #parser_classes = [MultiPartParser, FormParser]

    def put(self, request, uid, format=None):
        post = Property.objects.get(uid=uid)
        print(self.request.data)
        title = self.request.data
        if title:
            if post.title != title:
                post.title = title
                post.save()
                serializer = PropertySerializer(post)
                return Response({'property': serializer.data})
            else:
                return Response({"error": "La publicacion ya tiene el title seleccionado"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "No se pudo realizar el cambio"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EditTypeView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )

    def put(self, request, uid, format=None):
        post = Property.objects.get(uid=uid)
        type = self.request.data
        if type:
            if post.type != type:
                post.type = type
                post.save()
                serializer = PropertySerializer(post)
                return Response({'property':serializer.data})
            else:
                return Response({"error": "La publicacion ya tiene el type seleccionado"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "No se pudo realizar el cambio"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EditOperationView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )


    def put(self, request, uid, format=None):
        post = Property.objects.get(uid=uid)
        operation = self.request.data
        if operation:
            if post.operation != operation:
                post.operation = operation
                post.save()
                serializer = PropertySerializer(post)
                return Response({'property':serializer.data})
            else:
                return Response({"error": "La publicacion ya tiene el status seleccionado"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "No se pudo realizar el cambio"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EditPriceView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )


    def put(self, request, uid, format=None):
        post = Property.objects.get(uid=uid)
        price = self.request.data
        if price:
            if post.price != price:
                post.price = price
                post.save()
                serializer = PropertySerializer(post)
                return Response({'property':serializer.data})
            else:
                return Response({"error": "La publicacion ya tiene el status seleccionado"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "No se pudo realizar el cambio"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class EditIdDepartmentView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )


    def put(self, request, uid, format=None):
        post = Property.objects.get(uid=uid)
        id_department = self.request.data
        if id_department:
            if post.id_department != id_department:
                post.id_department = id_department
                post.save()
                serializer = PropertySerializer(post)
                return Response({'property':serializer.data})
            else:
                return Response({"error": "La publicacion ya tiene el status seleccionado"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "No se pudo realizar el cambio"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EditNumFlatView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )


    def put(self, request, uid, format=None):
        post = Property.objects.get(uid=uid)
        num_flat = self.request.data
        if num_flat:
            if post.num_flat != num_flat:
                post.num_flat = num_flat
                post.save()
                serializer = PropertySerializer(post)
                return Response({'property':serializer.data})
            else:
                return Response({"error": "La publicacion ya tiene el status seleccionado"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "No se pudo realizar el cambio"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ObtainTypesView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        types = Property.objects.values('type').annotate(count=Count('type')).values('type')
        return Response({'types': list(types)}, status=status.HTTP_200_OK)