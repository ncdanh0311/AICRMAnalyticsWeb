from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserViewSet, ProductViewSet, CategoryViewSet, CustomerViewSet,
    OrderViewSet, AdminStatsView, AIInsightsView, HealthView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'products', ProductViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('auth/login/', UserViewSet.as_view({'post': 'login'}, permission_classes=[permissions.AllowAny]), name='login'),
    path('auth/register/', UserViewSet.as_view({'post': 'register'}, permission_classes=[permissions.AllowAny]), name='register'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/stats/', AdminStatsView.as_view(), name='admin_stats'),
    path('ai/insights/', AIInsightsView.as_view(), name='ai_insights'),
    path('health/', HealthView.as_view(), name='health'),
    path('', include(router.urls)),
]
