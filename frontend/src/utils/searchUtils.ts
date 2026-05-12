import { Product } from "../types";
import { SearchState } from "../contexts/SearchContext";

// Debounce function để tránh gọi API quá nhiều
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// UI Helpers for Search and Filtering
// (Core logic migrated to Django Backend)


// Highlight search terms trong text
export function highlightSearchTerm(text: string, searchTerm: string): string {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(
    regex,
    '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
  );
}

// Format price range cho display
export function formatPriceRange(min: number, max: number): string {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (max >= 10000000) {
    return `${formatCurrency(min)} - ${formatCurrency(max)}`;
  }

  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
}

// Tạo filter tags từ search state
export function createFilterTags(
  searchState: SearchState
): Array<{ id: string; label: string; type: string; value: any }> {
  const tags = [];

  // Category tags
  if (searchState.categories.length > 0) {
    searchState.categories.forEach((category) => {
      tags.push({
        id: `category-${category}`,
        label: category,
        type: "category",
        value: category,
      });
    });
  }

  // Price range tag
  if (searchState.priceRange.min > 0 || searchState.priceRange.max < 10000000) {
    tags.push({
      id: "price-range",
      label: formatPriceRange(
        searchState.priceRange.min,
        searchState.priceRange.max
      ),
      type: "price",
      value: searchState.priceRange,
    });
  }

  // Sort tag
  if (searchState.sortBy !== "newest") {
    const sortLabels = {
      price_asc: "Giá tăng dần",
      price_desc: "Giá giảm dần",
      name_asc: "Tên A-Z",
      name_desc: "Tên Z-A",
      popular: "Bán chạy nhất",
    };

    tags.push({
      id: "sort",
      label: sortLabels[searchState.sortBy],
      type: "sort",
      value: searchState.sortBy,
    });
  }

  // Rating tag
  if (searchState.rating !== null) {
    tags.push({
      id: "rating",
      label: `${searchState.rating}+ sao`,
      type: "rating",
      value: searchState.rating,
    });
  }

  // Stock tag
  if (searchState.inStock !== null) {
    tags.push({
      id: "stock",
      label: searchState.inStock ? "Còn hàng" : "Hết hàng",
      type: "status",
      value: searchState.inStock,
    });
  }

  return tags;
}
