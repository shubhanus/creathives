from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [

    url(r'^admin/', admin.site.urls),
    url('', include('app.accounts.urls')),
    url(r'^$', include('app.home.urls')),


    url('', include('django.contrib.auth.urls', namespace='auth')),

    # url(r'^api/', include('app.accounts.urls')),
]
