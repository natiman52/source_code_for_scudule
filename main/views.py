from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Schedule,Profile,Comment
from .serializers import ScheduleSerializer,tokenSerializer,CommentSerializer
from rest_framework.authtoken.models import Token
from rest_framework import HTTP_HEADER_ENCODING
from django.contrib.auth.models import User
# Create your views here.
def HomeView(request):
    return render(request,"index.html")
class FilterRequestData(APIView):
    def get(self,request):
        grade_field=request.GET.get('grade')
        page_field = request.GET.get("subject")
        search_field =request.GET.get("date")
        if(search_field and page_field and grade_field):
            queryset = Schedule.objects.filter(grade=grade_field,date=search_field,subject=page_field)
        elif(page_field and grade_field):
            queryset = Schedule.objects.filter(subject=page_field,grade=grade_field)
        elif(grade_field and search_field):
            queryset = Schedule.objects.filter(grade=grade_field,date=search_field)
        elif(grade_field):
            queryset =Schedule.objects.filter(grade=grade_field)
        if (queryset.exists()):
            serializerobject= ScheduleSerializer(queryset,many=True)
            response_test=Response(serializerobject.data)
            return response_test
        else:
            return Response()
class CreateSchedule(APIView):
    def post(self, request):
        grade=request.data.get('grade')
        subject =request.data.get('subject')
        work = request.data.get('work')
        token_meta = request.META.get('HTTP_AUTHORIZATION',b"")
        token_encode = token_meta.encode(HTTP_HEADER_ENCODING).split()
        print(token_encode)
        try:
            token_key = token_encode[1].decode()
            print(token_key)
        except:
            return Response('error')
        token_model = Token.objects.select_related("user").get(key=token_key)
        Schedule_object =Schedule.objects.create(owner=token_model.user,subject=subject,work=work,grade=grade)
        serialize_object =ScheduleSerializer(Schedule_object)
        return Response(data=serialize_object.data)
class GetUserModel(APIView):
    def post(self,request):
        user_token=request.data['file_name']
        user_instance = Token.objects.select_related("user").get(key=user_token).user
        print(user_instance)
        user_data = tokenSerializer(user_instance)
        return Response(user_data.data)

class Create_User(APIView):
    def post(self,request):
        username= request.data.get("username")
        password=request.data.get('password')
        subject =request.data.get('subject')
        if User.objects.filter(username=username).exists():
            print(password)
            return Response('username Taken')
        my_user = User.objects.create_user(username=username,password=password)
        Profile.objects.create(user=my_user,subject=subject)
        return Response('it worked')
class updateSchedule(APIView):
    def put(self,request,pk):
        grade = request.data.get("grade")
        work = request.data.get('work')
        instance = Schedule.objects.get(pk=pk)
        instance.work = work
        instance.grade = grade
        instance.save()
        return Response("work")
class deleteSchedule(APIView):
    def delete(self,request,pk):
        instance = Schedule.objects.get(pk=pk)
        instance.delete()
        return Response("")
class getAllComment(APIView):
    def get(self,request):
        point =Comment.objects.all()
        instance = CommentSerializer(point,many=True)
        return Response(instance.data)

class CreateComment(APIView):
    def post(self,request):
        email = request.data.get("email")
        comment = request.data.get('comment')
        Comment.objects.create(email=email,comment=comment)
        return Response("Seccuss")

class getScheduleByUser(APIView):
    def get(self,request,pk):
        instance_user =User.objects.get(pk=pk)
        obj_sch = Schedule.objects.filter(owner=instance_user)
        serializers = ScheduleSerializer(obj_sch,many=True)
        return Response(serializers.data)