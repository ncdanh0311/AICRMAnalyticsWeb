import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  Search,
  Settings,
  HelpCircle,
  Package,
  Info,
  Phone,
  Home,
  Users,
  BarChart2,
  Zap
} from "lucide-react";
import { PageType } from "../../types";

const searchOptions = [
  {
    id: "home",
    label: "Trang chủ",
    keywords: ["trang chủ", "home", "dashboard"],
    icon: Home,
    page: "home" as PageType,
  },
  {
    id: "customers",
    label: "Khách hàng",
    keywords: ["khách hàng", "customers", "crm", "quản lý"],
    icon: Users,
    page: "customers" as PageType,
  },
  {
    id: "products",
    label: "Dịch vụ/Sản phẩm",
    keywords: ["sản phẩm", "products", "dịch vụ", "services"],
    icon: Package,
    page: "products" as PageType,
  },
  {
    id: "analytics",
    label: "Phân tích",
    keywords: ["phân tích", "analytics", "báo cáo", "charts"],
    icon: BarChart2,
    page: "analytics" as PageType,
  },
  {
    id: "ai-insights",
    label: "AI Insights",
    keywords: ["ai", "insights", "dự báo", "prediction"],
    icon: Zap,
    page: "ai-insights" as PageType,
  },
];

interface HeaderProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  user: any;
  setUser: (user: any) => void;
  onLogout: () => void;
}

const Header = ({
  currentPage,
  setCurrentPage,
  user,
  setUser,
  onLogout
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(searchOptions);
  const searchRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setShowSearchResults(false);
      return;
    }
    const filtered = searchOptions.filter((option) => 
      option.label.toLowerCase().includes(query.toLowerCase()) ||
      option.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredOptions(filtered);
    setShowSearchResults(true);
  };

  const handleSearchSelect = (option: any) => {
    handlePageChange(option.page);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handlePageChange("home")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <BarChart2 className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">AI CRM</h1>
          </motion.div>

          <nav className="hidden lg:flex items-center space-x-6">
            {[
              { id: "home", label: "Dashboard", adminOnly: false },
              { id: "customers", label: "Khách hàng", adminOnly: true },
              { id: "products", label: "Sản phẩm", adminOnly: true },
              { id: "analytics", label: "Báo cáo", adminOnly: true },
              { id: "ai-insights", label: "AI Insights", adminOnly: true },
            ].map((item) => {
              if (item.adminOnly && (!user || user.role !== 'admin')) return null;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id as PageType)}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === item.id ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-100 border-none rounded-full text-sm w-48 focus:w-64 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
              />
              <AnimatePresence>
                {showSearchResults && (
                  <motion.div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    {filteredOptions.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleSearchSelect(opt)}
                        className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-blue-50 transition-colors"
                      >
                        <opt.icon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{opt.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                {user.role === "admin" && (
                  <button
                    onClick={() => handlePageChange("admin")}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handlePageChange("profile")}
                  className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user.fullName || user.email}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={() => handlePageChange("auth")}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md transition-all"
              >
                Đăng nhập
              </button>
            )}
          </div>

          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Mobile links here */}
              {["home", "customers", "products", "analytics", "ai-insights"].map(id => (
                <button
                  key={id}
                  onClick={() => { handlePageChange(id as PageType); setIsMenuOpen(false); }}
                  className="block w-full text-left py-2 text-gray-600 font-medium capitalize"
                >
                  {id.replace("-", " ")}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
