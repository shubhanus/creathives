from django.conf.urls import patterns, url

from app.accounts import views

urlpatterns = (
    # 'app.accounts.views',
    url(r'^accounts/login/$', views.login),

)
