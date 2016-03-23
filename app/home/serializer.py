from rest_framework import serializers
from app.home.models import Projects


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Projects
        fields = ('title', 'type', 'description', 'url_thumb_img', 'date_created')
