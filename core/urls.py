from django.contrib import admin
from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView
from django.shortcuts import render

def index_view(request):
    return render(request, 'dist/index.html')

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('estates/', include('apps.estates.urls')),
    path('users/', include('apps.users.urls')),
    path('messages/', include('apps.users_messages.urls')),
    path('admin/', admin.site.urls),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='dist/index.html'))]