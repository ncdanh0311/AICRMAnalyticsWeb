import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { useSearch } from "../../contexts/SearchContext";
import PriceRangeSlider from "./PriceRangeSlider";
import SortDropdown from "./SortDropdown";

interface FilterPanelProps {
  categories: Array<{ id: string; name: string; count: number }>;
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  className = "",
  isMobile = false,
  onClose,
}) => {
  const { state, dispatch } = useSearch();
  const [localCategories, setLocalCategories] = useState<string[]>(
    state.categories
  );
  const [localRating, setLocalRating] = useState<number | null>(state.rating);
  const [localInStock, setLocalInStock] = useState<boolean | null>(
    state.inStock
  );

  // Handle category change
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...localCategories, categoryId]
      : localCategories.filter((id) => id !== categoryId);

    setLocalCategories(newCategories);
    dispatch({ type: "SET_CATEGORIES", payload: newCategories });
  };

  // Handle rating change
  const handleRatingChange = (rating: number | null) => {
    setLocalRating(rating);
    dispatch({ type: "SET_RATING", payload: rating });
  };

  // Handle stock change
  const handleStockChange = (inStock: boolean | null) => {
    setLocalInStock(inStock);
    dispatch({ type: "SET_IN_STOCK", payload: inStock });
  };

  // Handle clear all filters
  const handleClearAll = () => {
    setLocalCategories([]);
    setLocalRating(null);
    setLocalInStock(null);
    dispatch({ type: "CLEAR_ALL_FILTERS" });
  };

  const panelContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Bộ lọc</h2>
        </div>
        {isMobile && onClose && (
          <motion.button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Danh mục</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={localCategories.includes(category.id)}
                onChange={(e) =>
                  handleCategoryChange(category.id, e.target.checked)
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{category.name}</span>
              <span className="text-xs text-gray-500">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <PriceRangeSlider />
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Đánh giá</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="rating"
                checked={localRating === rating}
                onChange={() =>
                  handleRatingChange(localRating === rating ? null : rating)
                }
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-700">trở lên</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Trạng thái</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={localInStock === true}
              onChange={() =>
                handleStockChange(localInStock === true ? null : true)
              }
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Còn hàng</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={localInStock === false}
              onChange={() =>
                handleStockChange(localInStock === false ? null : false)
              }
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Hết hàng</span>
          </label>
        </div>
      </div>

      {/* Sort */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Sắp xếp</h3>
        <SortDropdown />
      </div>

      {/* Clear All Button */}
      <motion.button
        onClick={handleClearAll}
        className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Xóa tất cả bộ lọc
      </motion.button>
    </div>
  );

  if (isMobile) {
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white w-full max-h-[80vh] overflow-y-auto p-6 rounded-t-2xl"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {panelContent}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}
    >
      {panelContent}
    </div>
  );
};

export default FilterPanel;
