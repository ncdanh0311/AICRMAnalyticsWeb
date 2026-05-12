import { motion } from "framer-motion";
import {
  MessageCircle,
  Clock,
  Mail,
  Phone,
  Send,
  HelpCircle,
  CheckCircle,
  Star,
  Shield,
  Award,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { PageType } from "../types";

interface ContactPageProps {
  setCurrentPage: (page: PageType) => void;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage = ({ setCurrentPage }: ContactPageProps) => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Vui lòng nhập họ tên");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Vui lòng nhập email");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Email không hợp lệ");
      return false;
    }
    if (!formData.subject.trim()) {
      setError("Vui lòng nhập tiêu đề");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Vui lòng nhập nội dung tin nhắn");
      return false;
    }
    if (formData.message.length < 10) {
      setError("Nội dung tin nhắn phải có ít nhất 10 ký tự");
      return false;
    }
    return true;
  };

  const sendEmailViaWebhook = async (formData: ContactForm) => {
    // Option 1: Gửi qua webhook (Formspree, Netlify Forms, hoặc custom webhook)
    const webhookUrl = "https://formspree.io/f/xyzppnwj"; // Form ID: xyzppnwj

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        _subject: `Liên hệ từ ${formData.name} - ${formData.subject}`,
      }),
    });

    if (!response.ok) {
      throw new Error("Không thể gửi tin nhắn. Vui lòng thử lại sau.");
    }

    return response.json();
  };

  const sendEmailViaEmailJS = async (formData: ContactForm) => {
    // Option 2: Gửi qua EmailJS (cần setup EmailJS trước)
    // import emailjs from '@emailjs/browser';

    // const templateParams = {
    //   from_name: formData.name,
    //   from_email: formData.email,
    //   from_phone: formData.phone,
    //   subject: formData.subject,
    //   message: formData.message,
    //   to_name: "CRM Analytics",
    // };

    // return emailjs.send(
    //   'YOUR_SERVICE_ID',
    //   'YOUR_TEMPLATE_ID',
    //   templateParams,
    //   'YOUR_PUBLIC_KEY'
    // );

    // Tạm thời return simulation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { success: true };
  };

  const sendEmailViaCustomAPI = async (formData: ContactForm) => {
    // Option 3: Gửi qua API backend tự tạo
    const apiUrl = "https://your-backend-api.com/api/contact"; // Thay bằng URL API thực

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer YOUR_API_KEY", // Nếu cần
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString(),
        source: "website_contact_form",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không thể gửi tin nhắn");
    }

    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Chọn một trong các phương thức gửi email dưới đây:

      // 1. Gửi qua webhook (Formspree - dễ setup nhất)
      await sendEmailViaWebhook(formData);

      // 2. Hoặc gửi qua EmailJS
      // await sendEmailViaEmailJS(formData);

      // 3. Hoặc gửi qua API backend tự tạo
      // await sendEmailViaCustomAPI(formData);

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra. Vui lòng thử lại sau."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "Làm thế nào để mua sản phẩm?",
      answer:
        "Đầu tiên nạp tiền vào ví, sau đó chọn sản phẩm và thanh toán bằng số dư ví. Thông tin sản phẩm sẽ hiển thị trong đơn hàng.",
    },
    {
      question: "Thời gian giao hàng là bao lâu?",
      answer:
        "Đối với sản phẩm số (license, tài khoản), thông tin sẽ hiển thị ngay trong đơn hàng sau khi thanh toán thành công.",
    },
    {
      question: "Có chính sách hoàn tiền không?",
      answer:
        "Có, chúng tôi có chính sách hoàn tiền trong vòng 7 ngày nếu sản phẩm có lỗi từ nhà cung cấp. Tiền sẽ được hoàn vào ví.",
    },
    {
      question: "Làm sao để liên hệ hỗ trợ?",
      answer:
        "Bạn có thể liên hệ qua email, điện thoại hoặc gửi tin nhắn qua form liên hệ. Đội ngũ hỗ trợ sẽ trực tiếp hỗ trợ bạn.",
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-start">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              {/* Zalo Channel */}
              <motion.div
                className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <MessageCircle className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Kênh Zalo Chính Thức</h3>
                </div>
                <p className="text-green-100 mb-6">
                  Tham gia kênh Zalo để nhận thông báo
                </p>
                <p className="text-green-100 mb-6">
                  Hỗ trợ nhanh chóng và ưu đãi độc quyền
                </p>
                <motion.a
                  href="https://zalo.me/g/hpfdju760"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Tham gia kênh Zalo
                </motion.a>
              </motion.div>

              {/* Support Hours */}
              <motion.div
                className="bg-gray-50 rounded-2xl p-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    Giờ hỗ trợ
                  </h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p className="text-lg font-semibold">
                    24/7 - Hỗ trợ trực tuyến
                  </p>
                  <p>Phản hồi trong vòng 2-4 giờ</p>
                </div>
              </motion.div>

              {/* Contact Methods */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  Thông tin liên hệ
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <p className="text-gray-600">
                        crmanalytics@crmanalytics.vn
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Điện thoại</p>
                      <p className="text-gray-600">0343 071 157</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="sticky top-8"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Gửi tin nhắn cho chúng tôi
                  </h2>
                  <p className="text-gray-600">
                    Điền thông tin vào form bên dưới và chúng tôi sẽ phản hồi
                    trong vòng 24 giờ.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-600 mb-2">
                      Gửi tin nhắn thành công!
                    </h3>
                    <p className="text-gray-600">
                      Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có
                      thể.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Message */}
                    {error && (
                      <motion.div
                        className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700 text-sm">{error}</p>
                      </motion.div>
                    )}

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Họ tên *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                        placeholder="Nhập họ tên của bạn"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                        placeholder="Nhập email của bạn"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Số điện thoại
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Tiêu đề *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                        placeholder="Nhập tiêu đề tin nhắn"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Tin nhắn *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 resize-none"
                        placeholder="Nhập nội dung tin nhắn của bạn (tối thiểu 10 ký tự)"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.message.length}/1000 ký tự
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-300"
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Gửi tin nhắn
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Câu hỏi thường gặp
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những câu hỏi phổ biến từ khách hàng
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-4">
              Không tìm thấy câu trả lời bạn cần?
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Liên hệ với chúng tôi
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-green-200 transition-all duration-300">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-green-600 transition-colors duration-300">
                SSL Secure
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Bảo mật thông tin tuyệt đối
              </p>
            </motion.div>

            <motion.div
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-blue-200 transition-all duration-300">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Verified Store
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Cửa hàng đã được xác minh
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
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-yellow-200 transition-all duration-300">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                5 Star Rating
              </h4>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                Đánh giá 5 sao từ khách hàng
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
