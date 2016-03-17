from django.conf.urls import url

from app.home import views

urlpatterns = [
    url(r'^home/$', views.index),
    url(r'^home/proj_create_update/$', views.new_proj_create_update),
    # url(r'^home/proj_create_update/(?P<id>[0-9])/$', views.new_proj_create_update),
]
