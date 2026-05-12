import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useSearch } from "../../contexts/SearchContext";

interface SortOption {
  value:
    | "newest"
    | "price_asc"
    | "price_desc"
    | "name_asc"
    | "name_desc"
    | "popular";
  label: string;
  icon?: string;
}

const sortOptions: SortOption[] = [
  { value: "newest", label: "Mới nhất" },
  { value: "price_asc", label: "Giá tăng dần" },
  { value: "price_desc", label: "Giá giảm dần" },
  { value: "name_asc", label: "Tên A-Z" },
  { value: "name_desc", label: "Tên Z-A" },
  { value: "popular", label: "Bán chạy nhất" },
];

interface SortDropdownProps {
  className?: string;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ className = "" }) => {
  const { state, dispatch } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get current sort option label
  const currentSort = sortOptions.find(
    (option) => option.value === state.sortBy
  );
  const currentLabel = currentSort?.label || "Mới nhất";

  // Handle sort change
  const handleSortChange = (value: SortOption["value"]) => {
    dispatch({ type: "SET_SORT_BY", payload: value });
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-sm text-gray-700">{currentLabel}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-1">
              {sortOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                    state.sortBy === option.value
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700"
                  }`}
                  whileHover={{
                    backgroundColor:
                      state.sortBy === option.value ? "#dbeafe" : "#f9fafb",
                  }}
                >
                  <span>{option.label}</span>
                  {state.sortBy === option.value && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
