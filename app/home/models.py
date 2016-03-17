from django.contrib import admin
from django.db import models

from app.accounts.models import Account


class Projects(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=60, default='No Project Title assigned')

    def __str__(self):
        return self.title

    description = models.TextField(max_length=300, default='No description', null=True)

    # IMAGE = '1'
    # MUSIC = '2'
    # VIDEO = '3'
    # ARTICLE = '4'
    # PRO_TYPE_CHOICE = (
    #     (IMAGE, 'Image'),
    #     (MUSIC, 'Music'),
    #     (VIDEO, 'Video'),
    #     (ARTICLE, 'Article'),
    # )

    type = models.CharField(max_length=20, null=True)
    # main_url = models.TextField(max_length=200)
    date_created = models.DateTimeField('Project Date Update')
    url_thumb_img = models.TextField(max_length=200, default='Project Image')

    class Meta:
        db_table = "projects"



class ProfileDetails(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    about = models.CharField(max_length=60, default='Tell Us Something About You')
    display_picture = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.display_picture

    cover_picture = models.CharField(max_length=200, null=True)

    class Meta:
        db_table = "profile details"

admin.site.register(Projects)
admin.site.register(ProfileDetails)
