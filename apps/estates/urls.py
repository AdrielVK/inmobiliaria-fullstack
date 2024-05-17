from .views import *
from django.urls import path


urlpatterns = [
    path('operation/<str:operation>', FilterByOperationListView.as_view()),
    path('filter/', PropertiesFilterView.as_view()),
    path('detail/<uid>', PropertyDetailView.as_view()),
    path('types_list', ObtainTypesView.as_view()),
    path('create', CreatePropertyView.as_view()),
    path('edit/title/<uid>', EditTitleView.as_view()),
    path('edit/status/<uid>', EditStatusView.as_view()),
    path('edit/type/<uid>', EditTypeView.as_view()),
    path('edit/operation/<uid>', EditOperationView.as_view()),
    path('edit/id_department/<uid>', EditIdDepartmentView.as_view()),
    path('edit/num_flat/<uid>', EditNumFlatView.as_view()),
    path('edit/price/<uid>', EditPriceView.as_view()),

]