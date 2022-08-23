from django.urls import path, include
from . import views
urlpatterns = [
    path('api/',views.apiOverView, name= "api-overview"),
    path('taskList', views.taskList, name='taskList' ), 
    path('taskDetail/<str:pk>/', views.taskDetail, name='taskDetail' ), 
    path('taskCreate', views.taskCreate, name='createList' ), 
    path('taskUpdate/<str:pk>/', views.taskUpdate, name='taskUpdate' ),
    path('taskDelete/<str:pk>/', views.taskDelete, name='taskDelete'),
]