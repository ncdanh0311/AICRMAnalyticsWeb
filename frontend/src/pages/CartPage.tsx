import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Lock,
  User,
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
  AlertCircle,
  Wallet,
  Plus,
  X,
} from "lucide-react";
import { Product } from "../types";
import { getMainProductImage, handleImageError } from "../utils/imageUtils";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartPageProps {
  onBack: () => void;
  onLogin?: () => void;
  onNavigateToProducts?: () => void;
  user: any;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  walletBalance: number;
  onNavigateToDeposit: (missingAmount: number) => void;
  onSuccessfulPayment: (amount: number) => void;
}

// Insufficient Funds Modal Component
const InsufficientFundsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onDeposit: () => void;
  currentBalance: number;
  requiredAmount: number;
  missingAmount: number;
}> = ({
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

const CartPage = ({
  onBack,
  onLogin,
  onNavigateToProducts,
  user,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  walletBalance,
  onNavigateToDeposit,
  onSuccessfulPayment,
}: CartPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showInsufficientFunds, setShowInsufficientFunds] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = 0; // Có thể thêm logic discount sau
  const total = subtotal - discount;

  const handleCheckout = () => {
    // Check if user has sufficient funds
    if (walletBalance < total) {
      setShowInsufficientFunds(true);
      return;
    }

    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      // Call successful payment handler
      onSuccessfulPayment(total);
    }, 2000);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  // Nếu chưa đăng nhập, hiển thị trang yêu cầu đăng nhập
  if (!user) {
    return (
      <motion.div
        className="bg-gray-50 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3">
            <motion.nav
              className="flex items-center space-x-2 text-sm text-gray-600"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={onBack}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </motion.button>
              <span>/</span>
              <span className="text-gray-900 font-medium">Giỏ hàng</span>
            </motion.nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Login Required Icon */}
            <motion.div
              className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Lock className="w-12 h-12 text-blue-600" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Vui lòng đăng nhập
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Bạn cần đăng nhập để xem giỏ hàng
            </motion.p>

            {/* Login Button */}
            <motion.button
              onClick={onLogin}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-5 h-5 inline mr-2" />
              Đăng nhập
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Nếu đã đăng nhập, hiển thị giỏ hàng
  return (
    <motion.div
      className="bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <motion.nav
            className="flex items-center space-x-2 text-sm text-gray-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={onBack}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </motion.button>
            <span>/</span>
            <span className="text-gray-900 font-medium">Giỏ hàng</span>
          </motion.nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Giỏ hàng</h1>
            <p className="text-gray-600">
              Bạn có {totalItems} sản phẩm trong giỏ hàng
            </p>
          </motion.div>

          {cartItems.length === 0 ? (
            // Empty Cart
            <motion.div
              className="bg-white rounded-xl shadow-sm p-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </motion.div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Giỏ hàng trống
              </h2>
              <p className="text-gray-600 mb-8">
                Bạn chưa có sản phẩm nào trong giỏ hàng
              </p>
              <motion.button
                onClick={onNavigateToProducts || onBack}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tiếp tục mua sắm
              </motion.button>
            </motion.div>
          ) : (
            // Cart Items
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <motion.div
                className="lg:col-span-2 space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    className="bg-white rounded-xl shadow-sm p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={getMainProductImage(item.product)}
                          alt={item.product.name}
                          className="w-full h-full object-contain bg-gray-50"
                          onError={handleImageError}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-red-600">
                            {item.product.price.toLocaleString("vi-VN")}₫
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                              disabled={
                                item.quantity >= (item.product.stock || 999)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Order Summary */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Tóm tắt đơn hàng
                  </h2>

                  {/* Order Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính ({totalItems} sản phẩm)</span>
                      <span>{subtotal.toLocaleString("vi-VN")}₫</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Giảm giá</span>
                      <span>-{discount.toLocaleString("vi-VN")}₫</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Tổng cộng</span>
                        <span>{total.toLocaleString("vi-VN")}₫</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Đang xử lý...
                      </div>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 inline mr-2" />
                        Thanh toán ngay
                      </>
                    )}
                  </motion.button>

                  {/* Security Info */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-blue-800 mb-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Bảo mật thanh toán</span>
                    </div>
                    <div className="space-y-1 text-xs text-blue-700">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Thanh toán an toàn</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        <span>Giao hàng tự động</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Bảo hành trọn đời</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Insufficient Funds Modal */}
      <InsufficientFundsModal
        isOpen={showInsufficientFunds}
        onClose={() => setShowInsufficientFunds(false)}
        onDeposit={() => {
          setShowInsufficientFunds(false);
          onNavigateToDeposit(total - walletBalance);
        }}
        currentBalance={walletBalance}
        requiredAmount={total}
        missingAmount={total - walletBalance}
      />
    </motion.div>
  );
};

export default CartPage;
