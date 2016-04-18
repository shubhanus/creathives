from rest_framework import serializers

from app.accounts.jwt_helper import get_json_web_token
from app.accounts.models import Account


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField('get_json_web_token')

    class Meta:
        model = Account
        fields = ('token',)

    def get_json_web_token(self, obj):
        return get_json_web_token(obj)

class SignupSerializer(serializers.ModelSerializer):
    """
        Account Signup serializer to handle user registration.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Account
        fields = ('email', 'password', 'contact_number')
        write_only_fields = ('password',)

    def validate(self, data):
        """
        Checks all the field values are entered
        and to be sure that the received password and confirm_password
        fields are exactly the same
        """

        for k, v in data.items():
            if v == '':
                raise serializers.ValidationError("{0} field cannot be empty".format(k))
        return data

    def create(self, validated_data):
        """
        Creates the user if validation succeeds
        """
        password = validated_data.pop('password', None)
        user = self.Meta.model(**validated_data)
        user.set_password(password)
        user.is_active = True
        user.save()
        return user