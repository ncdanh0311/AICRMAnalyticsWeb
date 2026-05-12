export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  status: "active" | "inactive" | "lead";
  segment: "vip" | "regular" | "low_value" | "new";
  totalSpent: number;
  orderCount: number;
  lastPurchaseDate?: string;
  churnProbability: number;
  createdAt: string;
}

export interface Order {
  id: string;
  customer_id: string;
  customer_name: string;
  total_amount: number;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category_name?: string;
  image?: string;
  stock: number;
  sold: number;
  description?: string;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: "user" | "admin";
  avatar?: string;
}

export type PageType =
  | "home"
  | "customers"
  | "customer-detail"
  | "products"
  | "product-detail"
  | "analytics"
  | "ai-insights"
  | "auth"
  | "profile"
  | "admin"
  | "about"
  | "contact"
  | "faq";

export interface AnalyticsData {
  customer_segmentation: {
    series: number[];
    labels: string[];
  };
  revenue_forecast: {
    predicted_next_month: number;
    chart: {
      series: { name: string; data: number[] }[];
      labels: string[];
    };
  };
  summary: {
    total_customers: number;
    total_orders: number;
    total_revenue: number;
    total_products: number;
    growth: number;
  };
  recent_activities: any[];
}
