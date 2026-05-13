from django.db import models

class Customer(models.Model):
    GENDER_CHOICES = (
        ('male', 'Nam'),
        ('female', 'Nữ'),
        ('other', 'Khác'),
    )
    STATUS_CHOICES = (
        ('active', 'Hoạt động'),
        ('inactive', 'Không hoạt động'),
    )
    LOYALTY_CHOICES = (
        ('bronze', 'Đồng'),
        ('silver', 'Bạc'),
        ('gold', 'Vàng'),
        ('platinum', 'Bạch kim'),
    )
    
    # Original Data Fields
    external_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    
    # Demographic & Location
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='other')
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    
    # Behavioral Data
    total_spending = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    order_count = models.IntegerField(default=0)
    avg_order_value = models.FloatField(default=0)
    last_active_days = models.IntegerField(default=0) # Days since last purchase
    is_fraudulent = models.BooleanField(default=False)
    preferred_category = models.CharField(max_length=50, blank=True, null=True)
    email_open_rate = models.FloatField(default=0)
    
    # AI & CRM Analytics
    satisfaction_score = models.FloatField(default=0) 
    loyalty_score = models.IntegerField(default=0)
    loyalty_level = models.CharField(max_length=20, choices=LOYALTY_CHOICES, default='bronze')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    segment = models.CharField(max_length=50, blank=True, null=True) 
    churn_risk = models.CharField(max_length=50, blank=True, null=True)
    churn_probability = models.FloatField(default=0) # Raw value from CSV
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class CustomerFeedback(models.Model):
    SENTIMENT_CHOICES = (
        ('positive', 'Tích cực'),
        ('neutral', 'Trung lập'),
        ('negative', 'Tiêu cực'),
    )
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='feedbacks')
    comment = models.TextField()
    sentiment = models.CharField(max_length=20, choices=SENTIMENT_CHOICES, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Phản hồi từ {self.customer.name} - {self.sentiment}"
