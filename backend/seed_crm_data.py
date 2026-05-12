import os
import django
import random
from datetime import datetime, timedelta

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import User, Customer, Product, Category, Order, OrderItem, AnalyticsReport

def seed_data():
    print("Cleaning existing data...")
    User.objects.filter(is_superuser=False).delete()
    Customer.objects.all().delete()
    Product.objects.all().delete()
    Category.objects.all().delete()
    Order.objects.all().delete()
    AnalyticsReport.objects.all().delete()

    print("Creating Admin User...")
    if not User.objects.filter(email='admin@example.com').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')

    print("Creating CRM Categories...")
    categories = [
        "Phan mem CRM", "Dich vu AI", "Tu van Marketing", "He thong POS", "License Premium"
    ]
    category_objs = []
    for name in categories:
        cat = Category.objects.create(name=name)
        category_objs.append(cat)

    print("Creating Services/Products...")
    services = [
        {"name": "AI Insight Premium", "price": 5000000, "cat": "Dich vu AI"},
        {"name": "He thong CRM Doanh nghiep", "price": 15000000, "cat": "Phan mem CRM"},
        {"name": "Bot Zalo Marketing", "price": 2000000, "cat": "Tu van Marketing"},
        {"name": "License Windows Pro (Bulk)", "price": 3000000, "cat": "License Premium"},
        {"name": "Phan tich hanh vi KH", "price": 7000000, "cat": "Dich vu AI"},
    ]
    product_objs = []
    for s in services:
        cat = Category.objects.get(name=s["cat"])
        p = Product.objects.create(
            name=s["name"],
            price=s["price"],
            category=cat,
            description=f"Giai phap {s['name']} chuyen nghiep cho doanh nghiep.",
            stock=100
        )
        product_objs.append(p)

    print("Creating Mock Customers...")
    names = [
        "Nguyen Van An", "Tran Thi Binh", "Le Van Cuong", "Pham Minh Duc", 
        "Hoang Thi Em", "Vu Van Huy", "Dang Thi Lan", "Bui Minh Nam",
        "Do Thi Oanh", "Ngo Van Phuong", "Ly Thi Quy", "Mai Van Son"
    ]
    customer_objs = []
    for i, name in enumerate(names):
        email = f"customer{i}@example.com"
        total_spent = random.randint(1000000, 50000000)
        c = Customer.objects.create(
            full_name=name,
            email=email,
            phone=f"090{random.randint(1000000, 9999999)}",
            total_spent=total_spent,
            order_count=random.randint(1, 20),
            last_purchase_date=datetime.now() - timedelta(days=random.randint(0, 100)),
            churn_probability=random.uniform(0.1, 0.9) if total_spent < 5000000 else random.uniform(0.01, 0.3),
            segment=random.choice(['vip', 'regular', 'low_value', 'new']),
            status=random.choice(['active', 'inactive', 'lead'])
        )
        customer_objs.append(c)

    print("Creating Mock Orders...")
    for _ in range(30):
        cust = random.choice(customer_objs)
        order = Order.objects.create(
            customer=cust,
            status="completed",
            total_amount=0
        )
        items_count = random.randint(1, 3)
        current_total = 0
        for _ in range(items_count):
            prod = random.choice(product_objs)
            qty = random.randint(1, 2)
            OrderItem.objects.create(
                order=order,
                product=prod,
                quantity=qty,
                price=prod.price
            )
            current_total += prod.price * qty
        
        order.total_amount = current_total
        order.save()

    print("Seeding completed successfully!")

if __name__ == "__main__":
    seed_data()
