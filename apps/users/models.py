from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from ..estates.models import Property
def user_directory(instance, filename):
    return 'users/{0}/{1}'.format(instance.name, filename)

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user
    
    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email,password, **extra_fields)

        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
    
class User(AbstractBaseUser, PermissionsMixin):
    
    options = (
        ('default', 'Default'),
        ('publisher', 'Publisher')
    )

    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=False, null=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()
    profile_picture = models.ImageField(null=True, blank=True,max_length=600, upload_to=user_directory, default='users/UserCircle.svg')
    banner_picture = models.ImageField(null=True, blank=True,max_length=600, upload_to=user_directory, default='users/Banner.jpg')
    disclaimer = models.CharField( max_length=362,null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    description = models.TextField( max_length=350, null=True, blank=True)
    office = models.CharField(null=True, max_length=255, blank=True)
    type = models.CharField(choices=options, default='default', max_length=26)
    favorites = models.ManyToManyField(Property,  related_name='favorited_by', blank=True)
    USERNAME_FIELD = 'email'


        
    
    REQUIRED_FIELDS = ['name', 'id', 'password', 'is_active', 'is_staff', 'phone_number', 'description', 'type', 'profile_picture', 'banner_picture', 'disclaimer', 'office']
        
    def __str__(self):
        return self.email
