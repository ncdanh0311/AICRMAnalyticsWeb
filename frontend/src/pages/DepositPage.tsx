import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  DollarSign,
  Plus,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Shield,
  Banknote,
  Smartphone,
} from "lucide-react";

interface DepositPageProps {
  handlePageChange: (page: string) => void;
  user: any;
  onWalletUpdate?: (amount: number) => void;
  defaultAmount?: number;
}

const DepositPage: React.FC<DepositPageProps> = ({
  handlePageChange,
  user,
  onWalletUpdate,
  defaultAmount,
}) => {
  const [amount, setAmount] = useState(
    defaultAmount ? defaultAmount.toString() : ""
  );
  const [selectedMethod, setSelectedMethod] = useState("momo");
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: "momo",
      name: "MoMo",
      icon: <Smartphone className="w-6 h-6 text-pink-500" />,
      description: "Nạp nhanh qua ví MoMo",
      color: "pink",
      bgColor: "pink-50",
      borderColor: "pink-200",
    },
    {
      id: "bank",
      name: "Chuyển khoản ngân hàng",
      icon: <Banknote className="w-6 h-6 text-green-500" />,
      description: "Chuyển khoản qua ngân hàng",
      color: "green",
      bgColor: "green-50",
      borderColor: "green-200",
    },
  ];

  const presetAmounts = [
    { value: 50000, label: "50,000 ₫" },
    { value: 100000, label: "100,000 ₫" },
    { value: 200000, label: "200,000 ₫" },
    { value: 500000, label: "500,000 ₫" },
    { value: 1000000, label: "1,000,000 ₫" },
    { value: 2000000, label: "2,000,000 ₫" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleAmountChange = (value: string) => {
    // Chỉ cho phép nhập số
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };

  const handlePresetAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleDeposit = async () => {
    if (!amount || parseInt(amount) < 10000) {
      alert("Vui lòng nhập số tiền tối thiểu 10,000 ₫");
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Update wallet balance
      const depositAmount = parseInt(amount);
      onWalletUpdate?.(depositAmount);

      // Show success message and redirect to wallet
      alert(`Đã nạp thành công ${formatCurrency(depositAmount)} vào ví!`);
      handlePageChange("wallet");
    }, 2000);
  };

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Cần đăng nhập
              </h1>
              <p className="text-gray-600">Vui lòng đăng nhập để nạp tiền</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handlePageChange("login")}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                Đăng nhập
              </button>

              <button
                onClick={() => handlePageChange("register")}
                className="w-full border-2 border-blue-500 text-blue-500 py-3 px-6 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                Đăng ký
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Chưa có tài khoản?{" "}
                <button
                  onClick={() => handlePageChange("register")}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Đăng ký ngay
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => handlePageChange("wallet")}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại ví
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Nạp tiền vào ví
          </h1>
          <p className="text-gray-600">
            {defaultAmount
              ? `Số tiền còn thiếu: ${formatCurrency(defaultAmount)}`
              : "Chọn phương thức thanh toán và số tiền bạn muốn nạp"}
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Amount Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Chọn số tiền nạp
            </h2>

            {/* Preset Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {presetAmounts.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handlePresetAmount(preset.value)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    amount === preset.value.toString()
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="font-semibold">{preset.label}</div>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Hoặc nhập số tiền tùy chọn
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="Nhập số tiền (tối thiểu 10,000 ₫)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                {amount && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₫
                  </div>
                )}
              </div>
              {amount && parseInt(amount) < 10000 && (
                <p className="text-sm text-red-500">
                  Số tiền tối thiểu là 10,000 ₫
                </p>
              )}
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Chọn phương thức thanh toán
            </h2>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-4 ${
                    selectedMethod === method.id
                      ? `border-${method.borderColor} bg-${method.bgColor}`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex-shrink-0">{method.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">
                      {method.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {method.description}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {selectedMethod === method.id ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Deposit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={handleDeposit}
              disabled={!amount || parseInt(amount) < 10000 || isProcessing}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center ${
                !amount || parseInt(amount) < 10000 || isProcessing
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transform hover:scale-105"
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6 mr-2" />
                  Nạp {amount ? formatCurrency(parseInt(amount)) : "0 ₫"}
                </>
              )}
            </button>
          </motion.div>

          {/* Security Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Bảo mật giao dịch
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">SSL Secure</p>
                  <p className="text-sm text-gray-500">Mã hóa dữ liệu</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Verified Store</p>
                  <p className="text-sm text-gray-500">Cửa hàng uy tín</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DepositPage;
