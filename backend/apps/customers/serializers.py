from rest_framework import serializers
from .models import Customer, CustomerFeedback

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerFeedback
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    feedbacks = FeedbackSerializer(many=True, read_only=True)
    
    class Meta:
        model = Customer
        fields = '__all__'
