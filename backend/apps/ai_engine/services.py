import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestClassifier
from underthesea import sentiment

class AICRMService:
    @staticmethod
    def segment_customers(customer_data):
        """
        customer_data: list of dicts with [total_spending, order_count, satisfaction_score]
        """
        if not customer_data:
            return []
            
        df = pd.DataFrame(customer_data)
        features = df[['total_spending', 'order_count', 'satisfaction_score']]
        
        # Simple KMeans with 3 clusters
        kmeans = KMeans(n_clusters=min(3, len(df)), random_state=42, n_init=10)
        df['cluster'] = kmeans.fit_predict(features)
        
        # Map clusters to labels (heuristic based on spending)
        cluster_means = df.groupby('cluster')['total_spending'].mean().sort_values()
        label_map = {
            cluster_means.index[0]: 'Low-value',
            cluster_means.index[1] if len(cluster_means) > 1 else cluster_means.index[0]: 'Regular',
            cluster_means.index[2] if len(cluster_means) > 2 else cluster_means.index[-1]: 'VIP'
        }
        
        return [label_map[c] for c in df['cluster']]

    @staticmethod
    def predict_churn(customer_data):
        """
        customer_data: list of dicts with features
        In a real app, we'd train on historical data. 
        Here we use a simplified rule-based or mock model for demonstration.
        """
        results = []
        for c in customer_data:
            # Simple heuristic for "prediction"
            score = 0
            if c['last_active_days'] > 30: score += 1
            if c['satisfaction_score'] < 3: score += 1
            if c['order_count'] < 2: score += 1
            
            if score >= 2:
                results.append('High Risk')
            elif score == 1:
                results.append('Medium Risk')
            else:
                results.append('Low Risk')
        return results

    @staticmethod
    def analyze_sentiment(text):
        try:
            res = sentiment(text)
            if not res:
                return 'neutral'
            return res.lower() # positive, negative, neutral
        except:
            return 'neutral'
