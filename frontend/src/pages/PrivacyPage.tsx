import { PageType } from "../types";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  UserCheck,
  Eye,
  Database,
  AlertCircle,
} from "lucide-react";

interface PrivacyPageProps {
  setCurrentPage: (page: PageType) => void;
}

const PrivacyPage = ({ setCurrentPage }: PrivacyPageProps) => {
  const handlePageChange = (page: PageType) => {
    // Change page immediately
    setCurrentPage(page);

    // Then scroll to top after a small delay
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Chính sách bảo mật
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Cam kết bảo vệ quyền riêng tư và thông tin cá nhân của bạn
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-lg">Cập nhật lần cuối: 29/7/2025</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Principles Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nguyên tắc bảo mật của chúng tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi xây dựng mọi hoạt động dựa trên các nguyên tắc bảo mật
              cốt lõi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Minh bạch
              </h3>
              <p className="text-gray-600">
                Chúng tôi luôn rõ ràng về cách thu thập và sử dụng dữ liệu
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Bảo mật
              </h3>
              <p className="text-gray-600">
                Áp dụng các biện pháp bảo mật tiên tiến nhất
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Kiểm soát
              </h3>
              <p className="text-gray-600">
                Bạn có toàn quyền kiểm soát thông tin cá nhân của mình
              </p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Mục đích rõ ràng
              </h3>
              <p className="text-gray-600">
                Chỉ sử dụng dữ liệu cho mục đích đã thông báo
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Table of Contents */}
      <motion.section
        className="py-12 bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Nội dung chính sách
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="#overview"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 hover:text-blue-600">
                1. Tổng quan
              </span>
            </a>
            <a
              href="#collection"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 hover:text-blue-600">
                2. Thông tin chúng tôi thu thập
              </span>
            </a>
            <a
              href="#usage"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 hover:text-blue-600">
                3. Cách chúng tôi sử dụng thông tin
              </span>
            </a>
            <a
              href="#sharing"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 hover:text-blue-600">
                4. Chia sẻ thông tin
              </span>
            </a>
            <a
              href="#security"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Lock className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 hover:text-blue-600">
                5. Bảo mật thông tin
              </span>
            </a>
            <a
              href="#cookies"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 hover:text-blue-600">
                6. Cookie và công nghệ theo dõi
              </span>
            </a>
            <a
              href="#rights"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <UserCheck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 hover:text-blue-600">
                7. Quyền của bạn
              </span>
            </a>
            <a
              href="#retention"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 hover:text-blue-600">
                8. Thời gian lưu trữ
              </span>
            </a>
            <a
              href="#children"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 hover:text-blue-600">
                9. Bảo vệ trẻ em
              </span>
            </a>
            <a
              href="#changes"
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-gray-900 hover:text-blue-600">
                10. Thay đổi chính sách
              </span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <motion.section
        className="py-12 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* Overview */}
            <div id="overview" className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                1. Tổng quan
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  CRM Analytics cam kết bảo vệ quyền riêng tư và thông tin cá
                  nhân của khách hàng. Chính sách này mô tả cách chúng tôi thu
                  thập, sử dụng, lưu trữ và bảo vệ thông tin của bạn khi sử dụng
                  dịch vụ của chúng tôi.
                </p>
              </div>
            </div>

            {/* Collection */}
            <div id="collection" className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                2. Thông tin chúng tôi thu thập
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Chúng tôi thu thập các loại thông tin sau:
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Thông tin cá nhân:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Họ tên, email, số điện thoại</li>
                  <li>Địa chỉ giao hàng (nếu có)</li>
                  <li>Thông tin thanh toán (được mã hóa)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Thông tin kỹ thuật:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Địa chỉ IP, loại trình duyệt</li>
                  <li>Thời gian truy cập, trang đã xem</li>
                  <li>Cookie và dữ liệu phiên làm việc</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Thông tin giao dịch:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Lịch sử nạp tiền và mua hàng</li>
                  <li>Số dư ví điện tử</li>
                  <li>Thông tin đơn hàng và sản phẩm</li>
                </ul>
              </div>
            </div>

            {/* Usage */}
            <div id="usage" className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                3. Cách chúng tôi sử dụng thông tin
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Thông tin của bạn được sử dụng để:
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Cung cấp dịch vụ:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Quản lý ví điện tử và giao dịch</li>
                  <li>Xử lý đơn hàng và cung cấp sản phẩm số</li>
                  <li>Hỗ trợ khách hàng</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Cải thiện dịch vụ:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Phân tích hành vi người dùng</li>
                  <li>Tối ưu hóa website</li>
                  <li>Phát triển tính năng mới</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Liên lạc:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Gửi xác nhận đơn hàng</li>
                  <li>Thông báo cập nhật dịch vụ</li>
                  <li>Marketing (chỉ khi có đồng ý)</li>
                </ul>
              </div>
            </div>

            {/* Sharing */}
            <div id="sharing" className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                4. Chia sẻ thông tin
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân
                  với bên thứ ba, trừ các trường hợp:
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Đối tác dịch vụ:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Nhà cung cấp thanh toán (được mã hóa)</li>
                  <li>Dịch vụ email và SMS</li>
                  <li>Nhà cung cấp hosting</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Yêu cầu pháp lý:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Tuân thủ pháp luật Việt Nam</li>
                  <li>Bảo vệ quyền lợi hợp pháp</li>
                  <li>Phòng chống gian lận</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Với sự đồng ý:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Khi bạn cho phép rõ ràng</li>
                  <li>Tham gia chương trình khuyến mãi</li>
                </ul>
              </div>
            </div>

            {/* Security */}
            <div id="security" className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                5. Bảo mật thông tin
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Chúng tôi áp dụng các biện pháp bảo mật:
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Bảo mật kỹ thuật:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Mã hóa SSL/TLS cho tất cả giao dịch</li>
                  <li>Firewall và hệ thống phát hiện xâm nhập</li>
                  <li>Sao lưu dữ liệu định kỳ</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Bảo mật vật lý:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Máy chủ đặt tại trung tâm dữ liệu an toàn</li>
                  <li>Kiểm soát truy cập nghiêm ngặt</li>
                  <li>Giám sát 24/7</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Bảo mật quản lý:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Đào tạo nhân viên về bảo mật</li>
                  <li>Chính sách truy cập dữ liệu</li>
                  <li>Kiểm tra bảo mật định kỳ</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div id="cookies" className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                6. Cookie và công nghệ theo dõi
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Chúng tôi sử dụng cookie để:
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Cookie cần thiết:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Duy trì phiên đăng nhập</li>
                  <li>Lưu giỏ hàng</li>
                  <li>Bảo mật website</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Cookie phân tích:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Theo dõi lưu lượng truy cập</li>
                  <li>Hiểu hành vi người dùng</li>
                  <li>Cải thiện hiệu suất</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Cookie marketing:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Hiển thị quảng cáo phù hợp</li>
                  <li>Theo dõi hiệu quả chiến dịch</li>
                  <li>Cá nhân hóa trải nghiệm</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bạn có thể quản lý cookie qua cài đặt trình duyệt.
                </p>
              </div>
            </div>

            {/* Rights */}
            <div id="rights" className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                7. Quyền của bạn
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bạn có các quyền sau đối với thông tin cá nhân:
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Quyền truy cập:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Xem thông tin chúng tôi lưu trữ</li>
                  <li>Yêu cầu bản sao dữ liệu</li>
                  <li>Kiểm tra tính chính xác</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Quyền chỉnh sửa:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Cập nhật thông tin cá nhân</li>
                  <li>Sửa đổi thông tin không chính xác</li>
                  <li>Bổ sung thông tin thiếu</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Quyền xóa:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Yêu cầu xóa tài khoản</li>
                  <li>Xóa dữ liệu không cần thiết</li>
                  <li>Rút lại sự đồng ý</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Quyền hạn chế:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Giới hạn việc xử lý dữ liệu</li>
                  <li>Từ chối marketing</li>
                  <li>Khiếu nại vi phạm</li>
                </ul>
              </div>
            </div>

            {/* Retention */}
            <div id="retention" className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                8. Thời gian lưu trữ
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Chúng tôi lưu trữ thông tin trong các khoảng thời gian:
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Thông tin tài khoản:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Trong suốt thời gian tài khoản hoạt động</li>
                  <li>2 năm sau khi tài khoản bị xóa</li>
                  <li>Hoặc theo yêu cầu pháp luật</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Thông tin giao dịch:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>5 năm để tuân thủ quy định kế toán</li>
                  <li>Phục vụ giải quyết tranh chấp</li>
                  <li>Bảo vệ quyền lợi khách hàng</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                  Dữ liệu kỹ thuật:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>12 tháng cho log truy cập</li>
                  <li>6 tháng cho dữ liệu phân tích</li>
                  <li>Xóa tự động khi hết hạn</li>
                </ul>
              </div>
            </div>

            {/* Children */}
            <div id="children" className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                9. Bảo vệ trẻ em
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Chúng tôi không cố ý thu thập thông tin từ trẻ em dưới 16
                  tuổi. Nếu phát hiện việc thu thập không đúng, chúng tôi sẽ xóa
                  thông tin ngay lập tức. Phụ huynh có thể liên hệ để kiểm tra
                  và yêu cầu xóa thông tin của con em mình.
                </p>
              </div>
            </div>

            {/* Changes */}
            <div id="changes" className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
                10. Thay đổi chính sách
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Chúng tôi có thể cập nhật chính sách này để phản ánh:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Thay đổi trong dịch vụ</li>
                  <li>Yêu cầu pháp lý mới</li>
                  <li>Cải thiện bảo mật</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Mọi thay đổi quan trọng sẽ được thông báo qua:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-4 list-disc list-inside space-y-1">
                  <li>Email đến khách hàng đã đăng ký</li>
                  <li>Thông báo trên website</li>
                  <li>Popup khi đăng nhập</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Việc tiếp tục sử dụng dịch vụ đồng nghĩa với việc chấp nhận
                  chính sách mới.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Commitment Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cam kết bảo vệ dữ liệu</h2>
            <p className="text-xl">
              Chúng tôi áp dụng các tiêu chuẩn bảo mật cao nhất
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mã hóa SSL</h3>
              <p>Tất cả dữ liệu được mã hóa trong quá trình truyền tải</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tuân thủ pháp luật</h3>
              <p>Đáp ứng đầy đủ các quy định về bảo vệ dữ liệu cá nhân</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sao lưu an toàn</h3>
              <p>Dữ liệu được sao lưu định kỳ và bảo vệ khỏi mất mát</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Có câu hỏi về quyền riêng tư?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Liên hệ với chúng tôi để được hỗ trợ về các vấn đề bảo mật và quyền
            riêng tư
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handlePageChange("contact")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Liên hệ với chúng tôi
            </button>
            <a
              href="mailto:privacy@tuananhstore.com"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Email bảo mật
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PrivacyPage;
