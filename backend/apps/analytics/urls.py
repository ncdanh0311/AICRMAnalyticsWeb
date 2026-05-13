from django.urls import path
from .views import DashboardStatsView, RevenueAnalyticsView, CustomerAnalyticsView

urlpatterns = [
    path('dashboard/', DashboardStatsView.as_view(), name='dashboard_stats'),
    path('revenue/', RevenueAnalyticsView.as_view(), name='revenue_analytics'),
    path('customers/', CustomerAnalyticsView.as_view(), name='customer_analytics'),
]
