# 📸 Screenshots Directory

Thư mục này chứa các hình ảnh screenshot của ứng dụng CRM Analytics để sử dụng trong README.md.

## 📁 Cấu trúc thư mục

```
docs/screenshots/
├── homepage/              # Trang chủ
├── products/             # Trang sản phẩm
├── auth/                 # Đăng nhập/đăng ký
├── cart/                 # Giỏ hàng
├── wallet/               # Ví điện tử
├── admin/                # Dashboard admin
├── mobile/               # Giao diện mobile
└── README.md             # File này
```

## 🎯 Hướng dẫn chụp screenshot

### 1. Desktop Screenshots

- **Kích thước**: 1200x800 pixels
- **Format**: PNG hoặc JPG
- **Chất lượng**: High resolution
- **Browser**: Chrome/Firefox latest version

### 2. Mobile Screenshots

- **Kích thước**: 400x800 pixels (portrait)
- **Format**: PNG hoặc JPG
- **Device**: iPhone/Android simulator hoặc real device

### 3. Naming Convention

```
[page-name]-[device]-[version].png

Ví dụ:
- homepage-desktop-v1.png
- products-mobile-v1.png
- admin-dashboard-desktop-v1.png
```

## 📋 Checklist Screenshots cần chụp

### 🏠 Trang Chủ

- [ ] Banner và hero section
- [ ] Sản phẩm nổi bật
- [ ] Danh mục sản phẩm
- [ ] Footer

### 🛍️ Sản Phẩm

- [ ] Danh sách sản phẩm với filter
- [ ] Chi tiết sản phẩm
- [ ] Gallery ảnh sản phẩm
- [ ] Thông tin sản phẩm

### 🛒 Giỏ Hàng & Thanh Toán

- [ ] Giỏ hàng trống
- [ ] Giỏ hàng có sản phẩm
- [ ] Trang thanh toán
- [ ] Xác nhận đơn hàng

### 👤 Authentication

- [ ] Trang đăng nhập
- [ ] Trang đăng ký
- [ ] Xác thực email
- [ ] Đặt lại mật khẩu

### 💳 Ví Điện Tử

- [ ] Dashboard ví
- [ ] Lịch sử giao dịch
- [ ] Trang nạp tiền
- [ ] QR code nạp tiền

### 👨‍💼 Admin Dashboard

- [ ] Tổng quan admin
- [ ] Quản lý sản phẩm
- [ ] Quản lý đơn hàng
- [ ] Quản lý người dùng
- [ ] Thống kê hệ thống

### 📱 Mobile Views

- [ ] Trang chủ mobile
- [ ] Danh sách sản phẩm mobile
- [ ] Chi tiết sản phẩm mobile
- [ ] Giỏ hàng mobile
- [ ] Menu mobile

### 📄 Trang Thông Tin

- [ ] FAQ
- [ ] Liên hệ
- [ ] Giới thiệu
- [ ] Điều khoản
- [ ] Chính sách hoàn tiền

## 🛠️ Tools để chụp screenshot

### Desktop

- **Built-in**: Windows Snipping Tool, macOS Screenshot
- **Browser**: Chrome DevTools, Firefox Screenshot
- **Third-party**: Lightshot, Greenshot, Snagit

### Mobile

- **iOS**: Screenshot (Power + Volume Up)
- **Android**: Screenshot (Power + Volume Down)
- **Simulator**: iOS Simulator, Android Emulator

### Browser DevTools

```javascript
// Chrome DevTools Console
// Chụp full page screenshot
document.body.style.overflow = "hidden";
// Sau đó sử dụng DevTools screenshot
```

## 📝 Cập nhật README.md

Sau khi chụp screenshot, cập nhật README.md:

```markdown
![Homepage](./docs/screenshots/homepage/homepage-desktop-v1.png)
```

Thay vì:

```markdown
![Homepage](https://via.placeholder.com/1200x800/3B82F6/FFFFFF?text=Trang+Ch%E1%BB%A7)
```

## 🎨 Image Optimization

### Before Upload

- [ ] Crop và resize đúng kích thước
- [ ] Optimize file size (< 500KB)
- [ ] Check image quality
- [ ] Remove sensitive information

### Tools

- **Online**: TinyPNG, Compressor.io
- **Desktop**: ImageOptim, JPEGmini
- **Command line**: ImageMagick, Sharp

## 📋 Version Control

- Sử dụng Git LFS cho hình ảnh lớn
- Commit message: `docs: add screenshots for [page-name]`
- Tag versions khi có major UI changes

## 🔄 Maintenance

- **Monthly**: Review và update screenshots
- **After UI changes**: Chụp lại screenshots
- **Before releases**: Verify all screenshots current
- **Archive**: Giữ screenshots cũ cho reference

---

**Lưu ý**: Đảm bảo tất cả screenshots đều được chụp từ ứng dụng đang chạy và không chứa thông tin nhạy cảm.
