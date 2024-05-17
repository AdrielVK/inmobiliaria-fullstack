from .views import *
from django.urls import path


urlpatterns = [
    path('list', GetMessagesList.as_view()),
    path('send', SendMessage.as_view()),
    path('chat/<int:id_sender>', GetChat.as_view()),
    path('chat/saw/<int:id_sender>/<int:id_receiver>', PutSawMessages.as_view()),
    path('delete', DeleteMessages.as_view()),
]