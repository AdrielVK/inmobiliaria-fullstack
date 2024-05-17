from .views import *
from django.urls import path


urlpatterns = [
    path('change/name/', ChangeNameView.as_view()),
    path('edit/pic_profile', EditPictureProfile.as_view()),
    path('edit/pic_banner', EditPictureBanner.as_view()),
    path('edit/phone', EditPhoneNumber.as_view()),
    path('edit/description', EditDescription.as_view()),
    path('edit/disclaimer', EditDisclaimer.as_view()),
    path('edit/office', EditOffice.as_view()),
    path('favorites', GetFavoritesView.as_view()),
    path('favorites/add/<int:id>', AddPropertyFavView.as_view()),
    path('favorites/remove/<int:id>', RemovePropertyFavView.as_view()),
]