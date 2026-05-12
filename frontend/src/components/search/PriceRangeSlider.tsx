import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearch } from "../../contexts/SearchContext";

interface PriceRangeSliderProps {
  minPrice?: number;
  maxPrice?: number;
  className?: string;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  minPrice = 0,
  maxPrice = 10000000,
  className = "",
}) => {
  const { state, dispatch } = useSearch();
  const [localMin, setLocalMin] = useState(state.priceRange.min);
  const [localMax, setLocalMax] = useState(state.priceRange.max);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

  // Update local values when state changes
  useEffect(() => {
    setLocalMin(state.priceRange.min);
    setLocalMax(state.priceRange.max);
  }, [state.priceRange]);

  // Calculate slider positions
  const range = maxPrice - minPrice;
  const minPercent = ((localMin - minPrice) / range) * 100;
  const maxPercent = ((localMax - minPrice) / range) * 100;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Handle min value change
  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, localMax - 100000);
    setLocalMin(newMin);
    dispatch({
      type: "SET_PRICE_RANGE",
      payload: { min: newMin, max: localMax },
    });
  };

  // Handle max value change
  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, localMin + 100000);
    setLocalMax(newMax);
    dispatch({
      type: "SET_PRICE_RANGE",
      payload: { min: localMin, max: newMax },
    });
  };

  // Handle slider drag start
  const handleDragStart = (type: "min" | "max") => {
    setIsDragging(type);
  };

  // Handle slider drag end
  const handleDragEnd = () => {
    setIsDragging(null);
  };

  // Handle input change
  const handleInputChange = (type: "min" | "max", value: string) => {
    const numValue = parseInt(value.replace(/[^\d]/g, "")) || 0;
    if (type === "min") {
      handleMinChange(numValue);
    } else {
      handleMaxChange(numValue);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Khoảng giá</h3>
        <span className="text-xs text-gray-500">
          {formatCurrency(localMin)} - {formatCurrency(localMax)}
        </span>
      </div>

      {/* Input Fields */}
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Từ</label>
          <input
            type="text"
            value={formatCurrency(localMin)}
            onChange={(e) => handleInputChange("min", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Đến</label>
          <input
            type="text"
            value={formatCurrency(localMax)}
            onChange={(e) => handleInputChange("max", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="10,000,000"
          />
        </div>
      </div>

      {/* Slider */}
      <div className="relative py-4">
        <div className="relative h-2 bg-gray-200 rounded-full">
          {/* Track */}
          <div
            className="absolute h-2 bg-blue-500 rounded-full"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`,
            }}
          />

          {/* Min Handle */}
          <motion.div
            className="absolute top-1/2 w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-pointer transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${minPercent}%` }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseDown={() => handleDragStart("min")}
            onTouchStart={() => handleDragStart("min")}
          />

          {/* Max Handle */}
          <motion.div
            className="absolute top-1/2 w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-pointer transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${maxPercent}%` }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseDown={() => handleDragStart("max")}
            onTouchStart={() => handleDragStart("max")}
          />
        </div>

        {/* Invisible slider for drag functionality */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={localMin}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ pointerEvents: isDragging === "min" ? "auto" : "none" }}
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={localMax}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ pointerEvents: isDragging === "max" ? "auto" : "none" }}
        />
      </div>

      {/* Quick Price Buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: "Dưới 100k", min: 0, max: 100000 },
          { label: "100k - 500k", min: 100000, max: 500000 },
          { label: "500k - 1M", min: 500000, max: 1000000 },
          { label: "Trên 1M", min: 1000000, max: maxPrice },
        ].map((range) => (
          <motion.button
            key={range.label}
            onClick={() => {
              setLocalMin(range.min);
              setLocalMax(range.max);
              dispatch({
                type: "SET_PRICE_RANGE",
                payload: { min: range.min, max: range.max },
              });
            }}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              localMin === range.min && localMax === range.max
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-600 border-gray-300 hover:border-blue-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {range.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PriceRangeSlider;
