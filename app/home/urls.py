from django.conf.urls import url

from app.home import views

urlpatterns = [
    url(r'^home/', views.index),
]
