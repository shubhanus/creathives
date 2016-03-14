from django.contrib.auth import authenticate, login as auth_login
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from app.accounts.serializer import UserSerializer


def login(request):
    return render(request, 'accounts/login.html')


@api_view(['POST'])
@permission_classes((AllowAny,))
def login_user(request):
    print 'login_user call'
    if request.method == 'POST':
        print "Post method check passed"
        data = JSONParser().parse(request)
        print "JSON parsing passed"
        email = data.get('email', None)
        password = data.get('password', None)
        print email, password
        ac = authenticate(email=email, password=password)
        print ac
        if ac is not None:
            print "authentication success"
            auth_login(request, ac)
            print "User logged in"
            serial = UserSerializer(ac)
            return Response(serial.data, status=status.HTTP_200_OK)
        else:
            print "Unauthorised"
            return Response({
                'status': 'Unauthorised',
                'message': 'Wrong Username/passwords.'
            }, status=status.HTTP_401_UNAUTHORIZED)
    else:
        print "Non-POST Request"
        return Response("Wrong candidate")

