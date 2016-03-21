from django.contrib import admin
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
import logging

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)


class AccountManager(BaseUserManager):

    def _create_user(self, email, first_name, last_name, password, is_staff, is_superuser, **extra_fields):
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model( email=email, first_name=first_name, last_name=last_name, is_staff=is_staff,
                           is_superuser=is_superuser, last_login=now,
                          date_joined=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def _create_super_user(self, email, password, is_staff, is_superuser, **extra_fields):
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model( email=email, is_staff=is_staff,
                           is_superuser=is_superuser, last_login=now,
                          date_joined=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, first_name=None, last_name=None, password=None, **extra_fields):
        if 'username' in extra_fields:
            extra_fields.pop('username')
        return self._create_user(email, first_name, last_name, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        user = self._create_super_user( email, password, True, True, **extra_fields)
        user.save(using=self._db)
        return user

    def update_user_details(self, email,  first_name, last_name):
        user = Account.objects.get(email=email)
        if user is not None:
            user.first_name = first_name
            user.last_name = last_name
            user.save
            return user
        return None


class Account(AbstractBaseUser):
    first_name = models.CharField(_('first name'), max_length=30, blank=True, null=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True, null=True)
    email = models.EmailField(_('email address'), unique=True, max_length=255)
    date_of_birth = models.DateField(null=True)
    contact_number = models.CharField(max_length=30, blank=True, null=True)
    location = models.CharField(max_length=30, null=True)

    MALE = '1'
    FEMALE = '2'
    OTHER = '3'
    GENDER_CHOICES = (
        (MALE, 'Male'),
        (FEMALE, 'Female'),
        (OTHER, 'Other'),
    )

    gender = models.CharField(max_length=2, choices=GENDER_CHOICES,null=True)

    is_staff = models.BooleanField(_('staff status'), default=False)
    is_superuser = models.BooleanField(_('super user'), default=False)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    objects = AccountManager()

    USERNAME_FIELD = 'email'

    class Meta:
        db_table = "accounts"

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser


admin.site.register(Account)