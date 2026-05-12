import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Wallet, Plus, X } from "lucide-react";

interface InsufficientFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: () => void;
  currentBalance: number;
  requiredAmount: number;
  missingAmount: number;
}

const InsufficientFundsModal: React.FC<InsufficientFundsModalProps> = ({
  isOpen,
  onClose,
  onDeposit,
  currentBalance,
  requiredAmount,
  missingAmount,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Số dư không đủ
                  </h3>
                  <p className="text-sm text-gray-600">
                    Vui lòng nạp thêm tiền để tiếp tục
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Balance Information */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Số dư hiện tại:</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(currentBalance)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tổng thanh toán:</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(requiredAmount)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">
                      Cần nạp thêm:
                    </span>
                    <span className="font-bold text-red-600 text-lg">
                      {formatCurrency(missingAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                onClick={onDeposit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5" />
                Nạp tiền ngay
              </motion.button>

              <motion.button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Đóng
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-blue-800 mb-2">
                <Wallet className="w-4 h-4" />
                <span className="font-medium">Lưu ý</span>
              </div>
              <p className="text-xs text-blue-700">
                Sau khi nạp tiền, bạn có thể quay lại giỏ hàng để tiếp tục thanh
                toán.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InsufficientFundsModal;
