import errno
import json

import os

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from app.accounts.models import Account
from app.home.models import Projects, ProfileDetails
from main.settings.development import PROJECT_ROOT


# @api_view(['GET','POST'])
@login_required
def index(request):
    print "index page opened"
    # print request.user.first_name
    context = {}
    if request.user.is_authenticated():
        profile = ProfileDetails.objects.get(pk=request.user.id)
        projects = Projects.objects.filter(user_id=request.user.id).order_by('-date_created')
        context['request'] = request
        context['profile'] = profile
        context['projects'] = projects
        return render(request, 'home/index.html', context)

@api_view(['GET','POST'])
@csrf_exempt
def new_proj_create_update(request):
    print '1'
    if request.method == 'POST':
        context = {}
        user_id = str(request.user.id)
        data = request.FILES['image']
        # data = request.FILES.get('image')
        # print data
        # print id
        # print request.
        user = get_object_or_404(Account, pk=user_id)
        img_static_url = upload_save_get_url(data, user_id)
        new_project = user.projects_set.create(date_created=timezone.now(), url_thumb_img=img_static_url)
        # print user
        new_project.save()
        new_project_id = new_project.id
        # print new_project.url_thumb_img
        # print new_project.id
        context['image_url'] = img_static_url
        context['id'] = new_project_id
        # print context
        return HttpResponse(json.dumps(context))


def upload_save_get_url(data, user_id):
    print "image upload process started"
    file_static_dir = "/static/user-temp-data/"+user_id+'/'
    file_dir = PROJECT_ROOT+file_static_dir
    full_file_name = file_dir+data.name
    img_static_url = file_static_dir+data.name
    try:
        os.mkdir(file_dir)
        print 'dir created'
    except OSError as exc:
        if exc.errno != errno.EEXIST:
            raise exc
        pass
    with open(full_file_name, 'wb+') as destination:
        for chunk in data.chunks():
            destination.write(chunk)
        destination.close()
    print 'file uploaded at', full_file_name
    return img_static_url

