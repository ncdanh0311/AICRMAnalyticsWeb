from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Customer, CustomerFeedback
from .serializers import CustomerSerializer, FeedbackSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all().order_by('-created_at')
    serializer_class = CustomerSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['segment', 'churn_risk', 'gender']
    search_fields = ['name', 'email']
    ordering_fields = ['total_spending', 'order_count', 'satisfaction_score', 'created_at']

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = CustomerFeedback.objects.all().order_by('-created_at')
    serializer_class = FeedbackSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['customer', 'sentiment']
