import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { PageType, Product, Category, Customer } from "./types";
import { SearchProvider } from "./contexts/SearchContext";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FAQPage from "./pages/FAQPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import PageTransition from "./components/common/PageTransition";
import BackToTop from "./components/common/BackToTop";
import NotificationPopup from "./components/common/NotificationPopup";
import GlobalNotification from "./components/common/GlobalNotification";

import api from "./services/api";

const App = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    type: "success" | "error";
    message: string;
  }>({
    isVisible: false,
    type: "success",
    message: "",
  });

  const fetchProducts = async (params?: any) => {
    try {
      setLoading(true);
      const response = await api.product.getAllProducts(params);
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.category.getAllCategories();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();

    const savedSession = localStorage.getItem("user_session");
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        setUser(sessionData.data);
      } catch (error) {
        console.error("Error parsing saved session data:", error);
        localStorage.removeItem("user_session");
      }
    }
  }, []);

  const handleAuthSuccess = (response: any) => {
    // response is the full backend body { success, data, token, refresh }
    const userData = response.data;
    setUser(userData);
    localStorage.setItem("user_session", JSON.stringify(response));
    setCurrentPage("home");
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem("user_session");
      setCurrentPage("home");
    }, 1000);
  };

  const handleShowNotification = (
    type: "success" | "error",
    message: string
  ) => {
    setNotification({
      isVisible: true,
      type,
      message,
    });
  };

  const isAdminPage = ["admin", "analytics", "ai-insights", "customers"].includes(currentPage);

  return (
    <SearchProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <GlobalNotification />
        
        {!isAdminPage && (
          <Header
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            user={user}
            setUser={setUser}
            onLogout={handleLogout}
          />
        )}

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {loading ? (
              <PageTransition key="loading">
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">Initializing System...</p>
                  </div>
                </div>
              </PageTransition>
            ) : (
              <>
                {currentPage === "home" && (
                  <PageTransition key="home">
                    <HomePage
                      products={products}
                      categories={categories}
                      setCurrentPage={setCurrentPage}
                      onViewDetail={(p) => {
                        setSelectedProduct(p);
                        setCurrentPage("product-detail");
                      }}
                    />
                  </PageTransition>
                )}

                {currentPage === "products" && (
                  <PageTransition key="products">
                    <ProductsPage
                      products={products}
                      categories={categories}
                      onViewDetail={(p) => {
                        setSelectedProduct(p);
                        setCurrentPage("product-detail");
                      }}
                      onRefresh={fetchProducts}
                    />
                  </PageTransition>
                )}

                {currentPage === "product-detail" && selectedProduct && (
                  <PageTransition key="product-detail">
                    <ProductDetailPage
                      product={selectedProduct}
                      onBack={() => setCurrentPage("products")}
                    />
                  </PageTransition>
                )}

                {isAdminPage && (
                  <PageTransition key="admin">
                    {user && user.role === "admin" ? (
                      <AdminDashboard
                        user={user}
                        onBack={handleBackToHome}
                        onLogout={handleLogout}
                        initialTab={currentPage === "admin" ? "overview" : currentPage}
                      />
                    ) : (
                      <div className="min-h-screen flex items-center justify-center bg-slate-900">
                        <div className="text-center p-12 bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl">
                          <h2 className="text-3xl font-black text-white mb-4">Access Restricted</h2>
                          <p className="text-slate-400 mb-8 font-medium">This module requires administrative privileges.</p>
                          <button 
                            onClick={handleBackToHome}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-indigo-700 transition-all"
                          >
                            Return to Homepage
                          </button>
                        </div>
                      </div>
                    )}
                  </PageTransition>
                )}

                {currentPage === "auth" && (
                  <PageTransition key="auth">
                    <AuthPage
                      onAuthSuccess={handleAuthSuccess}
                      onBackToHome={handleBackToHome}
                    />
                  </PageTransition>
                )}

                {currentPage === "profile" && user && (
                  <PageTransition key="profile">
                    <ProfilePage
                      user={user}
                      onBack={handleBackToHome}
                    />
                  </PageTransition>
                )}
                
                {currentPage === "faq" && <FAQPage setCurrentPage={setCurrentPage} />}
                {currentPage === "about" && <AboutPage setCurrentPage={setCurrentPage} />}
                {currentPage === "contact" && <ContactPage setCurrentPage={setCurrentPage} />}
              </>
            )}
          </AnimatePresence>
        </main>

        {!isAdminPage && <Footer setCurrentPage={setCurrentPage} />}
        <BackToTop />
        <NotificationPopup
          isVisible={notification.isVisible}
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      </div>
    </SearchProvider>
  );
};

export default App;
