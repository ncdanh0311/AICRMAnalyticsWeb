from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomerViewSet, FeedbackViewSet

router = DefaultRouter()
router.register(r'', CustomerViewSet)
router.register(r'feedbacks', FeedbackViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
