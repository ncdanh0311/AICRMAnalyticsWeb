import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useSearch } from "../../contexts/SearchContext";
import { debounce } from "../../utils/searchUtils";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Tìm kiếm sản phẩm...",
  className = "",
  onSearch,
}) => {
  const { state, dispatch } = useSearch();
  const [localQuery, setLocalQuery] = useState(state.query);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search function
  const debouncedSearch = useRef(
    debounce((query: string) => {
      dispatch({ type: "SET_QUERY", payload: query });
      onSearch?.(query);
    }, 300)
  ).current;

  // Update local query when state changes
  useEffect(() => {
    setLocalQuery(state.query);
  }, [state.query]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    debouncedSearch(value);
  };

  // Handle clear search
  const handleClear = () => {
    setLocalQuery("");
    dispatch({ type: "SET_QUERY", payload: "" });
    onSearch?.("");
    inputRef.current?.focus();
  };

  // Handle search button click
  const handleSearchClick = () => {
    dispatch({ type: "SET_QUERY", payload: localQuery });
    onSearch?.(localQuery);
  };

  // Handle enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className={`relative flex items-center bg-white border-2 rounded-xl shadow-sm transition-all duration-300 ${
          isFocused
            ? "border-blue-500 shadow-lg"
            : "border-gray-200 hover:border-gray-300"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Search Icon */}
        <div className="absolute left-4 text-gray-400">
          <Search className="w-5 h-5" />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none text-sm md:text-base"
        />

        {/* Clear Button */}
        {localQuery && (
          <motion.button
            onClick={handleClear}
            className="absolute right-12 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}

        {/* Search Button */}
        <motion.button
          onClick={handleSearchClick}
          className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Search Suggestions (Future Enhancement) */}
      {isFocused && localQuery && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="p-3 text-sm text-gray-500">
            Tìm kiếm cho "{localQuery}"
          </div>
          {/* Future: Add search suggestions here */}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
