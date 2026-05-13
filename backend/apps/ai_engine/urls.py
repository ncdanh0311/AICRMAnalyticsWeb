from django.urls import path
from .views import SegmentationView, ChurnPredictionView, SentimentAnalysisView

urlpatterns = [
    path('segmentation/', SegmentationView.as_view(), name='ai_segmentation'),
    path('churn/', ChurnPredictionView.as_view(), name='ai_churn'),
    path('sentiment/', SentimentAnalysisView.as_view(), name='ai_sentiment'),
]
