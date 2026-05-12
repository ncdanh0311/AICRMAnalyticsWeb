import {
  BarChart2,
  Users,
  Zap,
  TrendingUp,
  Shield,
  Search,
  MessageCircle,
  ChevronRight,
  Target,
  ArrowRight,
  PieChart,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { Product, Category } from "../types";

interface HomePageProps {
  products: Product[];
  categories: Category[];
  setCurrentPage: (page: any) => void;
  onViewDetail?: (product: Product) => void;
}

const HomePage = ({
  products,
  categories,
  setCurrentPage,
  onViewDetail,
}: HomePageProps) => {
  
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-blue-100 text-blue-700 mb-6">
                  <Zap className="w-4 h-4 mr-2" />
                  Hệ thống AI CRM Thế hệ mới
                </span>
                <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
                  Chuyển đổi dữ liệu thành <span className="text-blue-600">Sức mạnh tăng trưởng</span>
                </h1>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Tận dụng sức mạnh của AI để phân tích hành vi, dự báo doanh thu và phân nhóm khách hàng tự động. Giúp doanh nghiệp tối ưu 70% chi phí Marketing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={() => handlePageChange("admin")}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center group"
                  >
                    Bắt đầu ngay
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => handlePageChange("products")}
                    className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all"
                  >
                    Tìm hiểu dịch vụ
                  </button>
                </div>
              </motion.div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 opacity-60">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-gray-900">500+</span>
                  <span className="text-sm font-bold text-gray-500 uppercase">Doanh nghiệp</span>
                </div>
                <div className="w-px h-10 bg-gray-300" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-gray-900">98%</span>
                  <span className="text-sm font-bold text-gray-500 uppercase">Hài lòng</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative z-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <BarChart2 className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Revenue Insight</h4>
                      <p className="text-xs text-gray-400 font-medium">Real-time processing</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-black">+24.5%</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "VIP Segments", val: "78%", color: "bg-blue-600" },
                    { label: "New Customers", val: "42%", color: "bg-purple-600" },
                    { label: "Retention Rate", val: "91%", color: "bg-green-500" }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold text-gray-700">
                        <span>{item.label}</span>
                        <span>{item.val}</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: item.val }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400 rounded-full blur-[100px] opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-400 rounded-full blur-[100px] opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Giải pháp thông minh cho CRM</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">Tích hợp các công nghệ tiên tiến nhất để giúp bạn thấu hiểu khách hàng sâu sắc hơn bao giờ hết.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Phân nhóm AI", desc: "Sử dụng thuật toán K-Means để tự động phân nhóm khách hàng theo hành vi.", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
              { title: "Dự báo doanh thu", desc: "Mô hình Linear Regression giúp dự đoán chính xác doanh thu trong tương lai.", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
              { title: "Churn Analysis", desc: "Nhận diện sớm khách hàng có nguy cơ rời bỏ để kịp thời chăm sóc.", icon: Activity, color: "text-red-600", bg: "bg-red-50" },
              { title: "Smart Reporting", desc: "Hệ thống báo cáo real-time với các biểu đồ trực quan, sinh động.", icon: PieChart, color: "text-purple-600", bg: "bg-purple-50" },
            ].map((f, i) => (
              <motion.div 
                key={i}
                className="p-8 rounded-[2rem] border border-gray-100 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-100 transition-all group"
                whileHover={{ y: -10 }}
              >
                <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`w-7 h-7 ${f.color}`} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tight">Sẵn sàng để đột phá doanh thu?</h2>
              <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto font-medium">Đăng ký trải nghiệm ngay hôm nay và nhận bản phân tích CRM miễn phí cho doanh nghiệp của bạn.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => handlePageChange("auth")}
                  className="px-10 py-5 bg-white text-blue-900 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl"
                >
                  Bắt đầu miễn phí
                </button>
                <button className="px-10 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Liên hệ chuyên gia
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-12">Được tin dùng bởi các tập đoàn hàng đầu</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 grayscale opacity-40">
            <h3 className="text-2xl font-black italic">TECHCOMBANK</h3>
            <h3 className="text-2xl font-black italic">VNPT</h3>
            <h3 className="text-2xl font-black italic">VIB</h3>
            <h3 className="text-2xl font-black italic">FPT SOFTWARE</h3>
            <h3 className="text-2xl font-black italic">VIETJET AIR</h3>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
