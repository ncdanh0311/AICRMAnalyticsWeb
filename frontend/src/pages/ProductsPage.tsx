import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid, List, RefreshCw, Zap, Shield, CheckCircle2 } from "lucide-react";
import { Product, Category } from "../types";
import ProductCard from "../components/product/ProductCard";
import SearchBar from "../components/search/SearchBar";
import FilterPanel from "../components/search/FilterPanel";
import ActiveFilters from "../components/search/ActiveFilters";
import { useSearch } from "../contexts/SearchContext";

interface ProductsPageProps {
  products: Product[];
  categories: Category[];
  onViewDetail?: (product: Product) => void;
  onRefresh: (params?: any) => void;
}

const ProductsPage = ({
  products,
  categories,
  onViewDetail,
  onRefresh,
}: ProductsPageProps) => {
  const { state } = useSearch();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const params: any = {
      q: state.query,
      sort_by: state.sortBy,
      min_price: state.priceRange.min,
      max_price: state.priceRange.max,
      rating: state.rating,
      in_stock: state.inStock,
    };
    if (state.categories.length > 0) {
      params.category = state.categories.join(",");
    }
    onRefresh(params);
  }, [state.query, state.sortBy, state.priceRange, state.categories, state.rating, state.inStock]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const categoryCounts = categories.map((category) => ({
    id: category.id,
    name: category.name,
    count: products.filter((product) => product.category === category.id).length,
  }));

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-white border-b relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl" />
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight"
            >
              Giải pháp & <span className="text-blue-600">Dịch vụ CRM</span>
            </motion.h1>
            <p className="text-lg text-gray-500 font-medium leading-relaxed">
              Lựa chọn các gói giải pháp tối ưu phù hợp với quy mô doanh nghiệp của bạn. Tích hợp AI Insights và Dashboard phân tích chuyên sâu.
            </p>
          </div>

          <div className="mt-10 flex flex-col lg:flex-row gap-6 items-start lg:items-end justify-between">
            <div className="w-full lg:max-w-2xl">
              <SearchBar
                placeholder="Tìm kiếm giải pháp (ví dụ: Marketing, Sales, AI...)"
                className="shadow-xl shadow-blue-50"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <motion.button
                onClick={() => setIsFilterPanelOpen(true)}
                className="lg:hidden flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg"
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                Lọc
              </motion.button>
              <button 
                onClick={handleRefresh}
                className="p-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-all"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Filter Panel */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              <FilterPanel categories={categoryCounts} />
              
              <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-6 rounded-[2rem] text-white shadow-xl">
                <Zap className="w-8 h-8 mb-4 text-yellow-400" />
                <h4 className="font-bold mb-2">Bạn cần giải pháp riêng?</h4>
                <p className="text-xs text-blue-200 font-medium mb-6 leading-relaxed">
                  Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và xây dựng hệ thống CRM tùy chỉnh cho doanh nghiệp bạn.
                </p>
                <button className="w-full py-3 bg-white text-blue-900 rounded-xl text-sm font-black hover:bg-blue-50 transition-all">
                  Liên hệ ngay
                </button>
              </div>
            </div>
          </aside>

          {/* Solutions Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
                  {products.length} Kết quả tìm thấy
                </span>
                <ActiveFilters productCount={products.length} />
              </div>
              <div className="hidden sm:flex bg-white rounded-xl p-1 shadow-sm border border-gray-100">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {products.length > 0 ? (
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2' : 'grid-cols-1'}`}>
                <AnimatePresence>
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ProductCard
                        product={product}
                        categories={categories}
                        onViewDetail={onViewDetail}
                        viewMode={viewMode}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200 p-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy giải pháp nào</h3>
                <p className="text-gray-500 font-medium">Thử thay đổi từ khóa hoặc xóa bộ lọc để xem thêm kết quả.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter */}
      <AnimatePresence>
        {isFilterPanelOpen && (
          <FilterPanel
            categories={categoryCounts}
            isMobile={true}
            onClose={() => setIsFilterPanelOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;
