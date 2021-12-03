from django.db import models

# Create your models here.

class Dashboard(models.Model):
    longitude = models.CharField(max_length=100)
    latitude = models.CharField(max_length=100)
    time = models.DateTimeField()