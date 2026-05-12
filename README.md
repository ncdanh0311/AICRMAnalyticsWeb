#  AI CRM Analytics System

## Giới thiệu

**AI CRM Analytics System** là một hệ thống quản lý quan hệ khách hàng (CRM) thế hệ mới, tích hợp trí tuệ nhân tạo (AI) để phân tích dữ liệu chuyên sâu. Hệ thống không chỉ giúp quản lý thông tin khách hàng và dịch vụ mà còn cung cấp các dự báo thông minh, giúp doanh nghiệp thấu hiểu hành vi khách hàng và tối ưu hóa chiến lược kinh doanh.

###  Tính năng chính

-  **Quản lý khách hàng tập trung**: Theo dõi hồ sơ, lịch sử giao dịch và hành vi của từng khách hàng.
-  **AI - Phân nhóm khách hàng (Segmentation)**: Tự động phân loại khách hàng (VIP, Loyal, At Risk, Hibernating) bằng thuật toán **K-Means clustering** (scikit-learn).
-  **AI - Dự báo doanh thu (Forecasting)**: Sử dụng mô hình **Linear Regression** để dự đoán xu hướng doanh thu trong tương lai dựa trên dữ liệu lịch sử.
-  **AI - Dự báo rời bỏ (Churn Prediction)**: Nhận diện sớm các khách hàng có nguy cơ ngừng sử dụng dịch vụ để kịp thời đưa ra chiến dịch giữ chân.
-  **Hệ thống phân quyền (RBAC)**: Quản lý đa người dùng với các cấp độ truy cập bảo mật.
-  **Dashboard Premium**: Giao diện quản trị hiện đại, trực quan với các biểu đồ phân tích Real-time.
-  **Bảo mật tối cao**: Xác thực API bằng công nghệ JWT (JSON Web Tokens).
-  **Giao diện hiện đại**: Thiết kế Glassmorphism & Brutalist tối giản, mượt mà với React, Tailwind CSS và Framer Motion.

---

## 🛠️ Tech Stack

### Backend
- **Python 3.11+ / Django 5**
- **Django Rest Framework (DRF)**: 
- **SimpleJWT**: 
- **SQLite / PostgreSQL**: 
- **Pandas & Scikit-learn**: 

### Frontend
- **React 18** với **TypeScript**: 
- **Vite**:
- **Tailwind CSS**: 
- **Framer Motion**: 
- **Lucide React**: 

---

##  Cài đặt và chạy

### Yêu cầu hệ thống

- **Python** >= 3.10
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### 1. Cài đặt Backend

```bash
cd backend

# Tạo và kích hoạt virtual environment
python -m venv venv
source venv/bin/activate  # Trên Windows: venv\Scripts\activate

# Cài đặt các thư viện cần thiết
pip install -r requirements.txt

# Cập nhật cấu trúc Database (Quan trọng)
python manage.py makemigrations
python manage.py migrate

# Tạo tài khoản quản trị
python manage.py createsuperuser

# Khởi động Backend Server
python manage.py runserver
```
*Backend API sẽ chạy tại: `http://127.0.0.1:8000/`*

### 2. Cài đặt Frontend

```bash
cd frontend

# Cài đặt dependencies
npm install

# Khởi động Development Server
npm run dev
```
*Giao diện frontend sẽ chạy tại: `http://localhost:5173/`*

---

## API Endpoints (Core)

| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| **POST** | `/auth/login/` | Đăng nhập và lấy JWT Token |
| **GET** | `/customers/` | Danh sách khách hàng (Hỗ trợ lọc & tìm kiếm) |
| **GET** | `/customers/{id}/` | Chi tiết và lịch sử một khách hàng |
| **GET** | `/ai/insights/` | Lấy dữ liệu phân tích AI (Segmentation, Churn, Forecast) |
| **GET** | `/admin/stats/` | Thống kê tổng quan hệ thống cho Admin |
| **GET** | `/products/` | Danh sách các gói giải pháp/dịch vụ |

---

##  Bảo mật & Quyền truy cập

- **Authentication**: Giao tiếp bảo mật với JWT. Header yêu cầu: `Authorization: Bearer <access_token>`.
- **Authorization**: Phân quyền nghiêm ngặt dựa trên vai trò (Admin/Staff/User), đảm bảo an toàn dữ liệu khách hàng.

##  Đóng góp

- Tuân thủ chuẩn **PEP 8** cho Backend (Python).
- Sử dụng **TypeScript Strict Mode** cho Frontend.
- Đảm bảo UI/UX đồng nhất với ngôn ngữ thiết kế chung của hệ thống.

---
