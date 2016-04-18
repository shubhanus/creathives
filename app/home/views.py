import errno
import json
import shutil
import subprocess

import os
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from app.accounts.models import Account
from app.home.models import Projects, ProfileDetails, Media
from app.home.serializer import ProjectSerializer, MediaSerializer
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
    # print "index page opened"
    context = {}
    if request.user.is_authenticated():
        user_id = request.user.id
        profile = ProfileDetails.objects.get(user_id=user_id)
        projects = Projects.objects.filter(user_id=user_id).order_by('-date_created')
        print projects
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
        file_static_dir = '/static/user-temp-data/{0}/projects/project_{1}'\
                .format(user_id, id)
        user = get_object_or_404(Account, pk=user_id)
        try:
            proj = Projects.objects.get(id=id)
            context['id'] = id
        except Projects.DoesNotExist:
            proj = user.projects_set.create(date_created=timezone.now())
            context['id'] = proj.id
            file_static_dir = '/static/user-temp-data/{0}/projects/project_{1}'\
                .format(user_id, proj.id)
            os.mkdir(PROJECT_ROOT + file_static_dir)
            os.mkdir(PROJECT_ROOT + file_static_dir + '/media')
            os.mkdir(PROJECT_ROOT + file_static_dir + '/media/Articles')
            os.mkdir(PROJECT_ROOT + file_static_dir + '/media/Images')
            os.mkdir(PROJECT_ROOT + file_static_dir + '/media/Tracks')
            os.mkdir(PROJECT_ROOT + file_static_dir + '/media/Videos')
        name, ext = os.path.splitext(data.name)
        new_name = '{0}/user_{1}_project_{2}{3}'.format(file_static_dir, str(request.user.id), proj.id, ext)
        img_static_url = upload_save_get_url(data, new_name)
        proj.url_thumb_img = img_static_url
        proj.save()
        context['image_url'] = img_static_url
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
    # file_dir = PROJECT_ROOT+file_static_dir
    # full_file_name = file_dir + data.name
    # img_static_url = file_static_dir + data.name
    full_file_name = PROJECT_ROOT + file_static_dir
    # try:
    #     os.mkdir(file_dir)
    #     # print 'dir created'
    # except OSError as exc:
    #     if exc.errno != errno.EEXIST:
    #         raise exc
    #     pass
    with open(full_file_name, 'wb+') as destination:
        for chunk in data.chunks():
            destination.write(chunk)
        destination.close()
    # print 'file uploaded at', full_file_name
    return file_static_dir


def get_thumbnail(name, type, width=260, height=213):
    path, ext = os.path.splitext(name)
    thumb = path+'_thumb.png'
    if type == 3:
        subprocess.call('ffmpeg -i {0} -ss 00:00:14.435 -filter  scale=w={2}:h={3} -vframes 1 {1}'
                        .format(PROJECT_ROOT+name, PROJECT_ROOT+thumb, width, height), shell=True)
    elif type == 1:
        subprocess.call('ffmpeg -i {0} -filter scale=w={2}:h={3} {1} -y'
                        .format(PROJECT_ROOT+name, PROJECT_ROOT+thumb, width, height), shell=True)
    elif type == 2:
        subprocess.call('ffmpeg -i {0} -filter  scale=w={2}:h={3} {1} -y'
                        .format(PROJECT_ROOT+name, PROJECT_ROOT+thumb, width, height), shell=True)
    elif type == 4:
        subprocess.call('convert -resize {2}x{3}\! {0}[0] {1}'
                        .format(PROJECT_ROOT+name, PROJECT_ROOT+thumb, width, height), shell=True)
    return thumb


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
        data = JSONParser().parse(request)
        user = str(request.user.id)
        name = data.get('name', None)
        about = data.get('about', None)
        contact = data.get('contact', None)
        update_about = ProfileDetails.objects.get(user_id=user)
        update_name = Account.objects.get(pk=user)
        if name is not None:
            name = name.split()
            update_name.first_name = name[0]
            update_name.last_name = name[1]
            update_name.save()
        if contact is not None:
            update_name.contact_number = contact
            update_name.save()
        if about is not None:
            update_about.about = about
            update_about.save()
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
        data = JSONParser().parse(request)
        proj_id = id
        user_id = str(request.user.id)
        user = get_object_or_404(Account, pk=user_id)
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
            file_static_dir = '{0}/static/user-temp-data/{1}/projects/project_{2}'\
                .format(PROJECT_ROOT, user.id, new_project.id)
            os.mkdir(file_static_dir)
            os.mkdir(file_static_dir + '/media')
            os.mkdir(file_static_dir + '/media/Articles')
            os.mkdir(file_static_dir + '/media/Images')
            os.mkdir(file_static_dir + '/media/Tracks')
            os.mkdir(file_static_dir + '/media/Videos')
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
        type = 'DP'
        if cover is not None:
            data = cover
            type = 'Banner'
        file_static_dir = "/static/user-temp-data/"+user_id+'/profiles/'
        name, ext = os.path.splitext(data.name)
        new_name = '{0}user_{1}_{2}{3}'.format(file_static_dir, str(request.user.id), type,ext)
        img_static_url = upload_save_get_url(data, new_name)
        profile = ProfileDetails.objects.get(user_id=user_id)
        if cover is not None:
            profile.cover_picture = img_static_url
            profile.save()
        else:
            small_image = get_thumbnail(img_static_url, 1, 100, 100)
            print small_image
            profile.display_picture = img_static_url
            profile.display_picture_top_small = small_image
            profile.save()
            context['small_image'] = small_image
        context['image_url'] = img_static_url
        return HttpResponse(json.dumps(context))


def delete_project(request):
    context = {}
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user_id = str(request.user.id)
        user = get_object_or_404(Account, pk=user_id)
        id = data.get('id', None)
        try:
            # print "try"
            if id is not None:
                delete = user.projects_set.get(id=id)
                delete.delete()
                shutil.rmtree(PROJECT_ROOT + '/static/user-temp-data/1/projects/project_{0}'.format(id))
                context['status'] = 'success'
                context['id'] = id
            # print 'update'
        except Projects.DoesNotExist:
            context['status'] = 'Project not Exist'
        return HttpResponse(json.dumps(context))


@api_view(['GET', 'POST'])
def get_project_details(request, id):
    context = {}
    if request.method == 'GET':
        user_id = str(request.user.id)
        user = get_object_or_404(Account, pk=user_id)
        try:
            proj_details = user.projects_set.get(id=id)
            serial_details = ProjectSerializer(proj_details)
            return Response(serial_details.data, status=status.HTTP_200_OK)
        except Projects.DoesNotExist:
            context['status'] = 'Project not Exist'
            return HttpResponse(context)


@api_view(['GET', 'POST'])
def get_project_media(request, id, mediaType, st=0, end=5):
    if request.method == 'GET':
        user_id = str(request.user.id)
        user = get_object_or_404(Account, pk=user_id)
        proj_details = user.projects_set.get(id=id)
        if mediaType == '0':
            proj_media = Media.objects.filter(project_id=id).order_by('-created')[st:end]
            media_count = proj_details.media_set.count()
        else:
            proj_media = proj_details.media_set.filter(type=mediaType).order_by('-created')[st:end]
            media_count = proj_details.media_set.filter(type=mediaType).count()
        serial_media = MediaSerializer(proj_media, many=True)
        data = json.dumps({'count': media_count, 'data': serial_media.data})
        return Response(data, status=status.HTTP_200_OK)


@api_view(['PUT', 'POST'])
def media_upload(request, id):
    if request.method == 'POST':
        user_id = str(request.user.id)
        user = get_object_or_404(Account, pk=user_id)
        project = user.projects_set.get(id=id)
        new_media = project.media_set.create(created=timezone.now())
        data = request.FILES.get('files')
        media_type = request.POST.get('type')
        # file_static_dir = "/static/user-temp-data/"+user_id+'/media/'+media_type+'/'
        file_static_dir = "/static/user-temp-data/{0}/projects/project_{1}/media/{2}/"\
            .format(user_id, project.id, media_type)
        name, ext = os.path.splitext(data.name)
        new_name = '{0}user_{1}_{2}_media_{3}{4}'.format(file_static_dir,
                                                         str(request.user.id),
                                                         media_type,
                                                         new_media.id,
                                                         ext)
        img_static_url = upload_save_get_url(data, new_name)
        if media_type == 'Images':
            media_type = 1
        elif media_type == 'Tracks':
            media_type = 2
        elif media_type == 'Videos':
            media_type = 3
        elif media_type == 'Articles':
            media_type = 4
        thumb_img = get_thumbnail(img_static_url, media_type)
        new_media.url=img_static_url
        new_media.thumb_img=thumb_img
        new_media.type=media_type
        new_media.save()
        db_media = Media.objects.get(pk=new_media.id)
        serial_media = MediaSerializer(db_media)
        return Response(serial_media.data, status=status.HTTP_200_OK)
    if request.method == 'PUT':
        # print 'put req'
        data = JSONParser().parse(request)
        title = data.get('title', None)
        description = data.get('description', None)
        try:
            media = Media.objects.get(pk=id)
            if title is not None:
                media.name = title
            if description is not None:
                media.description = description
            media.save()
            serial_media = MediaSerializer(media)
            return Response({'id': id, 'title': title, 'description': description})
        except Media.DoesNotExist:
            pass
            return Response({'error': 'media not available'})


@api_view(['POST'])
def youtube_media_upload(request, id):
    data = request.data
    user_id = str(request.user.id)
    user = get_object_or_404(Account, pk=str(request.user.id))
    project = user.projects_set.get(id=id)
    new_media = project.media_set.create(created=timezone.now())
    thumb = '/static/user-temp-data/{0}/media/Videos/user_{1}_Videos_media_{2}_thumb.png'.format(user_id, user_id, new_media.id)
    subprocess.call('ffmpeg -i {0} -filter scale=w={2}:h={3} {1} -y'
                        .format(data['thumbnail'], PROJECT_ROOT+thumb, 260, 213), shell=True)
    new_media.name = data['title']
    new_media.type = '3'
    new_media.description = data['description']
    new_media.url = '//www.youtube.com/embed/' + data['media_url']
    new_media.thumb_img = thumb
    new_media.save()
    # db_media = Media.objects.get(pk=54)
    db_media = Media.objects.get(pk=new_media.id)
    serial_media = MediaSerializer(db_media)
    return Response(serial_media.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def delete_media(request):
    context = {}
    enc_list = [s.encode('ascii') for s in request.data.getlist('id[]')]
    id = map(int, enc_list)
    project_id = request.data.get("project_id")
    user_id=str(request.user.id)
    user = get_object_or_404(Account, pk=user_id)
    project = user.projects_set.get(pk=project_id)
    for d in id:
        try:
            media = project.media_set.get(id=d)
            deleteFiles(PROJECT_ROOT+media.url)
            deleteFiles(PROJECT_ROOT+media.thumb_img)
            media.delete()
            context['status'] = 'Success'
        except Media.DoesNotExist:
            context['status'] = 'Project not Exist'
    #     try:
    #     project.media_set.filter(id__in=id).delete()
    #     # for d in id:
    #     #     deleteFiles(PROJECT_ROOT+'/static/user-temp-data/{0}/media/Tracks/user_{0}_Tracks_media_{1}_thumb.png'
    #     #             .format(user_id, d))
    #     #     deleteFiles(PROJECT_ROOT+'/static/user-temp-data/{0}/media/Tracks/user_{0}_Tracks_media_{1}_thumb.png'
    #     #             .format(user_id, d))
    #     context['status'] = 'Success'
    # except Media.DoesNotExist:
    return HttpResponse(json.dumps(context))


def deleteFiles(path):
    try:
        os.remove(path)
    except OSError as exc:
        if exc.errno != errno.EEXIST:
            raise exc
    return path

