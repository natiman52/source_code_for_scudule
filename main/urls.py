from django.urls import path
from rest_framework.authtoken.views import ObtainAuthToken
from .views import FilterRequestData,CreateSchedule,GetUserModel,Create_User,updateSchedule,deleteSchedule,getScheduleByUser
urlpatterns = [
    path("auth_ver/",ObtainAuthToken.as_view()),
    path('get_schedule/',FilterRequestData.as_view()),
    path('create_schedule/',CreateSchedule.as_view()),
    path('get_user/',GetUserModel.as_view()),
    path('create_user/',Create_User.as_view()),
    path('<int:pk>/update',updateSchedule.as_view()),
    path('<int:pk>/delete',deleteSchedule.as_view()),
    path("<int:pk>/schedule_user",getScheduleByUser.as_view())
]