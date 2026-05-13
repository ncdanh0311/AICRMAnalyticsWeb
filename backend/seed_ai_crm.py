import os
import django
import random
import pandas as pd
from decimal import Decimal
from datetime import timedelta
from django.utils import timezone
from faker import Faker

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from apps.customers.models import Customer, CustomerFeedback
from apps.analytics.models import Order
from django.contrib.auth import get_user_model

User = get_user_model()
fake = Faker('vi_VN')

DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'customer_analytics_dataset.csv')

def map_loyalty(score):
    if score >= 80: return 'platinum'
    if score >= 60: return 'gold'
    if score >= 40: return 'silver'
    return 'bronze'

def map_churn_risk(prob):
    if prob >= 0.6: return 'High Risk'
    if prob >= 0.3: return 'Medium Risk'
    return 'Low Risk'

def seed_data():
    if not os.path.exists(DATA_PATH):
        print(f"Error: Dataset not found at {DATA_PATH}")
        return

    print("Clearing existing data...")
    Customer.objects.all().delete()
    Order.objects.all().delete()
    CustomerFeedback.objects.all().delete()

    print("Loading new dataset from CSV...")
    df = pd.read_csv(DATA_PATH)
    
    # Drop duplicates in customer_id
    df.drop_duplicates(subset=['customer_id'], keep='first', inplace=True)
    
    # Clean data
    df['avg_order_value'] = df['avg_order_value'].fillna(0)
    df['email_open_rate'] = df['email_open_rate'].fillna(0)
    df['churn_risk'] = df['churn_risk'].fillna(0)
    
    print(f"Processing {len(df)} customer records...")
    
    customers_to_create = []
    
    for _, row in df.iterrows():
        # Generate identity info
        full_name = fake.name()
        email = f"{row['customer_id'].lower()}@analytics.vn"
        phone = fake.phone_number()[:20]
        
        # Map values
        gender_val = 'other'
        if str(row['gender']).lower() == 'male': gender_val = 'male'
        elif str(row['gender']).lower() == 'female': gender_val = 'female'
        
        churn_risk_label = map_churn_risk(row['churn_risk'])
        loyalty_lvl = map_loyalty(row['loyalty_score'])
        
        total_spent = Decimal(float(row['avg_order_value']) * int(row['total_orders']))
        
        customer = Customer(
            external_id=row['customer_id'],
            name=full_name,
            email=email,
            phone_number=phone,
            age=int(row['age']),
            gender=gender_val,
            country=row['country'],
            total_spending=total_spent,
            order_count=int(row['total_orders']),
            avg_order_value=float(row['avg_order_value']),
            last_active_days=int(row['last_purchase']),
            is_fraudulent=bool(row['is_fraudulent']),
            preferred_category=row['preferred_category'],
            email_open_rate=float(row['email_open_rate']),
            loyalty_score=int(row['loyalty_score']),
            loyalty_level=loyalty_lvl,
            churn_risk=churn_risk_label,
            churn_probability=float(row['churn_risk']),
            status='active' if int(row['last_purchase']) < 180 else 'inactive'
        )
        customers_to_create.append(customer)

        # Bulk create every 500 records
        if len(customers_to_create) >= 500:
            Customer.objects.bulk_create(customers_to_create)
            customers_to_create = []

    if customers_to_create:
        Customer.objects.bulk_create(customers_to_create)

    print(f"Successfully imported {Customer.objects.count()} customers.")

    # Create dummy admin if not exists
    if not User.objects.filter(email='admin@example.com').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123', full_name='Quan tri vien')

    # Generate some sample feedbacks for the UI
    print("Generating sample feedbacks...")
    feedbacks_pool = [
        "Dich vu rat tot, nhan vien ho tro nhanh.",
        "Toi chua hai long vi phan hoi hoi cham.",
        "San pham on nhung can cai thien trai nghiem.",
        "Gia hop ly, toi se tiep tuc su dung.",
        "Tuyet voi, shop phuc vu rat chu dao.",
        "Giao hang nhanh, dong goi can than."
    ]
    
    # Pick 200 random customers for feedback
    all_customers = list(Customer.objects.all())
    sample_customers = random.sample(all_customers, min(len(all_customers), 200))
    
    feedbacks_to_create = [
        CustomerFeedback(
            customer=c,
            comment=random.choice(feedbacks_pool),
            sentiment=None # Will be analyzed by AI task
        ) for c in sample_customers
    ]
    CustomerFeedback.objects.bulk_create(feedbacks_to_create)

    print("Data seeding completed successfully!")

if __name__ == "__main__":
    seed_data()
