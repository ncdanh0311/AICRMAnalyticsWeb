/**
 * Utility functions for handling product images
 */

/**
 * Get the main product image (prioritizes image field over images array)
 * @param product - The product object
 * @returns The main image URL
 */
export const getMainProductImage = (product: {
  image?: string;
  images?: string[];
}): string => {
  // Ưu tiên ảnh chính từ trường image
  if (product.image) {
    return getProductImageUrl(product.image);
  }

  // Fallback về ảnh đầu tiên từ mảng images
  if (product.images && product.images.length > 0) {
    return getProductImageUrl(product.images[0]);
  }

  // Fallback cuối cùng
  return getProductImageUrl(undefined);
};

/**
 * Get the full URL for a product image
 * @param imagePath - The image path from the product data
 * @returns The full URL for the image
 */
export const getProductImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) {
    return "/src/assets/logo.jpg"; // Default fallback image
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // If it's a relative path, prepend the backend URL
  return `${
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"
  }${imagePath}`;
};

/**
 * Handle image load error by setting a fallback image
 * @param event - The error event from the image element
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  const target = event.target as HTMLImageElement;
  target.src = "/src/assets/logo.jpg";
};
