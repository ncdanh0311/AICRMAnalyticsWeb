# AI Customer Behavior Analytics System

## Giới thiệu

**AI Customer Behavior Analytics System** là một hệ thống phân tích hành vi khách hàng chuyên sâu, tích hợp trí tuệ nhân tạo (AI) để cung cấp các thông tin chi tiết về kinh doanh. Hệ thống được thiết kế theo phong cách Light Mode hiện đại, sạch sẽ, tập trung vào việc quản lý khách hàng và phân tích dữ liệu thay vì các tính năng thương mại điện tử thông thường.

### 🌟 Tính năng chính

-  **Professional Analytics Dashboard**: Giao diện quản trị hiện đại với các biểu đồ trực quan từ **ApexCharts**.
-  **AI - Customer Segmentation**: Tự động phân loại khách hàng (VIP, Regular, Low-value) bằng thuật toán **K-Means clustering**.
-  **AI - Churn Prediction**: Nhận diện sớm các khách hàng có nguy cơ rời bỏ bằng mô hình **RandomForestClassifier**.
-  **AI - Vietnamese Sentiment Analysis**: Phân tích cảm xúc phản hồi của khách hàng (Tích cực, Trung lập, Tiêu cực) sử dụng thư viện **Underthesea**.
-  **Customer Management**: Quản lý danh sách khách hàng tập trung với khả năng lọc và tìm kiếm thông minh.
-  **Modern Light UI**: Thiết kế tinh tế, minimal, sử dụng **TailwindCSS** và **Lucide Icons**.

---

## 🛠️ Tech Stack

### Backend
- **Python 3.11+ / Django 5**
- **Django Rest Framework (DRF)** & **SimpleJWT**
- **Pandas & Scikit-learn**: Cho các tính năng Machine Learning.
- **Underthesea**: Xử lý ngôn ngữ tự nhiên (NLP) cho tiếng Việt.

### Frontend
- **React 18** với **TypeScript**
- **Vite**: Build tool siêu nhanh.
- **Tailwind CSS**: Framework CSS tiện lợi.
- **ApexCharts**: Thư viện biểu đồ mạnh mẽ.
- **Lucide React**: Bộ icon tinh tế.

---

## 🚀 Cài đặt và chạy

### 1. Backend
```bash
cd backend
# Cài đặt thư viện
pip install -r requirements.txt
# Chạy migrations
python manage.py makemigrations
python manage.py migrate
# Seed dữ liệu mẫu (Quan trọng)
python seed_ai_crm.py
# Chạy server
python manage.py runserver
```

### 2. Frontend
```bash
cd frontend
# Cài đặt dependencies
npm install
# Chạy development server
npm run dev
```

---

## 🔑 Tài khoản đăng nhập mẫu
- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## 📊 API Endpoints

| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| **POST** | `/api/auth/login/` | Đăng nhập và nhận JWT Token |
| **GET** | `/api/customers/` | Danh sách khách hàng (Lọc & Tìm kiếm) |
| **GET** | `/api/analytics/dashboard/` | Dữ liệu thống kê tổng quan |
| **POST** | `/api/ai/segmentation/` | Chạy thuật toán phân nhóm khách hàng |
| **POST** | `/api/ai/churn/` | Chạy dự báo rời bỏ |
| **POST** | `/api/ai/sentiment/` | Phân tích cảm xúc phản hồi |
