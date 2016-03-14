from django.contrib import admin
from django.db import models

from app.accounts.models import Account


class Projects(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=60, default='Project Title here')
    description = models.TextField(max_length=300, default='Project description goes here')

    IMAGE = '1'
    MUSIC = '2'
    VIDEO = '3'
    ARTICLE = '4'
    PRO_TYPE_CHOICE = (
        (IMAGE, 'Image'),
        (MUSIC, 'Music'),
        (VIDEO, 'Video'),
        (ARTICLE, 'Article'),
    )

    type = models.CharField(max_length=2, choices=PRO_TYPE_CHOICE, null=True)
    main_url = models.TextField(max_length=200)
    url_tumb_img = models.TextField(max_length=200, default='Project Image')

    class Meta:
        db_table = "projects"


class ProfileDetails(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    about = models.CharField(max_length=60, default='Tell Us Something About You')
    display_picture = models.CharField(max_length=200, null=True)
    cover_picture = models.CharField(max_length=200, null=True)

    class Meta:
        db_table = "profile details"

admin.site.register(Projects)
admin.site.register(ProfileDetails)
