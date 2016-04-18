import os

from django.contrib.auth import authenticate, login as auth_login
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from app.accounts.models import Account
from app.accounts.serializer import UserSerializer, SignupSerializer
from app.home.models import ProfileDetails
from main.settings.development import PROJECT_ROOT


def login(request):
    return render(request, 'accounts/login.html')


@api_view(['POST'])
@permission_classes((AllowAny,))
def login_user(request):
    print 'login_user call'
    if request.method == 'POST':
        data = JSONParser().parse(request)
        email = data.get('email', None)
        password = data.get('password', None)
        ac = authenticate(email=email, password=password)
        if ac is not None:
            auth_login(request, ac)
            serial = UserSerializer(ac)
            return Response(serial.data, status=status.HTTP_200_OK)
        else:
            return Response({
                'status': 'Unauthorised',
                'message': 'Wrong Username/password combination.'
            }, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes((AllowAny,))
def checkExist(request):
    email = request.data.get('email')
    try:
        Account.objects.get(email=email)
    except Account.DoesNotExist:
        return HttpResponse('true')
    return HttpResponse('false')


@api_view(['POST'])
@permission_classes((AllowAny,))
def register(request):
    if request.method == 'POST':
        data = request.data
        serializer = SignupSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            user = serializer.save()
            ProfileDetails.objects.create(user=user)
            user_dir = '{0}/static/user-temp-data/{1}'.format(PROJECT_ROOT, user.id)
            os.mkdir(user_dir)
            os.mkdir(user_dir + '/profiles')
            os.mkdir(user_dir + '/projects')
        return Response({'status': 'success'}, status=status.HTTP_201_CREATED)