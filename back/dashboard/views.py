from rest_framework.response import Response
from rest_framework.decorators import api_view
from dashboard.models import Dashboard
from dashboard.serializers import DashboardSerializer
# Create your views here.

@api_view(['GET'])
def dashboard(request):
    board = Dashboard.objects.all()
    serializer = DashboardSerializer(board, many=True)
    return Response(serializer.data)

# test
@api_view(['POST'])
def dashboard_create(request):
    serializer = DashboardSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
