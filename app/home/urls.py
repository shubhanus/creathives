from django.conf.urls import url

from app.home import views

urlpatterns = [
    url(r'^home/$', views.index),
    url(r'^home/proj_create_update/(?P<id>[0-9]+)/$', views.new_proj_create),
    url(r'^home/update_project_title/(?P<id>[0-9]+)/$', views.update_project_title),
    url(r'^home/profile_pic_change/$', views.profile_pic_change),
    url(r'^home/update_name_about/$', views.update_name_about),
    url(r'^home/delete_project/$', views.delete_project),
    # url(r'^home/get_project_media/$', views.get_project_media),

    # url(r'^home/proj_update/(?P<id>[0-9]+)/$', views.proj_update),
]
