import { Customer, Product, Order, Category, User, AnalyticsData } from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

// Generic API helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const normalizedEndpoint = endpoint.endsWith("/") ? endpoint : `${endpoint}/`;
    const url = `${API_BASE_URL}/api${normalizedEndpoint}`;

    const sessionData = localStorage.getItem("user_session");
    let token = null;
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        token = parsed.token || parsed.access;
      } catch (e) {}
    }

    const headers: any = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // If options.body is FormData, we should let fetch set the Content-Type automatically
    if (options.body instanceof FormData) {
      delete headers["Content-Type"];
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.detail || "API request failed");
    }

    if (data.success !== undefined) {
      return data;
    }
    return {
      success: true,
      data: data,
      message: "Success",
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// User API
export const userApi = {
  login: (email: string, password: string) =>
    apiRequest<any>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (data: any) =>
    apiRequest<any>("/auth/register/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getCurrentUser: () => apiRequest<User>("/users/me/"),
};

// Customer API
export const customerApi = {
  getAllCustomers: (params?: any) => {
    let queryString = "";
    if (params) {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key]) searchParams.append(key, params[key]);
      });
      queryString = `?${searchParams.toString()}`;
    }
    return apiRequest<Customer[]>(`/customers/${queryString}`);
  },
  getCustomer: (id: string) => apiRequest<Customer>(`/customers/${id}/`),
  createCustomer: (data: Partial<Customer>) =>
    apiRequest<Customer>("/customers/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateCustomer: (id: string, data: Partial<Customer>) =>
    apiRequest<Customer>(`/customers/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteCustomer: (id: string) =>
    apiRequest<void>(`/customers/${id}/`, {
      method: "DELETE",
    }),
  getStats: () => apiRequest<any>("/customers/stats/"),
};

// Product API
export const productApi = {
  getAllProducts: (params?: any) => {
    let queryString = "";
    if (params) {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key]) searchParams.append(key, params[key]);
      });
      queryString = `?${searchParams.toString()}`;
    }
    return apiRequest<Product[]>(`/products/${queryString}`);
  },
  getProduct: (id: string) => apiRequest<Product>(`/products/${id}/`),
  createProduct: (data: Partial<Product>) =>
    apiRequest<Product>("/products/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateProduct: (id: string, data: Partial<Product>) =>
    apiRequest<Product>(`/products/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  deleteProduct: (id: string) =>
    apiRequest<void>(`/products/${id}/`, {
      method: "DELETE",
    }),
};

// Category API
export const categoryApi = {
  getAllCategories: () => apiRequest<Category[]>("/categories/"),
};

// Order API
export const orderApi = {
  getAllOrders: (params?: any) => {
    let queryString = "";
    if (params) {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach((key) => {
        if (params[key]) searchParams.append(key, params[key]);
      });
      queryString = `?${searchParams.toString()}`;
    }
    return apiRequest<Order[]>(`/orders/${queryString}`);
  },
};

// Admin API
export const adminApi = {
  getStats: () => apiRequest<AnalyticsData>("/admin/stats/"),
};

// AI API
export const aiApi = {
  getInsights: () => apiRequest<any>("/ai/insights/"),
};

export const healthApi = {
  check: () => apiRequest<any>("/health/"),
};

export default {
  user: userApi,
  customer: customerApi,
  product: productApi,
  category: categoryApi,
  order: orderApi,
  admin: adminApi,
  ai: aiApi,
  health: healthApi,
};
