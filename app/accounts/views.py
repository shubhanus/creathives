from django.contrib.auth import authenticate, login as auth_login
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from app.accounts.serializer import UserSerializer


@api_view(['POST'])
@permission_classes((AllowAny,))
def login(request):

    if request.method == 'POST':
        data = JSONParser().parse(request)
        user_name = data.get('user', None)
        password = data.get('password', None)
        print user_name, password
        ac = authenticate(username=user_name, password=password)
        print ac
        if ac is not None:
            auth_login(request, ac)
            serial = UserSerializer(ac)
            return Response(serial.data, status=status.HTTP_200_OK)
        else:
            return Response({
                'status': 'Unauthorised',
                'message': 'Wrong Username/passwords.'
            }, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response("Poroblem entering in if")
