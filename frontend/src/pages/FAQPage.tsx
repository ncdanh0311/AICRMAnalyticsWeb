import { useState } from "react";
import { ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react";
import { PageType } from "../types";
import logo from "../assets/logo.jpg";

interface FAQPageProps {
  setCurrentPage: (page: PageType) => void;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "CRM Analytics có uy tín không?",
    answer: "CRM Analytics là cửa hàng bán tài khoản license uy tín với hơn 3 năm kinh nghiệm và hơn 1000+ khách hàng tin tưởng. Chúng tôi cam kết hoàn tiền 100% nếu sản phẩm không hoạt động như cam kết.",
    category: "Chung"
  },
  {
    id: 2,
    question: "Thời gian giao hàng là bao lâu?",
    answer: "Chúng tôi giao hàng tức thì sau khi thanh toán thành công. Bạn sẽ nhận được thông tin tài khoản ngay lập tức qua email hoặc tin nhắn.",
    category: "Giao hàng"
  },
  {
    id: 3,
    question: "Có thể hoàn tiền nếu không hài lòng không?",
    answer: "Có, chúng tôi cam kết hoàn tiền 100% trong vòng 24 giờ nếu tài khoản không hoạt động như cam kết. Liên hệ ngay với chúng tôi để được hỗ trợ.",
    category: "Hoàn tiền"
  },
  {
    id: 4,
    question: "Các phương thức thanh toán nào được chấp nhận?",
    answer: "Chúng tôi chấp nhận thanh toán qua ACB Bank và MoMo. Tất cả giao dịch đều được bảo mật SSL và xác minh an toàn.",
    category: "Thanh toán"
  },
  {
    id: 5,
    question: "Làm thế nào để liên hệ hỗ trợ?",
    answer: "Bạn có thể liên hệ chúng tôi qua kênh Zalo chính thức hoặc gọi điện trực tiếp. Đội ngũ hỗ trợ 24/7 sẵn sàng giúp đỡ bạn.",
    category: "Hỗ trợ"
  },
  {
    id: 6,
    question: "Tài khoản có bảo hành không?",
    answer: "Tất cả tài khoản đều có bảo hành theo thời gian sử dụng. Nếu có vấn đề, chúng tôi sẽ hỗ trợ thay thế hoặc hoàn tiền.",
    category: "Bảo hành"
  }
];

const FAQPage = ({ setCurrentPage }: FAQPageProps) => {
  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    // Smooth scroll to top after page change
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const categories = ["Tất cả", "Chung", "Giao hàng", "Hoàn tiền", "Thanh toán", "Hỗ trợ", "Bảo hành"];

  const toggleItem = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main id="main-content" className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src={logo} 
                alt="CRM Analytics Logo" 
                className="w-16 h-16 rounded-xl shadow-lg object-cover"
              />
              <h1 className="text-4xl md:text-6xl font-bold">
                CRM Analytics
              </h1>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Câu hỏi thường gặp (FAQ)
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Tìm câu trả lời cho những thắc mắc phổ biến
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm câu hỏi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Danh mục</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {category === "Tất cả" ? "📋 Tất cả" : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-600 mb-4">
                {filteredFAQs.length} câu hỏi được tìm thấy
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-medium text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      {expandedItems.includes(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedItems.includes(faq.id) && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    Không tìm thấy câu hỏi
                  </h3>
                  <p className="text-gray-500">
                    Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
                  </p>
                </div>
              )}
            </div>

            {/* Need Help Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Cần hỗ trợ thêm?
              </h3>
              <p className="text-gray-600 mb-6">
                Nếu bạn không tìm thấy câu trả lời mong muốn, hãy liên hệ với chúng tôi
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://zalo.me/g/hpfdju760"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Liên hệ hỗ trợ
                </a>
                <button
                  onClick={() => handlePageChange("home")}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300 font-medium"
                >
                  Về trang chủ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQPage; 