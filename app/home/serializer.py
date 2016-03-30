from rest_framework import serializers
from app.home.models import Projects, Media


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Projects
        fields = ('id', 'title', 'type', 'description', 'url_thumb_img', 'date_created')


class MediaSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = Media
        fields = ('id', 'name', 'type', 'url', 'description', 'thumb_img', 'created')

    def get_type(self, obj):
        return obj.get_type_display()
