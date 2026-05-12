import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestClassifier
from api.models import Customer, Order, OrderItem, Product

def get_customer_data_frame():
    customers = Customer.objects.all()
    if not customers.exists():
        return None
    
    data = []
    for c in customers:
        data.append({
            'id': c.id,
            'total_spent': float(c.total_spent),
            'order_count': c.order_count,
            'days_since_last_purchase': (pd.Timestamp.now(tz='UTC') - c.last_purchase_date).days if c.last_purchase_date else 365,
            'churn_probability': c.churn_probability
        })
    return pd.DataFrame(data)

def segment_customers():
    """
    Sử dụng K-Means Clustering để phân nhóm khách hàng dựa trên RFM (Recency, Frequency, Monetary)
    """
    df = get_customer_data_frame()
    if df is None or len(df) < 3:
        return {"message": "Not enough data for clustering"}
    
    # Chuẩn hóa dữ liệu cho K-Means
    features = df[['total_spent', 'order_count', 'days_since_last_purchase']]
    
    # Thực hiện clustering (3 nhóm: VIP, Regular, Low-value)
    kmeans = KMeans(n_clusters=3, random_state=42, n_init='auto')
    df['cluster'] = kmeans.fit_predict(features)
    
    # Gán nhãn dựa trên giá trị trung bình của cụm
    cluster_means = df.groupby('cluster')['total_spent'].mean().sort_values(ascending=False)
    labels = {cluster_means.index[0]: 'VIP', cluster_means.index[1]: 'Regular', cluster_means.index[2]: 'Low-value'}
    
    results = []
    for _, row in df.iterrows():
        segment = labels[row['cluster']]
        # Cập nhật vào DB
        Customer.objects.filter(id=row['id']).update(segment=segment.lower())
        results.append({'id': int(row['id']), 'segment': segment})
        
    return results

def predict_churn():
    """
    Sử dụng RandomForest cơ bản để dự báo nguy cơ rời bỏ
    Dựa trên tần suất mua hàng và giá trị chi tiêu
    """
    df = get_customer_data_frame()
    if df is None or len(df) < 5:
        return {"message": "Not enough data for churn prediction"}
    
    # Giả định mục tiêu (Target) dựa trên logic thực tế nếu không có dữ liệu lịch sử rời bỏ
    # Khách hàng không mua hàng > 60 ngày được coi là có nguy cơ cao
    df['is_churn'] = (df['days_since_last_purchase'] > 60).astype(int)
    
    X = df[['total_spent', 'order_count', 'days_since_last_purchase']]
    y = df['is_churn']
    
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X, y)
    
    # Lấy xác suất rời bỏ
    probs = clf.predict_proba(X)[:, 1]
    
    results = []
    for i, row in df.iterrows():
        prob = float(probs[i])
        risk_level = "Low"
        if prob > 0.7: risk_level = "High"
        elif prob > 0.4: risk_level = "Medium"
        
        # Cập nhật vào DB
        Customer.objects.filter(id=row['id']).update(churn_probability=prob)
        results.append({
            'id': int(row['id']), 
            'probability': round(prob, 2),
            'risk_level': risk_level
        })
        
    return results

def get_product_recommendations(customer_id):
    """
    Gợi ý sản phẩm dựa trên các sản phẩm bán chạy nhất mà khách hàng chưa mua
    """
    try:
        customer = Customer.objects.get(id=customer_id)
        # Lấy danh sách ID sản phẩm khách đã mua
        purchased_ids = OrderItem.objects.filter(order__customer=customer).values_list('product_id', flat=True).distinct()
        
        # Gợi ý top 3 sản phẩm bán chạy nhất mà khách chưa mua
        recommendations = Product.objects.exclude(id__in=purchased_ids).order_by('-sold')[:3]
        
        return [
            {"id": p.id, "name": p.name, "price": float(p.price), "image": p.image}
            for p in recommendations
        ]
    except Customer.DoesNotExist:
        return []
