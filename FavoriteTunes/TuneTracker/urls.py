from django.urls import path
from .views import list, create_card


urlpatterns = [
    path('artist/', list),
    path('artist/new/', create_card)
]