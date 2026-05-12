/**
 * Environment configuration for frontend
 */
// API Base URL - sẽ được set từ environment variable khi deploy
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
// Backend URL for images
export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
// Frontend URL
export const FRONTEND_URL =
  import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
// Environment
export const NODE_ENV = import.meta.env.MODE || "development";
// Check if running in production
export const IS_PRODUCTION = NODE_ENV === "production";
