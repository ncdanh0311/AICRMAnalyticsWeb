from django.db import models
from apps.customers.models import Customer

class Order(models.Model):
    STATUS_CHOICES = (
        ('completed', 'Hoàn thành'),
        ('pending', 'Đang xử lý'),
        ('cancelled', 'Đã hủy'),
    )
    PAYMENT_CHOICES = (
        ('credit_card', 'Thẻ tín dụng'),
        ('cash', 'Tiền mặt'),
        ('bank_transfer', 'Chuyển khoản'),
        ('e_wallet', 'Ví điện tử'),
    )
    CATEGORY_CHOICES = (
        ('electronics', 'Điện tử'),
        ('fashion', 'Thời trang'),
        ('home_living', 'Nhà cửa & Đời sống'),
        ('beauty', 'Làm đẹp'),
        ('food', 'Thực phẩm'),
    )

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='orders')
    product_category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='electronics')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES, default='cash')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.customer.name}"

class AnalyticsReport(models.Model):
    report_type = models.CharField(max_length=50) # revenue, customer_growth, etc.
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.report_type} - {self.created_at}"
