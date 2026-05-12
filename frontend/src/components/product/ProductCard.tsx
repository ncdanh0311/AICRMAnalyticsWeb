import { motion } from "framer-motion";
import { Eye, Star, CheckCircle2, Zap, ArrowRight, Activity } from "lucide-react";
import { Product, Category } from "../../types";
import { getMainProductImage, handleImageError } from "../../utils/imageUtils";

interface ProductCardProps {
  product: Product;
  categories: Category[];
  onViewDetail?: (product: Product) => void;
  viewMode?: "grid" | "list";
}

const ProductCard = ({
  product,
  categories,
  onViewDetail,
  viewMode = "grid",
}: ProductCardProps) => {
  const categoryName = categories.find(
    (cat) => cat.id === product.category
  )?.name;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  return (
    <div
      className={`bg-white rounded-[2rem] shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 group border border-gray-100 ${
        viewMode === "list" ? "flex flex-col md:flex-row h-auto md:h-72" : "h-full flex flex-col"
      }`}
    >
      {/* Visual Area */}
      <div
        className={`relative bg-gray-50 flex items-center justify-center overflow-hidden ${
          viewMode === "list" ? "w-full md:w-72" : "h-56"
        }`}
      >
        <img
          src={getMainProductImage(product)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {product.isPremium && (
          <span className="absolute top-4 left-4 bg-yellow-400 text-gray-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Premium
          </span>
        )}
      </div>

      {/* Content Area */}
      <div
        className={`flex flex-col p-6 lg:p-8 ${
          viewMode === "list" ? "flex-1" : "flex-1 flex flex-col"
        }`}
      >
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-lg">
              {categoryName || "General Solution"}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-bold text-gray-500">{product.rating || 4.8}</span>
            </div>
          </div>

          <h3
            className={`font-black text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors ${
              viewMode === "list" ? "text-2xl" : "text-xl line-clamp-2"
            }`}
          >
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 font-medium mb-6 line-clamp-2 leading-relaxed">
            {product.description || "Giải pháp tối ưu hóa quy trình quản lý khách hàng và tăng trưởng doanh thu dựa trên dữ liệu AI."}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="text-[10px] font-bold uppercase">{product.sold || 120}+ Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-[10px] font-bold uppercase">AI Powered</span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-0.5 tracking-tight">Giá khởi điểm</p>
            <p className="text-xl font-black text-gray-900">
              {formatCurrency(product.price)}
              <span className="text-xs font-bold text-gray-400 ml-1">/tháng</span>
            </p>
          </div>
          
          <button
            onClick={() => onViewDetail?.(product)}
            className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-100 transition-all group/btn"
          >
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
