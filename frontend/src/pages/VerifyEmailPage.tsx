import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Mail, RefreshCw, ArrowLeft } from "lucide-react";

interface VerifyEmailPageProps {
  onBack: () => void;
  onLogin: () => void;
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = ({
  onBack,
  onLogin,
}) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      verifyEmail(token);
    } else {
      setStatus("error");
      setMessage("Token xác nhận không hợp lệ");
    }
  }, []);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/verify-email?token=${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail(data.data.email);

        // Thêm delay để tránh multiple requests
        setTimeout(() => {
          // Redirect logic can be added here if needed
        }, 2000);
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch (error) {
      setStatus("error");
      setMessage("Có lỗi xảy ra khi xác nhận email. Vui lòng thử lại sau.");
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setMessage("Vui lòng nhập email để gửi lại email xác nhận");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/users/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra khi gửi lại email xác nhận");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </motion.button>

          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Xác nhận Email
          </h1>
          <p className="text-gray-600">
            {status === "loading" && "Đang xác nhận email của bạn..."}
            {status === "success" && "Hoàn tất quá trình đăng ký"}
            {status === "error" && "Có lỗi xảy ra"}
          </p>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-6"
        >
          {status === "loading" && (
            <div className="text-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600">Đang xử lý...</p>
            </div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Xác nhận thành công!
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>

              <motion.button
                onClick={onLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Đăng nhập ngay
              </motion.button>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Xác nhận thất bại
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>

              {/* Resend verification form */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email của bạn
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email để gửi lại xác nhận"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>

                <motion.button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  whileHover={{ scale: isResending ? 1 : 1.02 }}
                  whileTap={{ scale: isResending ? 1 : 0.98 }}
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Gửi lại email xác nhận
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={onBack}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Quay lại trang đăng ký
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Cần hỗ trợ? Liên hệ{" "}
            <a
              href="mailto:crmanalytics@crmanalytics.vn"
              className="text-blue-600 hover:underline"
            >
              crmanalytics@crmanalytics.vn
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyEmailPage;
