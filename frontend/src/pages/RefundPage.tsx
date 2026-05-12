import { PageType } from "../types";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  FileText,
  DollarSign,
  AlertCircle,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

interface RefundPageProps {
  setCurrentPage: (page: PageType) => void;
}

const RefundPage = ({ setCurrentPage }: RefundPageProps) => {
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
        className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Chính sách hoàn tiền
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Cam kết bảo vệ quyền lợi khách hàng với chính sách hoàn tiền minh
              bạch
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-4">
                <Clock className="w-6 h-6" />
                <p className="text-lg font-semibold">
                  Thời hạn hoàn tiền:{" "}
                  <span className="text-yellow-300">7 ngày</span> kể từ ngày mua
                  hàng
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Summary Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tóm tắt chính sách
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những điều quan trọng bạn cần biết về chính sách hoàn tiền
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Được hoàn tiền */}
            <div className="bg-green-50 rounded-lg p-8 border border-green-200">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold text-green-800">
                  Được hoàn tiền
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Sản phẩm lỗi từ nhà cung cấp
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    License key không hoạt động
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Tài khoản bị khóa do lỗi hệ thống
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Sản phẩm không đúng mô tả
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Lỗi kỹ thuật từ phía chúng tôi
                  </span>
                </li>
              </ul>
            </div>

            {/* Không được hoàn tiền */}
            <div className="bg-red-50 rounded-lg p-8 border border-red-200">
              <div className="flex items-center mb-6">
                <XCircle className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-2xl font-bold text-red-800">
                  Không được hoàn tiền
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Đã sử dụng hoặc kích hoạt sản phẩm
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Quá thời hạn 7 ngày</span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Thay đổi ý định mua hàng
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Không đọc kỹ mô tả sản phẩm
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Vi phạm điều khoản sử dụng
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section
        className="py-16 bg-gray-50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quy trình hoàn tiền
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              4 bước đơn giản để yêu cầu hoàn tiền
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gửi yêu cầu
              </h3>
              <p className="text-gray-600">
                Liên hệ với chúng tôi trong vòng 7 ngày kể từ ngày mua
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Xem xét yêu cầu
              </h3>
              <p className="text-gray-600">
                Chúng tôi sẽ kiểm tra và phản hồi trong vòng 24-48 giờ
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Xác nhận hoàn tiền
              </h3>
              <p className="text-gray-600">
                Nếu đủ điều kiện, chúng tôi sẽ xác nhận và xử lý hoàn tiền
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nhận tiền vào ví
              </h3>
              <p className="text-gray-600">
                Tiền sẽ được hoàn vào ví của bạn ngay lập tức sau khi được duyệt
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Product Types Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chính sách theo loại sản phẩm
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mỗi loại sản phẩm có điều kiện hoàn tiền riêng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  License phần mềm
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Hoàn tiền vào ví 100% nếu license không kích hoạt được trong
                vòng 7 ngày.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Thời hạn:</span>
                  <span className="font-semibold text-green-600">7 ngày</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Điều kiện:</span>
                  <span className="font-semibold text-blue-600">
                    Chưa kích hoạt
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Tài khoản game
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Hoàn tiền vào ví nếu tài khoản bị khóa do lỗi từ nhà cung cấp.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Thời hạn:</span>
                  <span className="font-semibold text-green-600">7 ngày</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Điều kiện:</span>
                  <span className="font-semibold text-blue-600">
                    Chưa thay đổi thông tin
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <Phone className="w-8 h-8 text-purple-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Ứng dụng mobile
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Hoàn tiền vào ví nếu ứng dụng không tương thích với thiết bị.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Thời hạn:</span>
                  <span className="font-semibold text-green-600">3 ngày</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Điều kiện:</span>
                  <span className="font-semibold text-blue-600">
                    Chưa tải xuống
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Dịch vụ đăng ký
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Hoàn tiền vào ví theo tỷ lệ thời gian chưa sử dụng.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Thời hạn:</span>
                  <span className="font-semibold text-green-600">30 ngày</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Điều kiện:</span>
                  <span className="font-semibold text-blue-600">
                    Hủy trước gia hạn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Important Notes Section */}
      <motion.section
        className="py-16 bg-yellow-50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lưu ý quan trọng
            </h2>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">
                  Yêu cầu hoàn tiền phải được gửi trong vòng 7 ngày kể từ ngày
                  mua hàng
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">
                  Sản phẩm đã được sử dụng hoặc kích hoạt sẽ không được hoàn
                  tiền
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">
                  Chúng tôi có quyền từ chối hoàn tiền nếu phát hiện gian lận
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">
                  Tiền hoàn sẽ được cộng vào ví của bạn, không hoàn về tài khoản
                  ngân hàng
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                <span className="text-gray-700">
                  Thông tin bảo hành chi tiết được ghi trong mỗi đơn hàng
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* How to Request Section */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cách yêu cầu hoàn tiền
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Thông tin cần chuẩn bị khi gửi yêu cầu hoàn tiền
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                Thông tin cần thiết:
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Thông tin đơn hàng:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Mã đơn hàng
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Ngày mua hàng
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Tên sản phẩm
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Số tiền thanh toán
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Lý do hoàn tiền:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Mô tả chi tiết vấn đề
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Ảnh chụp màn hình (nếu có)
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Thông tin lỗi (nếu có)
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Bằng chứng liên quan
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                Cần hỗ trợ hoàn tiền?
              </h3>
              <p className="text-gray-600 mb-6">
                Liên hệ với chúng tôi để được hỗ trợ nhanh chóng
              </p>

              <div className="space-y-4">
                <button
                  onClick={() => handlePageChange("contact")}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Gửi yêu cầu hoàn tiền
                </button>

                <a
                  href="mailto:crmanalytics@crmanalytics.vn"
                  className="w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email hoàn tiền
                </a>
              </div>

              <div className="mt-6 p-4 bg-white rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Thời gian phản hồi:</span>
                  <span className="font-semibold text-green-600">
                    24-48 giờ
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Hotline:</span>
                  <span className="font-semibold text-blue-600">
                    +84343071157
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default RefundPage;
