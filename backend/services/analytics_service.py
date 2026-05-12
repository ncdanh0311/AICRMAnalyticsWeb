import pandas as pd
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression
import numpy as np

def segment_customers(users_data, orders_data):
    """
    K-means clustering for customer segmentation based on spending and order frequency.
    users_data: list of dicts or dataframe
    orders_data: list of dicts or dataframe
    """
    if not orders_data:
        return []

    df_orders = pd.DataFrame(orders_data)
    
    # Calculate total spent and number of orders per user
    user_stats = df_orders.groupby('user_id').agg(
        total_spent=('total_amount', 'sum'),
        order_count=('id', 'count')
    ).reset_index()

    if len(user_stats) < 3:
        # Not enough data for k-means, return basic info
        return user_stats.to_dict(orient='records')

    # Simple K-Means
    kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
    user_stats['cluster'] = kmeans.fit_predict(user_stats[['total_spent', 'order_count']])
    
    # Map cluster numbers to labels (e.g., Bronze, Silver, Gold based on total_spent mean)
    cluster_means = user_stats.groupby('cluster')['total_spent'].mean().sort_values()
    labels = {cluster_means.index[0]: 'Bronze', cluster_means.index[1]: 'Silver', cluster_means.index[2]: 'Gold'}
    user_stats['segment'] = user_stats['cluster'].map(labels)

    return user_stats.to_dict(orient='records')

def forecast_revenue(orders_data):
    """
    Linear regression to predict next month's sales based on history.
    """
    if not orders_data:
        return {"predicted_next_month": 0, "history": []}

    df_orders = pd.DataFrame(orders_data)
    df_orders['created_at'] = pd.to_datetime(df_orders['created_at'])
    df_orders['month'] = df_orders['created_at'].dt.to_period('M')
    
    monthly_revenue = df_orders.groupby('month')['total_amount'].sum().reset_index()
    monthly_revenue['month_index'] = range(len(monthly_revenue))
    
    if len(monthly_revenue) < 2:
        return {
            "predicted_next_month": float(monthly_revenue['total_amount'].iloc[0]) if len(monthly_revenue) > 0 else 0,
            "history": monthly_revenue.to_dict(orient='records')
        }

    X = monthly_revenue[['month_index']]
    y = monthly_revenue['total_amount']

    model = LinearRegression()
    model.fit(X, y)

    next_month_index = pd.DataFrame({'month_index': [len(monthly_revenue)]})
    predicted = model.predict(next_month_index)[0]

    return {
        "predicted_next_month": float(max(0, predicted)),
        "history": [{"month": str(row['month']), "revenue": float(row['total_amount'])} for _, row in monthly_revenue.iterrows()]
    }
