import { motion } from "framer-motion";
import {
  Users,
  Package,
  Calendar,
  Star,
  Shield,
  Award,
  HelpCircle,
  DollarSign,
  MessageCircle,
  Code,
  Globe,
  Bot,
} from "lucide-react";
import { PageType } from "../types";
import logo from "../assets/logo.jpg";

interface AboutPageProps {
  setCurrentPage: (page: PageType) => void;
}

const AboutPage = ({ setCurrentPage }: AboutPageProps) => {
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
  return (
    <main id="main-content" className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Về CRM Analytics
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
              Cửa hàng bán tài khoản license các phần mềm, game, ứng dụng uy tín
              với hệ thống ví điện tử tiện lợi
            </p>
            <div className="bg-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-4xl mx-auto">
              <p className="text-lg text-blue-100">
                Cam kết mang đến trải nghiệm mua sắm an toàn với hệ thống ví
                điện tử, sản phẩm chất lượng cao và thông tin bảo hành rõ ràng
                trong mỗi đơn hàng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                1,000+
              </div>
              <div className="text-gray-600 font-medium">
                Khách hàng hài lòng
              </div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                500+
              </div>
              <div className="text-gray-600 font-medium">Sản phẩm đã bán</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                3+
              </div>
              <div className="text-gray-600 font-medium">Năm kinh nghiệm</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                98%
              </div>
              <div className="text-gray-600 font-medium">Đánh giá 5 sao</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Câu chuyện của chúng tôi
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="text-lg leading-relaxed mb-6">
                CRM Analytics được thành lập vào năm 2021 với mục tiêu mang đến
                cho người dùng Việt Nam những sản phẩm phần mềm, game và ứng
                dụng chính hãng với giá cả phải chăng.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Bắt đầu từ một cửa hàng nhỏ, chúng tôi đã không ngừng phát triển
                và hoàn thiện để trở thành một trong những địa chỉ tin cậy hàng
                đầu trong lĩnh vực bán license và tài khoản số.
              </p>
              <p className="text-lg leading-relaxed">
                Với đội ngũ nhân viên giàu kinh nghiệm và tận tâm, chúng tôi
                luôn đặt sự hài lòng của khách hàng lên hàng đầu và không ngừng
                cải thiện chất lượng dịch vụ.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Tầm nhìn của chúng tôi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Trở thành nền tảng hàng đầu Việt Nam trong việc cung cấp các sản
                phẩm số chất lượng cao, góp phần thúc đẩy việc sử dụng phần mềm
                chính hãng trong cộng đồng.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Sứ mệnh của chúng tôi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời với
                sản phẩm chất lượng, giá cả hợp lý và dịch vụ chăm sóc khách
                hàng xuất sắc.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Tại sao chọn CRM Analytics?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến cho bạn những giá trị tốt nhất
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-green-200 transition-all duration-300">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors duration-300">
                Code Web Chuyên Nghiệp
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Website hiện đại, responsive, SEO tối ưu với bảo mật cao
              </p>
            </motion.div>
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Bot Zalo Tự Động
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Bot tự động, tương tác thông minh, hỗ trợ khách hàng 24/7
              </p>
            </motion.div>
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-purple-200 transition-all duration-300">
                <HelpCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors duration-300">
                Tool MMO & License
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Tool tự động hóa, app premium, license chất lượng cao
              </p>
            </motion.div>
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-orange-200 transition-all duration-300">
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-300">
                Hỗ trợ 24/7
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Đội ngũ hỗ trợ khách hàng chuyên nghiệp, sẵn sàng giúp đỡ mọi
                lúc
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Giá trị cốt lõi
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-green-200 transition-all duration-300">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors duration-300">
                Tin cậy
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Xây dựng niềm tin với khách hàng thông qua sự minh bạch, chính
                trực và cam kết chất lượng.
              </p>
            </motion.div>
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Chất lượng
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Không ngừng nâng cao chất lượng sản phẩm và dịch vụ để mang lại
                giá trị tốt nhất cho khách hàng.
              </p>
            </motion.div>
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-purple-200 transition-all duration-300">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors duration-300">
                Khách hàng là trung tâm
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Đặt nhu cầu và sự hài lòng của khách hàng làm trọng tâm trong
                mọi hoạt động kinh doanh.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sẵn sàng nâng tầm doanh nghiệp?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              Hãy khám phá các giải pháp công nghệ chất lượng cao với giá cả hợp
              lý tại CRM Analytics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => handlePageChange("products")}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                Xem dịch vụ
              </motion.button>
              <motion.a
                href="https://zalo.me/g/hpfdju760"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-3"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  backgroundColor: "white",
                  color: "#2563eb",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <MessageCircle className="w-6 h-6" />
                Liên hệ với chúng tôi
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
