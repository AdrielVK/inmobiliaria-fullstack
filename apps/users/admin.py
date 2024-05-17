from django.contrib import admin

from django.contrib import admin
from . import models

@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'is_staff')
    search_fields = ('name', 'email', 'is_staff')
