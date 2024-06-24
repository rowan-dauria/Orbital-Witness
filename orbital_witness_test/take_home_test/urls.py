from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("usage/", views.usage, name="usage"),
]