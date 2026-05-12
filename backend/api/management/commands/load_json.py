import json
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from api.models import User, Product, Category, Review, Order, Wallet, Transaction
from decimal import Decimal

class Command(BaseCommand):
    help = 'Load JSON data to Django DB'

    def handle(self, *args, **kwargs):
        old_data_dir = os.path.join(settings.BASE_DIR, 'data')

        # Load users
        users_file = os.path.join(old_data_dir, 'users.json')
        if os.path.exists(users_file):
            with open(users_file, 'r', encoding='utf-8') as f:
                users_data = json.load(f)
                for u in users_data:
                    email = u.get('email', f"user_{u['id']}@example.com")
                    user, created = User.objects.get_or_create(
                        email=email,
                        defaults={
                            'username': email.split('@')[0] + u['id'][-4:],
                            'full_name': u.get('fullName', ''),
                            'phone': u.get('phone', ''),
                            'role': u.get('role', 'user'),
                            'is_superuser': u.get('role') == 'admin',
                            'is_staff': u.get('role') == 'admin'
                        }
                    )
                    if created and 'password' in u:
                        user.set_password(u['password'])
                        user.save()
            self.stdout.write(self.style.SUCCESS('Successfully loaded users.'))

        # Load products
        products_file = os.path.join(old_data_dir, 'products.json')
        if os.path.exists(products_file):
            with open(products_file, 'r', encoding='utf-8') as f:
                products_data = json.load(f)
                for p in products_data:
                    Product.objects.get_or_create(
                        name=p.get('name', 'Unnamed Product'),
                        defaults={
                            'description': p.get('description', ''),
                            'price': Decimal(p.get('price', 0)),
                            'original_price': Decimal(p.get('originalPrice', 0)),
                            'discount': p.get('discount', 0),
                            'image': p.get('image', ''),
                            'category': p.get('category', ''),
                            'stock': p.get('stock', 0),
                            'sold': p.get('sold', 0),
                            'in_stock': p.get('inStock', True),
                        }
                    )
            self.stdout.write(self.style.SUCCESS('Successfully loaded products.'))
