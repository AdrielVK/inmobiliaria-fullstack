from django.db import models
from django.db.models.query import QuerySet
from django.conf import settings
from ckeditor.fields import RichTextField
from multiselectfield import MultiSelectField
import uuid
#from apps.users.models import User
from django.utils import timezone
from django.db.models.signals import pre_delete
from django.dispatch import receiver

User = settings.AUTH_USER_MODEL

def estates_directory_video(instance, filename):
       
    return 'estates/video/{0}/{1}'.format(instance.title, filename)

def estates_directory(instance, filename):
   
    return 'estates/images/{0}/{1}'.format(instance.title, filename)

class Image(models.Model):
    title='image'
    image = models.ImageField(upload_to=estates_directory, max_length=600,)
  
class Feature(models.Model):
    features = (
        ('bedrooms', 'Bedrooms'),
        ('toilets', 'Toilets'),
        ('bathroom', 'Bathroom'),
        ('environments', 'Environments'),
        ('flats', 'Flats'),
        ('garage', 'Garage'),
        
    )

    name = models.CharField(choices=features, max_length=20)
    value = models.IntegerField(null=False, default=1)

    def __str__(self):
        return self.name

class Property(models.Model):

    class PropertyObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    operations = (
        ('rent', 'Rent'),
        ('sale', 'Sale'),
        ('auction', 'Auction'),
        ('others', 'Others')
    ) 

    states = (
        ('available', 'Available'),
        ('reserved', 'Reserved')
    ) 

    services = (
        ('electricity', 'Electricity'),
        ('gas', 'Gas'),
        ('water', 'Water'),
        ('sewer', 'Sewer'),
        ('care', 'Care'),
        ('maintenance', 'Maintenance'),
    ) 

    currencies = (
        ('ARS', 'ARS'),
        ('USD', 'USD'),
        ('OTHER', 'OTHER')
    )     

    types = (
        ('casa', 'Casa'),
        ('casa_duplex', 'Casa_duplex'),
        ('casa_triplex', 'Casa_triplex'),
        ('departamento', 'Departamento'),
        ('monoambiente', 'Monoambiente'),
        ('departamento piso', 'Departamento piso'),
        ('departamento penthouse', 'Departamento penthouse'),
        ('departamento semipiso', 'Departamento semipiso'),
        ('departamento duplex', 'Departamento duplex'),
        ('departamento triplex', 'Departamento triplex'),
        ('ph', 'Ph'),
        ('oficina', 'Oficina'),
        ('consultorio', 'Consultorio'),
        ('quinta', 'Quinta'),
        ('chacra', 'Chara'),
        ('galpon', 'Galpon'),
        ('deposito', 'Deposito'),
        ('campo', 'Campo'),
        ('hotel', 'Hotel'),
        ('fondo de comercio', 'Fondo de comercio'),
        ('edificio', 'Edificio'),
        ('cochera', 'Cochera'),
        ('otros', 'Otros')
    )
    uid = models.SlugField(unique=True, max_length=126, default=(uuid.uuid4), null=True, blank=True)
    objects = models.Manager()
    propertyobjects = PropertyObjects()
    status = models.CharField(max_length=10, choices=options, default='draft')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(choices=types, default='otros', max_length=85,null=False, blank=False)
    operation = models.CharField(choices=operations,max_length=85, default='others',null=False, blank=False)
    title = models.CharField(max_length=256,null=False, blank=False)
    num_flat = models.IntegerField(null=True, blank=True)
    price = models.IntegerField(null=False, blank=False)
    expenses = models.IntegerField(blank=True, null=True)
    currency_price = models.CharField(choices=currencies,max_length=10, default='ARS')
    currency_expenses = models.CharField(choices=currencies,max_length=10, default=None, null=True, blank=True)
    description = RichTextField(null=False, blank=False)
    images = models.ManyToManyField(Image, related_name='property_images', blank=True, null=True)
    video = models.FileField(upload_to=estates_directory_video, blank=True, null=True)
    features = models.ManyToManyField(Feature, null=True, blank=True, related_name='features')
    latitude = models.DecimalField(max_digits=11, decimal_places=8, null=False, blank=False)
    longitude = models.DecimalField(max_digits=11, decimal_places=8, null=False, blank=False)
    province = models.CharField(max_length=256, null=False, blank=False)
    city = models.CharField(max_length=256, null=False, blank=False)
    street = models.CharField(max_length=256, null=False, blank=False)
    promotion = models.BooleanField(default=False)
    street_number = models.IntegerField(null=False)
    state = models.CharField(choices=states, max_length=35, default='available')
    antiquity = models.IntegerField(default=0, null=True, blank=True)
    id_department = models.CharField(max_length=5, null=True, blank=True)
    terrain_sup = models.IntegerField(null=True, blank=True)
    total_sup = models.IntegerField(null=True, blank=True)
    cover_sup = models.IntegerField(null=True, blank=True)
    financing = models.BooleanField(default=False)
    services = MultiSelectField(choices=services,max_length=85, blank=True, null=True)
    views = models.IntegerField(default=0, blank=True, null=True)
    published = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title  
    
    def get_view_count(self):
        views = ViewCount.objects.filter(property=self).count()
        return views
    
    def get_video(self):
        if self.video:
            return self.video.url
        return ''
    
    def get_status(self):
        status = self.status
        return status
    
class ViewCount(models.Model):

    property = models.ForeignKey(Property, related_name='property_view_count', on_delete=models.CASCADE)
    ip_address = models.CharField(max_length=256)

    def __str__(self):
        return f"{self.ip_address}"
    
@receiver(pre_delete, sender=Property)
def delete_related_images(sender, instance, **kwargs):
    instance.images.clear()

@receiver(pre_delete, sender=Property)
def delete_related_features(sender, instance, **kwargs):
    instance.features.clear()

