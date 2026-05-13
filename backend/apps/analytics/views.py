from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Count, Avg
from apps.customers.models import Customer, CustomerFeedback
from .models import Order

class DashboardStatsView(APIView):
    def get(self, request):
        total_customers = Customer.objects.count()
        total_revenue = Order.objects.aggregate(total=Sum('amount'))['total'] or 0
        avg_satisfaction = Customer.objects.aggregate(avg=Avg('satisfaction_score'))['avg'] or 0
        
        # Calculate churn rate (simplified: high risk / total)
        high_risk_customers = Customer.objects.filter(churn_risk='High Risk').count()
        churn_rate = (high_risk_customers / total_customers * 100) if total_customers > 0 else 0

        # Revenue Trend (last 7 days)
        # In a real app, use trunc_day
        revenue_trend = [
            {'date': '2024-01-01', 'amount': 1200},
            {'date': '2024-01-02', 'amount': 1500},
            {'date': '2024-01-03', 'amount': 1100},
            {'date': '2024-01-04', 'amount': 1800},
            {'date': '2024-01-05', 'amount': 2100},
            {'date': '2024-01-06', 'amount': 1700},
            {'date': '2024-01-07', 'amount': 2500},
        ]

        # Segmentation Distribution
        segmentation = Customer.objects.values('segment').annotate(count=Count('id'))
        
        # Sentiment Distribution
        sentiment = CustomerFeedback.objects.values('sentiment').annotate(count=Count('id'))

        return Response({
            'cards': {
                'total_customers': total_customers,
                'total_revenue': total_revenue,
                'churn_rate': round(churn_rate, 1),
                'satisfaction': round(avg_satisfaction, 1),
            },
            'charts': {
                'revenue_trend': revenue_trend,
                'segmentation': segmentation,
                'sentiment': sentiment,
            },
            'ai_insights': [
                "Lượng khách hàng VIP đã tăng 15% trong tháng này.",
                "Mức độ hài lòng của khách hàng ổn định ở mức 4.2/5.0.",
                "Phát hiện rủi ro rời bỏ cao ở nhóm khách hàng 'Thân thiết' có hoạt động thấp."
            ]
        })

class RevenueAnalyticsView(APIView):
    def get(self, request):
        # Detailed revenue analytics
        return Response({'message': 'Revenue analytics data'})

class CustomerAnalyticsView(APIView):
    def get(self, request):
        # Detailed customer growth analytics
        return Response({'message': 'Customer analytics data'})
