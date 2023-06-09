from rest_framework import serializers
from .models import Schedule
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Schedule
        fields =["pk","owner","subject",'work','date',"grade"]

class tokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk',"is_staff","username","profile"]
        depth= 1