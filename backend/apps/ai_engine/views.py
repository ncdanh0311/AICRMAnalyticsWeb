from rest_framework.views import APIView
from rest_framework.response import Response
from apps.customers.models import Customer, CustomerFeedback
from .services import AICRMService

class SegmentationView(APIView):
    def post(self, request):
        customers = Customer.objects.all()
        if not customers.exists():
            return Response({'message': 'No customers to segment'}, status=400)
            
        data = list(customers.values('total_spending', 'order_count', 'satisfaction_score'))
        segments = AICRMService.segment_customers(data)
        
        for i, customer in enumerate(customers):
            customer.segment = segments[i]
            customer.save()
            
        return Response({'message': f'Đã phân khúc {len(segments)} khách hàng thành công'})

class ChurnPredictionView(APIView):
    def post(self, request):
        customers = Customer.objects.all()
        if not customers.exists():
            return Response({'message': 'Không có dữ liệu khách hàng để dự báo'}, status=400)
            
        data = list(customers.values('last_active_days', 'satisfaction_score', 'order_count'))
        predictions = AICRMService.predict_churn(data)
        
        for i, customer in enumerate(customers):
            customer.churn_risk = predictions[i]
            customer.save()
            
        return Response({'message': f'Đã dự báo rủi ro rời bỏ cho {len(predictions)} khách hàng'})

class SentimentAnalysisView(APIView):
    def post(self, request):
        feedbacks = CustomerFeedback.objects.filter(sentiment__isnull=True)
        count = 0
        for fb in feedbacks:
            fb.sentiment = AICRMService.analyze_sentiment(fb.comment)
            fb.save()
            count += 1
            
        return Response({'message': f'Đã phân tích cảm xúc cho {count} phản hồi'})
