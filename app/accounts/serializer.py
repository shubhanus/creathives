from gunicorn.config import User
from rest_framework import serializers

from app.accounts.jwt_helper import get_json_web_token


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField('get_json_web_token')

    class Meta:
        model = User
        fields = ('token',)

    def get_json_web_token(self, obj):

        return get_json_web_token(obj)

