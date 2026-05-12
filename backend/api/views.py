from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q, Sum, Count, Avg
from .models import User, Product, Category, Customer, Order, OrderItem, AnalyticsReport
from .serializers import (
    UserSerializer, ProductSerializer, CategorySerializer, 
    CustomerSerializer, OrderSerializer, OrderItemSerializer, AnalyticsReportSerializer
)
from .permissions import IsAdminRole, IsAdminOrReadOnly
from services.analytics_service import segment_customers, forecast_revenue

from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return User.objects.none()
        if user.role == 'admin' or user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=user.id)

    def get_permissions(self):
        if self.action in ['login', 'register']:
            return [permissions.AllowAny()]
        return super().get_permissions()

    @action(detail=False, methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(request, username=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            serializer = self.get_serializer(user)
            return Response({
                'success': True,
                'data': serializer.data,
                'token': str(refresh.access_token),
                'refresh': str(refresh)
            })
        return Response({
            'success': False,
            'message': 'Invalid credentials'
        }, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if 'password' in request.data:
                user.set_password(request.data['password'])
                user.save()
            
            refresh = RefreshToken.for_user(user)
            return Response({
                'success': True,
                'data': serializer.data,
                'token': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_201_CREATED)
        return Response({
            'success': False,
            'message': 'Registration failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Customer.objects.all()
        q = self.request.query_params.get('q')
        if q:
            queryset = queryset.filter(
                Q(full_name__icontains=q) | 
                Q(email__icontains=q) | 
                Q(phone__icontains=q)
            )
        
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
            
        segment_filter = self.request.query_params.get('segment')
        if segment_filter:
            queryset = queryset.filter(segment=segment_filter)
            
        return queryset

    @action(detail=False, methods=['get'])
    def stats(self, request):
        total_customers = Customer.objects.count()
        active_customers = Customer.objects.filter(status='active').count()
        avg_spent = Customer.objects.aggregate(avg=Sum('total_spent'))['avg'] or 0
        
        return Response({
            'total_customers': total_customers,
            'active_customers': active_customers,
            'average_spending': avg_spent / total_customers if total_customers > 0 else 0
        })

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        queryset = Product.objects.all()
        q = self.request.query_params.get('q')
        if q:
            queryset = queryset.filter(Q(name__icontains=q) | Q(description__icontains=q))
        return queryset

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Order.objects.all().order_by('-created_at')
        customer_id = self.request.query_params.get('customer_id')
        if customer_id:
            queryset = queryset.filter(customer_id=customer_id)
        return queryset

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]

class AdminStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        from services.analytics_service import forecast_revenue
        
        orders_query = Order.objects.filter(status='completed')
        total_revenue = orders_query.aggregate(Sum('total_amount'))['total_amount__sum'] or 0
        total_customers = Customer.objects.count()
        total_orders = orders_query.count()
        
        # Revenue trend (Monthly)
        from django.db.models.functions import TruncMonth
        trend = orders_query.annotate(month=TruncMonth('created_at')) \
            .values('month') \
            .annotate(revenue=Sum('total_amount')) \
            .order_by('month')
            
        revenue_trend = [
            {"month": item['month'].strftime('%b'), "revenue": float(item['revenue'])}
            for item in trend
        ]

        # Top Customers & Products
        top_customers = CustomerSerializer(Customer.objects.order_by('-total_spent')[:5], many=True).data
        top_products = ProductSerializer(Product.objects.order_by('-sold')[:5], many=True).data

        data = {
            "summary": {
                "total_revenue": float(total_revenue),
                "total_customers": total_customers,
                "total_orders": total_orders,
                "monthly_growth": 12.4, # Calculated growth would go here
            },
            "revenue_trend": revenue_trend,
            "top_customers": top_customers,
            "top_products": top_products
        }
        return Response(data)

class AIInsightsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        from services.ai_service import segment_customers, predict_churn
        
        # Run AI logic (Updates DB in real-time for demo)
        segment_results = segment_customers()
        churn_results = predict_churn()

        # Segmentation Chart Data
        segment_counts = Customer.objects.values('segment').annotate(count=Count('id'))
        segment_labels = [s['segment'].capitalize() for s in segment_counts]
        segment_series = [s['count'] for s in segment_counts]

        # Churn Prediction Data
        top_churn_risks = Customer.objects.order_by('-churn_probability')[:5]
        
        insights = {
            "segmentation": {
                "series": segment_series,
                "labels": segment_labels
            },
            "churn_prediction": [
                {
                    "customer_name": c.full_name,
                    "probability": round(c.churn_probability, 2),
                    "status": "High Risk" if c.churn_probability > 0.7 else "Medium Risk" if c.churn_probability > 0.4 else "Low Risk"
                } for c in top_churn_risks
            ],
            "recommendations": [
                {"title": "Loyalty Program", "description": "Invite VIP customers to exclusive loyalty program to increase retention."},
                {"title": "Product Bundling", "description": "Suggest bundling complementary services for Regular customers."},
                {"title": "Re-engagement", "description": "Send personalized discount coupons to Low-value customers."}
            ]
        }
        return Response(insights, status=status.HTTP_200_OK)

class HealthView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        return Response({'status': 'ok', 'message': 'AI CRM Analytics Backend is running'}, status=status.HTTP_200_OK)
