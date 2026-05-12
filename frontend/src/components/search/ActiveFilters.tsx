import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSearch } from "../../contexts/SearchContext";
import { createFilterTags } from "../../utils/searchUtils";

interface ActiveFiltersProps {
  productCount: number;
  className?: string;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  productCount,
  className = "",
}) => {
  const { state, dispatch } = useSearch();

  // Create filter tags from current state
  const filterTags = createFilterTags(state);

  // Handle remove filter
  const handleRemoveFilter = (filterId: string) => {
    const filter = filterTags.find((tag) => tag.id === filterId);
    if (!filter) return;

    switch (filter.type) {
      case "category":
        dispatch({
          type: "SET_CATEGORIES",
          payload: state.categories.filter((cat) => cat !== filter.value),
        });
        break;
      case "price":
        dispatch({
          type: "SET_PRICE_RANGE",
          payload: { min: 0, max: 10000000 },
        });
        break;
      case "sort":
        dispatch({
          type: "SET_SORT_BY",
          payload: "newest",
        });
        break;
      case "rating":
        dispatch({
          type: "SET_RATING",
          payload: null,
        });
        break;
      case "status":
        dispatch({
          type: "SET_IN_STOCK",
          payload: null,
        });
        break;
    }
  };

  // Handle clear all filters
  const handleClearAll = () => {
    dispatch({ type: "CLEAR_ALL_FILTERS" });
  };

  // Don't render if no filters are active
  if (filterTags.length === 0 && !state.query) {
    return null;
  }

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">
            Kết quả tìm kiếm
          </span>
          <span className="text-sm text-gray-500">
            ({productCount} sản phẩm)
          </span>
        </div>

        {filterTags.length > 0 && (
          <motion.button
            onClick={handleClearAll}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Xóa tất cả
          </motion.button>
        )}
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        {/* Search Query Tag */}
        {state.query && (
          <motion.div
            key="search-query"
            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <span className="mr-1">🔍</span>
            <span className="mr-2">"{state.query}"</span>
            <motion.button
              onClick={() => dispatch({ type: "SET_QUERY", payload: "" })}
              className="text-blue-600 hover:text-blue-800"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            >
              <X className="w-3 h-3" />
            </motion.button>
          </motion.div>
        )}

        {/* Filter Tags */}
        <AnimatePresence>
          {filterTags.map((tag) => (
            <motion.div
              key={tag.id}
              className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <span className="mr-2">{tag.label}</span>
              <motion.button
                onClick={() => handleRemoveFilter(tag.id)}
                className="text-gray-500 hover:text-gray-700"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <X className="w-3 h-3" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {productCount === 0 && (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-gray-400 mb-2">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            Không tìm thấy sản phẩm nào phù hợp
          </p>
          <motion.button
            onClick={handleClearAll}
            className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Thử lại với bộ lọc khác
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ActiveFilters;
