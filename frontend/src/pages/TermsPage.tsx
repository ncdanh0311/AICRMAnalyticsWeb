import { PageType } from "../types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Shield,
  FileText,
  UserCheck,
  CreditCard,
  AlertTriangle,
  Copyright,
  Lock,
  Scale,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";

interface TermsPageProps {
  setCurrentPage: (page: PageType) => void;
}

const TermsPage = ({ setCurrentPage }: TermsPageProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [clickedItem, setClickedItem] = useState<string | null>(null);

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

  // Smooth scroll to section with offset
  const scrollToSection = (sectionId: string) => {
    // Set clicked item for visual feedback
    setClickedItem(sectionId);
    setTimeout(() => setClickedItem(null), 300);

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120; // Increased offset for better positioning
      const elementPosition = element.offsetTop - offset;

      // Use custom smooth scrolling with better easing
      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      const duration = 1200; // Increased duration for smoother animation
      let start: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "acceptance",
        "services",
        "accounts",
        "payment",
        "usage",
        "intellectual",
        "liability",
        "security",
        "changes",
        "contact",
      ];

      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tableOfContents = [
    { id: "acceptance", title: "Chấp nhận điều khoản", number: 1 },
    { id: "services", title: "Dịch vụ cung cấp", number: 2 },
    { id: "accounts", title: "Tài khoản người dùng", number: 3 },
    { id: "payment", title: "Ví điện tử và thanh toán", number: 4 },
    { id: "usage", title: "Quy định sử dụng", number: 5 },
    { id: "intellectual", title: "Quyền sở hữu trí tuệ", number: 6 },
    { id: "liability", title: "Giới hạn trách nhiệm", number: 7 },
    { id: "security", title: "Bảo mật thông tin", number: 8 },
    { id: "changes", title: "Thay đổi điều khoản", number: 9 },
    { id: "contact", title: "Thông tin liên hệ", number: 10 },
  ];

  // Helper function to get section className with active state
  const getSectionClassName = (sectionId: string) => {
    return `bg-white rounded-2xl p-10 mb-10 shadow-xl border transition-all duration-500 ${
      activeSection === sectionId
        ? "border-blue-300 shadow-2xl bg-blue-50/30"
        : "border-gray-100 hover:shadow-2xl"
    }`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-24 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
                <FileText className="w-10 h-10" />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Điều khoản sử dụng
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Các điều khoản và điều kiện sử dụng dịch vụ của CRM Analytics
            </motion.p>

            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-lg font-medium">
                Cập nhật lần cuối: 29/7/2025
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Important Notice */}
      <motion.section
        className="py-20 bg-gradient-to-r from-yellow-50 to-orange-50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-10 shadow-xl border-l-4 border-yellow-500 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Thông báo quan trọng
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Vui lòng đọc kỹ các điều khoản này trước khi sử dụng dịch vụ.
                  Việc sử dụng website đồng nghĩa với việc bạn đã đọc, hiểu và
                  đồng ý với tất cả các điều khoản được nêu dưới đây.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Table of Contents */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Mục lục</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chọn mục bạn muốn đọc để di chuyển nhanh đến phần đó
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tableOfContents.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg overflow-hidden ${
                  activeSection === item.id
                    ? "border-blue-500 bg-blue-50 shadow-lg"
                    : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1 },
                }}
              >
                {/* Ripple effect */}
                {clickedItem === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-blue-200 rounded-2xl"
                    initial={{ scale: 0, opacity: 0.7 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mr-4 transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-600 group-hover:bg-blue-500 group-hover:text-white"
                    }`}
                  >
                    {item.number}
                  </div>
                  <div className="flex-1 text-left">
                    <span
                      className={`font-semibold transition-colors duration-300 ${
                        activeSection === item.id
                          ? "text-blue-600"
                          : "text-gray-700 group-hover:text-blue-600"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-blue-500 transform translate-x-1"
                        : "text-gray-400 group-hover:text-blue-500 group-hover:transform group-hover:translate-x-1"
                    }`}
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <motion.section
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section 1 */}
          <motion.div
            id="acceptance"
            className={`bg-white rounded-2xl p-10 mb-10 shadow-xl border transition-all duration-500 ${
              activeSection === "acceptance"
                ? "border-blue-300 shadow-2xl bg-blue-50/30"
                : "border-gray-100 hover:shadow-2xl"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Chấp nhận điều khoản
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Bằng việc truy cập và sử dụng website CRM Analytics, bạn đồng ý
              tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sử dụng
              này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản
              này, vui lòng không sử dụng dịch vụ của chúng tôi.
            </p>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            id="services"
            className={getSectionClassName("services")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Dịch vụ cung cấp
              </h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              CRM Analytics cung cấp dịch vụ bán các sản phẩm số bao gồm:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start p-4 bg-green-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Công cụ AI</span>
              </div>
              <div className="flex items-start p-4 bg-blue-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Tool</span>
              </div>
              <div className="flex items-start p-4 bg-purple-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700 font-medium">Tài nguyên số</span>
              </div>
            </div>
            <p className="text-gray-700 mt-6 text-lg font-medium">
              Tất cả sản phẩm được bán đều là hàng chính hãng và có nguồn gốc rõ
              ràng.
            </p>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            id="accounts"
            className={getSectionClassName("accounts")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Tài khoản người dùng
              </h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              Khi đăng ký tài khoản, bạn cam kết:
            </p>
            <div className="space-y-4">
              {[
                "Cung cấp thông tin chính xác và đầy đủ",
                "Bảo mật thông tin đăng nhập của mình",
                "Chịu trách nhiệm cho mọi hoạt động dưới tài khoản của bạn",
                "Thông báo ngay cho chúng tôi nếu phát hiện việc sử dụng trái phép tài khoản",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-purple-50 rounded-xl"
                >
                  <CheckCircle className="w-6 h-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-700 mt-6 text-lg font-medium">
              Chúng tôi có quyền đình chỉ hoặc xóa tài khoản vi phạm điều khoản.
            </p>
          </motion.div>

          {/* Section 4 */}
          <motion.div
            id="payment"
            className={getSectionClassName("payment")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Ví điện tử và thanh toán
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-yellow-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 text-yellow-600 mr-2" />
                  Hệ thống ví điện tử:
                </h3>
                <div className="space-y-3">
                  {[
                    "Người dùng cần nạp tiền vào ví trước khi mua sản phẩm",
                    "Hỗ trợ nạp tiền qua chuyển khoản ngân hàng, VietQR, ví điện tử",
                    "Số dư ví không có hạn sử dụng",
                    "Mọi giao dịch mua hàng được thực hiện bằng số dư trong ví",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 text-orange-600 mr-2" />
                  Chính sách hoàn tiền:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      Hoàn tiền vào ví trong vòng 7 ngày nếu sản phẩm lỗi từ nhà
                      cung cấp
                    </span>
                  </div>
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      Không hoàn tiền cho các sản phẩm đã sử dụng hoặc kích hoạt
                    </span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      Quyết định hoàn tiền cuối cùng thuộc về CRM Analytics
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 5 */}
          <motion.div
            id="usage"
            className={getSectionClassName("usage")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">5</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Quy định sử dụng
              </h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">Người dùng không được:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Sử dụng dịch vụ cho mục đích bất hợp pháp",
                "Chia sẻ, bán lại sản phẩm đã mua mà không có sự đồng ý",
                "Tấn công, hack hoặc làm gián đoạn hệ thống",
                "Đăng tải nội dung vi phạm pháp luật hoặc có hại",
                "Sử dụng bot hoặc công cụ tự động để truy cập website",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-red-50 rounded-xl"
                >
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 6 */}
          <motion.div
            id="intellectual"
            className={getSectionClassName("intellectual")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">6</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Quyền sở hữu trí tuệ
              </h2>
            </div>
            <div className="bg-indigo-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                Tất cả nội dung trên website bao gồm văn bản, hình ảnh, logo,
                thiết kế đều thuộc quyền sở hữu của CRM Analytics hoặc các đối
                tác được ủy quyền. Việc sao chép, phân phối mà không có sự cho
                phép là bị nghiêm cấm.
              </p>
            </div>
          </motion.div>

          {/* Section 7 */}
          <motion.div
            id="liability"
            className={getSectionClassName("liability")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">7</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Giới hạn trách nhiệm
              </h2>
            </div>
            <p className="text-gray-700 mb-6 text-lg">
              CRM Analytics không chịu trách nhiệm cho:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả",
                "Mất mát dữ liệu hoặc lợi nhuận",
                "Gián đoạn dịch vụ do sự cố kỹ thuật",
                "Hành vi của bên thứ ba",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-50 rounded-xl"
                >
                  <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-700 mt-6 text-lg font-medium">
              Trách nhiệm tối đa của chúng tôi không vượt quá giá trị đơn hàng.
            </p>
          </motion.div>

          {/* Section 8 */}
          <motion.div
            id="security"
            className={getSectionClassName("security")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">8</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Bảo mật thông tin
              </h2>
            </div>
            <div className="bg-teal-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                Chúng tôi cam kết bảo vệ thông tin cá nhân của khách hàng theo
                chính sách bảo mật. Thông tin chỉ được sử dụng cho mục đích cung
                cấp dịch vụ và không chia sẻ với bên thứ ba mà không có sự đồng
                ý.
              </p>
            </div>
          </motion.div>

          {/* Section 9 */}
          <motion.div
            id="changes"
            className={getSectionClassName("changes")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">9</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Thay đổi điều khoản
              </h2>
            </div>
            <div className="bg-pink-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                CRM Analytics có quyền cập nhật và thay đổi các điều khoản này
                bất cứ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng
                tải trên website. Việc tiếp tục sử dụng dịch vụ sau khi có thay
                đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
              </p>
            </div>
          </motion.div>

          {/* Section 10 */}
          <motion.div
            id="contact"
            className={getSectionClassName("contact")}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6">
                <span className="text-2xl font-bold text-white">10</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Thông tin liên hệ
              </h2>
            </div>
            <p className="text-gray-700 mb-8 text-lg">
              Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, vui lòng liên
              hệ:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-700">legal@crmanalytics.vn</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Điện thoại</h3>
                <p className="text-gray-700">0343071157</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ</h3>
                <p className="text-gray-700">123 Đường ABC, Quận XYZ, TP.HCM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Key Points */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Những điểm quan trọng cần nhớ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tóm tắt những điểm chính trong điều khoản sử dụng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Sản phẩm chính hãng",
                description:
                  "Tất cả sản phẩm đều là hàng chính hãng với nguồn gốc rõ ràng",
                color: "green",
              },
              {
                icon: Lock,
                title: "Bảo mật thông tin",
                description:
                  "Thông tin cá nhân được bảo vệ theo tiêu chuẩn cao nhất",
                color: "blue",
              },
              {
                icon: CreditCard,
                title: "Chính sách hoàn tiền",
                description:
                  "Hoàn tiền trong 7 ngày nếu sản phẩm lỗi từ nhà cung cấp",
                color: "yellow",
              },
              {
                icon: Scale,
                title: "Trách nhiệm người dùng",
                description:
                  "Sử dụng dịch vụ đúng mục đích và tuân thủ pháp luật",
                color: "purple",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
              >
                <div
                  className={`w-20 h-20 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className={`w-10 h-10 text-${item.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.8 }}
      >
        <div className="absolute inset-0 bg-black/10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Có câu hỏi về điều khoản?</h2>
          <p className="text-xl mb-10 text-blue-100">
            Đội ngũ pháp lý của chúng tôi sẵn sàng giải đáp mọi thắc mắc
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              onClick={() => handlePageChange("contact")}
              className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Liên hệ với chúng tôi
            </motion.button>
            <motion.a
              href="mailto:legal@crmanalytics.vn"
              className="border-2 border-white text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Email pháp lý
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default TermsPage;
