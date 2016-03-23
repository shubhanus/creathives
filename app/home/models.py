from django.contrib import admin
from django.db import models
from django.utils import timezone

from app.accounts.models import Account


class Projects(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=60, default='No Project Title assigned')

    description = models.TextField(max_length=300, default='No description', null=True)
    type = models.CharField(max_length=20, null=True)
    date_created = models.DateTimeField(default=timezone.now, blank=True)
    url_thumb_img = models.TextField(max_length=200, default='/static/user-temp-data/default.png')

    def __unicode__(self):
        return self.title

    class Meta:
        db_table = "projects"


class ProfileDetails(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    about = models.CharField(max_length=60, default='Tell Us Something About You')
    display_picture = models.CharField(max_length=200, null=True, default='/static/images/user.png')
    display_picture_top_small = models.CharField(max_length=200, null=True, default='/static/images/user-small.png')

    def __unicode__(self):
        return self.display_picture
    cover_picture = models.CharField(max_length=200, null=True, default='/static/images/banner1.png')

    class Meta:
        db_table = "profile_details"


class Media(models.Model):
    project = models.ForeignKey(Projects, on_delete=models.CASCADE)
    name = models.CharField(max_length=40, default='untitled')

    def __unicode__(self):
        return self.url
    IMAGE = '1'
    MUSIC = '2'
    VIDEO = '3'
    ARTICLE = '4'
    MEDIA_TYPE_CHOICE = (
        (IMAGE, 'Image'),
        (MUSIC, 'Music'),
        (VIDEO, 'Video'),
        (ARTICLE, 'Article'),
    )
    type = models.CharField(max_length=2, choices=MEDIA_TYPE_CHOICE, null=True)
    description = models.CharField(max_length=160, default='No description')
    url = models.CharField(max_length=60, null=True)
    thumb_img = models.CharField(max_length=60, default='/static/images/thumb.png')
    created = models.DateTimeField(default=timezone.now, blank=True)

    class Meta:
        db_table = 'Media'

    def get_media_type(self, obj):
        return obj.get_media_type_choice_display()

admin.site.register(Projects)
admin.site.register(ProfileDetails)
admin.site.register(Media)
