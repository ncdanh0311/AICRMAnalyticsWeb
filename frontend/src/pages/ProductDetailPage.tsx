import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Minus,
  Plus,
  CheckCircle,
  Clock,
  FileText,
  Zap,
  Truck,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Home,
} from "lucide-react";
import { Product, Category } from "../types";
import {
  getMainProductImage,
  getProductImageUrl,
  handleImageError,
} from "../utils/imageUtils";

interface ProductDetailPageProps {
  product: Product;
  categories: Category[];
  onBack: () => void;
  onLogin?: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
}

const ProductDetailPage = ({
  product,
  categories,
  onBack,
  onLogin,
  onAddToCart,
  onBuyNow,
}: ProductDetailPageProps) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  // Tự động chọn package phổ biến đầu tiên khi component load
  React.useEffect(() => {
    if (
      product.hasPackages &&
      product.packages &&
      product.packages.length > 0
    ) {
      const popularPackage = product.packages.find((pkg) => pkg.isPopular);
      if (popularPackage) {
        setSelectedPackage(popularPackage);
      } else {
        // Nếu không có package phổ biến, chọn package đầu tiên
        setSelectedPackage(product.packages[0]);
      }
    }
  }, [product]);

  const categoryName = categories.find(
    (cat) => cat.id === product.category
  )?.name;

  // Tính toán discount tự động nếu có originalPrice
  const calculatedDiscount =
    product.originalPrice &&
    product.originalPrice > 0 &&
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  // Sử dụng discount từ database hoặc tính toán tự động
  const displayDiscount = product.discount || calculatedDiscount;

  // Lấy danh sách ảnh sản phẩm
  // Đảm bảo ảnh chính (image) luôn là ảnh đầu tiên
  const productImages = (() => {
    const images: string[] = [];

    // Thêm ảnh chính trước (nếu có)
    if (product.image) {
      images.push(product.image);
    }

    // Thêm các ảnh phụ (nếu có và khác với ảnh chính)
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        if (img !== product.image && !images.includes(img)) {
          images.push(img);
        }
      });
    }

    return images;
  })();

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    // Kiểm tra nếu sản phẩm có packages thì phải chọn package
    if (
      product.hasPackages &&
      product.packages &&
      product.packages.length > 0 &&
      !selectedPackage
    ) {
      alert("Vui lòng chọn một gói dịch vụ trước khi thêm vào giỏ hàng");
      return;
    }

    if (onAddToCart) {
      // Tạo product với package được chọn
      const productWithPackage = selectedPackage
        ? {
            ...product,
            selectedPackage,
            price: selectedPackage.price,
            originalPrice: selectedPackage.originalPrice,
          }
        : product;
      onAddToCart(productWithPackage, quantity);
    } else if (onLogin) {
      onLogin();
    }
  };

  const handleBuyNow = () => {
    // Kiểm tra nếu sản phẩm có packages thì phải chọn package
    if (
      product.hasPackages &&
      product.packages &&
      product.packages.length > 0 &&
      !selectedPackage
    ) {
      alert("Vui lòng chọn một gói dịch vụ trước khi mua");
      return;
    }

    if (onBuyNow) {
      // Tạo product với package được chọn
      const productWithPackage = selectedPackage
        ? {
            ...product,
            selectedPackage,
            price: selectedPackage.price,
            originalPrice: selectedPackage.originalPrice,
          }
        : product;
      onBuyNow(productWithPackage, quantity);
    } else if (onLogin) {
      onLogin();
    }
  };

  const handleLoginClick = () => {
    if (onLogin) {
      onLogin();
    }
  };

  const tabs = [
    { id: "description", name: "Mô tả", icon: FileText },
    { id: "features", name: "Tính năng", icon: Zap },
    { id: "delivery", name: "Giao hàng", icon: Truck },
    { id: "faq", name: "FAQ", icon: HelpCircle },
  ];

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
            <motion.button
              onClick={onBack}
              className="hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Tất cả sản phẩm
            </motion.button>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {product.name}
            </span>
          </motion.nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Product Detail Card */}
        <motion.div
          className="bg-white rounded-xl shadow-sm overflow-hidden max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Section - Product Gallery */}
            <motion.div
              className="bg-gray-50 p-6 lg:p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Main Image */}
              <motion.div
                className="relative bg-white rounded-lg p-6 flex items-center justify-center shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-full h-80 rounded-lg overflow-hidden shadow-sm relative group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={getProductImageUrl(productImages[currentImageIndex])}
                    alt={product.name}
                    className="w-full h-full object-contain bg-gray-50"
                    onError={handleImageError}
                  />

                  {/* Navigation buttons - chỉ hiển thị khi có nhiều ảnh */}
                  {productImages.length > 1 && (
                    <>
                      {/* Previous button */}
                      <button
                        onClick={handlePreviousImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      {/* Next button */}
                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Image counter */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {productImages.length}
                      </div>
                    </>
                  )}
                </motion.div>
              </motion.div>

              {/* Thumbnail Gallery - chỉ hiển thị khi có nhiều ảnh */}
              {productImages.length > 1 && (
                <motion.div
                  className="mt-4 flex gap-2 overflow-x-auto pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {productImages.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        currentImageIndex === index
                          ? "border-blue-500 shadow-lg"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={getProductImageUrl(image)}
                        alt={`${product.name} - Ảnh ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Right Section - Product Information */}
            <motion.div
              className="p-6 lg:p-8 flex flex-col"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {categoryName}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews} đánh giá)
                </span>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                {product.hasPackages &&
                product.packages &&
                product.packages.length > 0 ? (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl font-bold text-red-600">
                        {selectedPackage ? (
                          <>
                            {selectedPackage.price.toLocaleString("vi-VN")}₫
                            {selectedPackage.originalPrice &&
                              selectedPackage.originalPrice > 0 &&
                              selectedPackage.originalPrice >
                                selectedPackage.price && (
                                <span className="text-xl text-gray-500 line-through ml-3">
                                  {selectedPackage.originalPrice.toLocaleString(
                                    "vi-VN"
                                  )}
                                  ₫
                                </span>
                              )}
                          </>
                        ) : (
                          <>
                            Từ{" "}
                            {Math.min(
                              ...product.packages.map((p) => p.price)
                            ).toLocaleString("vi-VN")}
                            ₫
                          </>
                        )}
                      </span>
                    </div>
                    {selectedPackage &&
                      selectedPackage.originalPrice &&
                      selectedPackage.originalPrice > 0 &&
                      selectedPackage.originalPrice > selectedPackage.price && (
                        <p className="text-sm text-gray-600 mb-2">
                          Tiết kiệm{" "}
                          {(
                            selectedPackage.originalPrice -
                            selectedPackage.price
                          ).toLocaleString("vi-VN")}
                          ₫
                        </p>
                      )}
                    <p className="text-sm text-gray-600 mb-4">
                      {product.packages.length} gói dịch vụ khác nhau
                    </p>

                    {/* Package Selection */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Chọn gói dịch vụ:
                      </h4>
                      <div className="grid gap-3">
                        {product.packages.map((pkg) => (
                          <div
                            key={pkg.id}
                            onClick={() => setSelectedPackage(pkg)}
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                              selectedPackage?.id === pkg.id
                                ? "border-blue-500 bg-blue-50"
                                : pkg.isPopular
                                ? "border-blue-300 bg-blue-25"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-semibold text-gray-900">
                                    {pkg.name}
                                  </h5>
                                  {pkg.isPopular && (
                                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                                      Phổ biến
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                  {pkg.duration}{" "}
                                  {pkg.durationUnit === "month"
                                    ? "tháng"
                                    : "năm"}
                                  {pkg.description && ` - ${pkg.description}`}
                                </p>
                                {pkg.features && pkg.features.length > 0 && (
                                  <div className="text-xs text-gray-500">
                                    {pkg.features.slice(0, 2).join(", ")}
                                    {pkg.features.length > 2 && "..."}
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-lg text-red-600">
                                  {pkg.price.toLocaleString("vi-VN")}₫
                                </div>
                                {pkg.originalPrice &&
                                  pkg.originalPrice > 0 &&
                                  pkg.originalPrice > pkg.price && (
                                    <div className="text-sm text-gray-500 line-through">
                                      {pkg.originalPrice.toLocaleString(
                                        "vi-VN"
                                      )}
                                      ₫
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl font-bold text-red-600">
                        {product.price.toLocaleString("vi-VN")}₫
                      </span>
                      {product.originalPrice &&
                        product.originalPrice > 0 &&
                        product.originalPrice > product.price && (
                          <>
                            <span className="text-xl text-gray-500 line-through">
                              {product.originalPrice.toLocaleString("vi-VN")}₫
                            </span>
                            {displayDiscount > 0 && (
                              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                -{displayDiscount}%
                              </span>
                            )}
                          </>
                        )}
                    </div>
                    {product.originalPrice &&
                      product.originalPrice > 0 &&
                      product.originalPrice > product.price && (
                        <p className="text-sm text-gray-600">
                          Tiết kiệm{" "}
                          {(
                            product.originalPrice - product.price
                          ).toLocaleString("vi-VN")}
                          ₫
                        </p>
                      )}
                  </div>
                )}
              </div>

              {/* Availability & Stats */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Còn lại: {product.stock || 0}
                    </span>
                    <span className="flex items-center gap-1 text-blue-600">
                      <Clock className="w-4 h-4" />
                      Đã bán: {product.sold}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === "Tự động"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Số lượng:
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <motion.button
                      onClick={() => handleQuantityChange("decrease")}
                      className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 text-center border-none focus:outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      min="1"
                      max={product.stock || 0}
                    />
                    <motion.button
                      onClick={() => handleQuantityChange("increase")}
                      className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      disabled={quantity >= (product.stock || 0)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <span className="text-sm text-gray-600">
                    Tổng:{" "}
                    {(
                      (selectedPackage?.price || product.price) * quantity
                    ).toLocaleString("vi-VN")}
                    ₫
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mb-6 space-y-3">
                <motion.button
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Zap className="w-5 h-5" />
                  Mua ngay
                </motion.button>
                <motion.button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </motion.button>
              </div>

              {/* Security & Trust */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 text-sm text-blue-800">
                  <Shield className="w-5 h-5" />
                  <span>
                    Bảo mật thanh toán • Giao hàng tự động • Hỗ trợ 24/7
                  </span>
                </div>
              </div>

              {/* Login Prompt */}
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Vui lòng{" "}
                  <button
                    onClick={handleLoginClick}
                    className="text-blue-600 hover:underline font-medium cursor-pointer"
                  >
                    đăng nhập
                  </button>{" "}
                  để mua hàng
                </p>
              </div>
            </motion.div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-200">
            <div className="p-6 lg:p-8">
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {tabs.map((tab, index) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                          activeTab === tab.id
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.name}
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                className="min-h-64"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "description" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      Mô tả sản phẩm
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Quy trình nhận hàng và cách thức bảo hành
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Giao hàng tự động qua email
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Bảo hành trọn đời
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Hỗ trợ kỹ thuật 24/7
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
                {activeTab === "features" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Tính năng sản phẩm
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(product.features || []).map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {activeTab === "delivery" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      Thông tin giao hàng
                    </h3>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Truck className="w-6 h-6 text-green-600" />
                        <h4 className="font-semibold text-green-800">
                          Giao hàng tự động
                        </h4>
                      </div>
                      <p className="text-green-700">
                        Giao hàng tự động qua email trong vòng 5-10 phút sau khi
                        thanh toán thành công.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Thời gian giao hàng
                        </h4>
                        <p className="text-gray-600">
                          5-10 phút sau thanh toán
                        </p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Phương thức giao hàng
                        </h4>
                        <p className="text-gray-600">Email tự động</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                {activeTab === "faq" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      Câu hỏi thường gặp
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">
                        Chưa có câu hỏi nào cho sản phẩm này.
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Bạn có thể liên hệ hỗ trợ để được tư vấn thêm.
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
