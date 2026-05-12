import { PageType } from "../../types";
import { MessageCircle } from "lucide-react";


interface FooterProps {
  setCurrentPage: (page: PageType) => void;
}

const Footer = ({ setCurrentPage }: FooterProps) => {
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
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/images/brand/logo.png"
                alt="Store Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <h3 className="text-xl font-bold">Store</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Cửa hàng bán tài khoản uy tín với hệ thống ví điện tử hiện đại.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handlePageChange("home")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageChange("products")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sản phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageChange("about")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Về chúng tôi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageChange("contact")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Liên hệ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handlePageChange("faq")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ - Câu hỏi thường gặp
                </button>
              </li>

              <li>
                <button
                  onClick={() => handlePageChange("terms")}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 transform"
                >
                  Điều khoản sử dụng
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageChange("privacy")}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 transform"
                >
                  Chính sách bảo mật
                </button>
              </li>
              <li>
                <button
                  onClick={() => handlePageChange("refund")}
                  className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 transform"
                >
                  Chính sách hoàn tiền
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kênh chính thức</h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Kênh Zalo chính thức</h5>
                <p className="text-gray-300 text-sm mb-3">
                  Nhận thông báo và ưu đãi độc quyền
                </p>
                <a
                  href="https://zalo.me/g/hpfdju760"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 text-sm inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Tham gia kênh Zalo
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Store. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-gray-400 mt-2">
            Thiết kế và phát triển bởi Store Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
