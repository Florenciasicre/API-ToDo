from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import TaskSerializer
from .models import Task
# Create your views here.

@api_view(['GET'])
def apiOverView(request):
    api_url = {
        'List': '/task-list',
        'Delail View' : '/task-detail/<str:pk>/',
        'Creat': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
     }
    return Response(api_url)

@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all().order_by('-id')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

#Only return same task
@api_view(['GET'])
def taskDetail(request,pk):
    #The id of the task == to pk to the models 
    tasks = Task.objects.get(id = pk)
    serializer = TaskSerializer(tasks, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def taskCreate(request):
    #request.data return a Json
    serializer = TaskSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def taskUpdate(request,pk):
    #request.data return a Json
    task = Task.objects.get(id= pk)
    serializer = TaskSerializer(instance=task, data= request.data )
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#Delete is a method
@api_view(['DELETE'])
def taskDelete(request,pk):
    #request.data return a Json
    task = Task.objects.get(id= pk)
    task.delete()
    return Response('Successfully delete!')