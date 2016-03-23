from rest_framework import serializers
from app.home.models import Projects, Media


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Projects
        fields = ('title', 'type', 'description', 'url_thumb_img', 'date_created')


class MediaSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField('get_media_type_serializer')

    class Meta:
        model = Media
        fields = ('name', 'type', 'url', 'description', 'thumb_img', 'created')

    def get_media_type_serializer(self, Media):
        return Media.get_media_type()
