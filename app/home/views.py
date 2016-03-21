import errno
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from app.accounts.models import Account
from app.home.models import Projects, ProfileDetails
from main.settings.development import PROJECT_ROOT


# @api_view(['GET','POST'])
@login_required
def index(request):
    """
    get and return user projects
    get and return user profile
    render index page
    :param request:
    :return:
    """
    print "index page opened"
    context = {}
    if request.user.is_authenticated():
        profile = ProfileDetails.objects.get(pk=request.user.id)
        projects = Projects.objects.filter(user_id=request.user.id).order_by('-date_created')
        context['request'] = request
        context['profile'] = profile
        context['projects'] = projects
        return render(request, 'home/index.html', context)


@api_view(['GET', 'POST'])
@csrf_exempt
def new_proj_create(request, id):
    """
    create new project on ajax request
    if exist then update
    return project id
    :param request:
    :param id:
    :return:
    """
    if request.method == 'POST':
        context = {}
        user_id = str(request.user.id)
        data = request.FILES['image']
        # print data
        print id
        # print request.
        file_static_dir = "/static/user-temp-data/"+user_id+'/'
        user = get_object_or_404(Account, pk=user_id)
        img_static_url = upload_save_get_url(data, file_static_dir)
        try:
            proj = Projects.objects.get(id=id)
            proj.url_thumb_img = img_static_url
            proj.save()
            context['id']=id
        except Projects.DoesNotExist:
            new_project = user.projects_set.create(date_created=timezone.now(), url_thumb_img=img_static_url)
            new_project_id = new_project.id
            context['id'] = new_project_id
        # print user
        # print new_project.url_thumb_img
        # print new_project.id
        context['image_url'] = img_static_url
        # print context
        return HttpResponse(json.dumps(context))


def upload_save_get_url(data, file_static_dir):
    """
    get image and user id
    create dir in /static/user-temp-folder/
    upload file to new folder
    :param data:
    :param file_static_dir:
    :return:
    """
    print "image upload process started"
    # file_static_dir = "/static/user-temp-data/"+user_id+'/'
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


def update_name_about(request):
    """
    update name
    update about
    update contact No
    :param request:
    :return:
    """
    context = {}
    if request.method == 'POST':
        # print 'update_name_about'
        data = JSONParser().parse(request)
        # print "parsing complete"
        # print data['about'], data['name']
        user = str(request.user.id)

        name = data.get('name', None)
        about = data.get('about', None)
        contact = data.get('contact', None)
        # print 'split'
        try:
            # print "try"
            update_about = ProfileDetails.objects.get(user_id=user)
            update_name = Account.objects.get(pk=user)
            # print "about name"
            if name is not None:
                name = name.split()
                update_name.first_name = name[0]
                update_name.last_name = name[1]
                update_name.save()
            if contact is not None:
                print 'in contact'
                update_name.contact_number = contact
                update_name.save()
                print 'contact saved'
            if about is not None:
                update_about.about = about
                update_about.save()
            print 'update'
        except Exception:
            print Exception
            pass
        context['status'] = 'success'
        return HttpResponse(json.dumps(context))
    else:
        context['status'] = 'failed'
        return HttpResponse(json.dumps(context))


def update_project_title(request, id):
    """
    create project from title;
    update of project title, type, desc(optional)

    :param request:
    :param id:
    :return:
    """
    context = {}
    if request.method == 'POST':
        # print 'update_project_title'
        data = JSONParser().parse(request)
        proj_id = id
        user_id = str(request.user.id)
        user = get_object_or_404(Account, pk=user_id)
        # print "parsing complete"
        title = data.get('title', None)
        type = data.get('type', None)
        desc = data.get('desc', None)
        try:
            # print "try"
            update_title = Projects.objects.get(id=proj_id)
            if title is not None:
                update_title.title = title
                update_title.save()
            if type is not None:
                update_title.type = type
                update_title.save()
            if desc is not None:
                update_title.description = desc
                update_title.save()
            # print 'update'
            context['id']=id
        except Projects.DoesNotExist:
            new_project = user.projects_set.create(date_created=timezone.now(), title=data['title'])
            context['id'] = new_project.id
        context['status'] = 'success'
        return HttpResponse(json.dumps(context))
    else:
        context['status'] = 'failed'
        return HttpResponse(json.dumps(context))


def profile_pic_change(request):
    if request.method == 'POST':
        context = {}
        user_id = str(request.user.id)
        data = request.FILES.get('image', None)
        cover = request.FILES.get('cover_image', None)
        if cover is not None:
           data = cover
        # print data
        # print request.
        file_static_dir = "/static/user-temp-data/"+user_id+'/profiles/'
        img_static_url = upload_save_get_url(data, file_static_dir)
        try:
            proj = ProfileDetails.objects.get(user_id=user_id)
            if cover is not None:
                proj.cover_picture = img_static_url
                proj.save()
            else:
                proj.display_picture = img_static_url
                proj.display_picture_top_small = img_static_url
                proj.save()
        except Exception:
            print Exception
            pass
        context['image_url'] = img_static_url
        # print context
        return HttpResponse(json.dumps(context))


def delete_project(request):
    context = {}
    if request.method == 'POST':
        print 'delete process start'
        data = JSONParser().parse(request)
        print 'parseing'
        user_id = str(request.user.id)
        print 'user',user_id
        user = get_object_or_404(Account, pk=user_id)
        # print "parsing complete"
        id = data.get('id', None)
        try:
            # print "try"
            if id is not None:
                delete = user.projects_set.get(id=id)
                delete.delete()
                context['status'] = 'success'
                context['id'] = id
            # print 'update'
        except Projects.DoesNotExist:
            context['status'] = 'Project not Exist'
        return HttpResponse(json.dumps(context))
    else:
        context['status'] = 'failed'
        return HttpResponse(json.dumps(context))


# def get_project_media(request):
