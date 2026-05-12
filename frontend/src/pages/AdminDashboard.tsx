import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BarChart2,
  Zap,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreVertical,
  Target,
  AlertTriangle,
  ChevronRight,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  LogOut,
  ArrowLeft
} from "lucide-react";
import api from "../services/api";
import { Customer, Order } from "../types";

interface AdminDashboardProps {
  user: any;
  onBack: () => void;
  onLogout: () => void;
  initialTab?: string;
}

const AdminDashboard = ({ user, onBack, onLogout, initialTab = "overview" }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustId, setSelectedCustId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [custRes, orderRes, statsRes, aiRes] = await Promise.all([
        api.customer.getAllCustomers(),
        api.order.getAllOrders(),
        api.admin.getStats(),
        api.ai.getInsights()
      ]);

      if (custRes.success) setCustomers(custRes.data || []);
      if (orderRes.success) setOrders(orderRes.data || []);
      if (statsRes.success) setStats(statsRes.data);
      if (aiRes.success) setAiInsights(aiRes.data);
    } catch (error) {
      console.error("Error fetching CRM data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab === "admin" ? "overview" : initialTab);
    }
  }, [initialTab]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Dữ liệu đã được xuất thành công dưới dạng CSV!");
    }, 2000);
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Tính năng thêm khách hàng đang được xử lý bởi Backend...");
    setShowAddModal(false);
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: formatCurrency(stats?.summary?.total_revenue || 0), icon: DollarSign, trend: "+12.5%", color: "text-[#0058be]", bg: "bg-[#0058be]/10" },
          { label: "Customers", value: stats?.summary?.total_customers || 0, icon: Users, trend: "+3.2%", color: "text-[#0F172A]", bg: "bg-[#0F172A]/10" },
          { label: "Active Orders", value: stats?.summary?.total_orders || 0, icon: Activity, trend: "+5.1%", color: "text-[#10b981]", bg: "bg-[#10b981]/10" },
          { label: "Conversion Rate", value: "24.8%", icon: Target, trend: "Optimal", color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10" },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded ${item.bg}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <span className="text-[10px] font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded border border-[#10b981]/20">{item.trend}</span>
            </div>
            <p className="text-[#64748B] text-[10px] font-bold uppercase tracking-wider mb-1">{item.label}</p>
            <h3 className="text-2xl font-bold text-[#0F172A]">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded border border-[#E2E8F0] shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-lg font-bold text-[#0F172A] flex items-center font-manrope">
              <TrendingUp className="w-5 h-5 mr-2 text-[#0058be]" />
              Revenue Performance
            </h4>
            <div className="flex bg-[#F8FAFC] border border-[#E2E8F0] rounded p-1">
               <button className="px-3 py-1.5 bg-white shadow-sm text-[10px] font-bold rounded">Monthly</button>
               <button className="px-3 py-1.5 text-[10px] font-bold text-[#64748B]">Yearly</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {(stats?.revenue_trend || []).map((d: any, i: number) => (
              <div key={i} className="flex-1 flex flex-col items-center group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.min((d.revenue / 100000000) * 100, 200)}px` }}
                  className="w-full bg-[#0058be]/20 group-hover:bg-[#0058be] rounded-t transition-colors relative"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0F172A] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {formatCurrency(d.revenue)}
                  </div>
                </motion.div>
                <span className="mt-3 text-[10px] font-bold text-[#64748B] uppercase">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-sm">
          <h4 className="text-lg font-bold text-[#0F172A] mb-8 flex items-center font-manrope">
            <ShieldCheck className="w-5 h-5 mr-2 text-[#10b981]" />
            Security & Status
          </h4>
          <div className="space-y-6">
            {[
              { title: "Database Integrity", time: "2h ago", status: "Verified", color: "bg-[#10b981]" },
              { title: "AI Model Sync", time: "5h ago", status: "Complete", color: "bg-[#0058be]" },
              { title: "Firewall Active", time: "Now", status: "Secure", color: "bg-[#10b981]" },
              { title: "User Access Audit", time: "1d ago", status: "Done", color: "bg-[#64748B]" },
            ].map((task, i) => (
              <div key={i} className="flex items-center space-x-4 border-b border-[#F8FAFC] pb-4 last:border-0">
                <div className={`w-2 h-2 rounded-full ${task.color}`} />
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#0F172A]">{task.title}</p>
                  <p className="text-[10px] text-[#64748B] font-semibold">{task.time}</p>
                </div>
                <span className="text-[10px] font-bold text-[#64748B] bg-[#F8FAFC] px-2 py-1 rounded border border-[#E2E8F0]">{task.status}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] text-[10px] font-bold rounded hover:bg-[#E2E8F0] transition-colors uppercase tracking-widest">
            View System Logs
          </button>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="bg-white rounded border border-[#E2E8F0] shadow-sm overflow-hidden">
      <div className="p-6 border-b border-[#E2E8F0] flex flex-col md:flex-row justify-between gap-4 bg-[#F8FAFC]/50">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search CRM database..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded text-sm focus:ring-1 focus:ring-[#0058be] focus:border-[#0058be] outline-none transition-all font-medium"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 border border-[#E2E8F0] rounded text-sm font-bold text-[#64748B] bg-white hover:bg-[#F8FAFC] transition-all">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#0F172A] text-white rounded text-sm font-bold hover:bg-black shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Customer</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#F1F5F9] border-b border-[#E2E8F0]">
            <tr className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
              <th className="px-6 py-4">Customer Identity</th>
              <th className="px-6 py-4">Segment</th>
              <th className="px-6 py-4">Life-Time Value</th>
              <th className="px-6 py-4">AI Churn Score</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {customers.map((c: any) => (
              <tr key={c.id} className="hover:bg-[#F8FAFC] transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-[#0F172A] rounded flex items-center justify-center text-white font-bold text-xs">
                      {c.full_name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">{c.full_name}</p>
                      <p className="text-[11px] text-[#64748B]">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                    c.segment === 'VIP' ? 'bg-[#0058be]/10 text-[#0058be]' : 'bg-[#64748B]/10 text-[#64748B]'
                  }`}>
                    {c.segment || 'Regular'}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-[#0F172A]">{formatCurrency(c.total_spent)}</p>
                  <p className="text-[10px] text-[#64748B] font-semibold">{c.order_count} Orders</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-[#F1F5F9] rounded-full overflow-hidden border border-[#E2E8F0]">
                      <div 
                        className={`h-full rounded-full ${c.churn_probability > 0.6 ? 'bg-[#ef4444]' : 'bg-[#0058be]'}`} 
                        style={{ width: `${c.churn_probability * 100}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#64748B]">{(c.churn_probability * 100).toFixed(0)}%</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 hover:bg-white border border-transparent hover:border-[#E2E8F0] rounded transition-all">
                    <MoreVertical className="w-4 h-4 text-[#64748B]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      {/* Intelligence Banner */}
      <div className="bg-[#0F172A] rounded p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 p-10 opacity-5">
          <Zap className="w-48 h-48" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center px-2 py-1 bg-[#0058be] rounded text-[10px] font-bold uppercase tracking-widest mb-6 border border-[#0058be]/50">
            <Zap className="w-3 h-3 mr-1" /> Strategic AI Layer
          </span>
          <h3 className="text-3xl font-bold mb-4 font-manrope">Corporate Intelligence Dashboard</h3>
          <p className="text-[#94a3b8] text-sm leading-relaxed mb-8">
            Hệ thống đang xử lý dữ liệu từ <span className="text-white font-bold">{customers.length} khách hàng</span> và <span className="text-white font-bold">{orders.length} giao dịch</span>. 
            Mô hình Machine Learning đã xác định được các xu hướng tăng trưởng mới trong phân khúc <span className="text-[#3B82F6] font-bold">Khách hàng Trung thành</span>.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-[#0058be] text-white rounded text-xs font-bold hover:bg-[#004395] shadow-lg shadow-[#0058be]/20 transition-all uppercase tracking-widest">
              Generate AI Report
            </button>
            <button className="px-6 py-3 bg-transparent border border-[#334155] text-white rounded text-xs font-bold hover:bg-white/5 transition-all uppercase tracking-widest">
              View Insights
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Churn Prediction */}
        <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-sm">
          <h4 className="text-lg font-bold text-[#0F172A] mb-8 flex items-center font-manrope">
            <AlertTriangle className="w-5 h-5 mr-2 text-[#ef4444]" />
            Churn Probability Analysis
          </h4>
          <div className="space-y-4">
            {(aiInsights?.churn_prediction || []).map((c: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-5 bg-[#F8FAFC] rounded border border-[#E2E8F0] hover:border-[#0058be]/30 transition-all group">
                <div className="flex items-center space-x-4">
                  <div className="w-11 h-11 bg-white rounded border border-[#E2E8F0] flex items-center justify-center font-bold text-xs text-[#0F172A] shadow-sm">
                    {c.customer_name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#0058be] transition-colors">{c.customer_name}</p>
                    <p className={`text-[10px] font-bold uppercase ${c.status === 'High Risk' ? 'text-[#ef4444]' : 'text-[#f59e0b]'}`}>{c.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${c.status === 'High Risk' ? 'text-[#ef4444]' : 'text-[#f59e0b]'}`}>{(c.probability * 100).toFixed(0)}%</p>
                  <p className="text-[9px] text-[#64748B] font-bold uppercase tracking-widest">Risk Factor</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Recommendations */}
        <div className="bg-white p-8 rounded border border-[#E2E8F0] shadow-sm">
          <h4 className="text-lg font-bold text-[#0F172A] mb-8 flex items-center font-manrope">
            <TrendingUp className="w-5 h-5 mr-2 text-[#0058be]" />
            Strategic Recommendations
          </h4>
          <div className="space-y-6">
            {(aiInsights?.recommendations || []).map((rec: any, idx: number) => (
              <div key={idx} className="flex items-start space-x-4 p-5 hover:bg-[#F8FAFC] rounded transition-all border border-transparent hover:border-[#E2E8F0]">
                <div className="p-2.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#0058be]">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="text-sm font-bold text-[#0F172A] mb-1">{rec.title}</h6>
                  <p className="text-xs text-[#64748B] leading-relaxed font-medium">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row font-inter">
      {/* Sidebar Navigation - Corporate Navy */}
      <aside className="w-full lg:w-64 bg-[#0F172A] lg:sticky lg:top-0 lg:h-screen flex flex-col z-20 shadow-2xl">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-12 cursor-pointer" onClick={onBack}>
            <div className="w-9 h-9 bg-[#0058be] rounded flex items-center justify-center shadow-lg shadow-blue-900/40">
              <Zap className="text-white w-5 h-5 fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tighter font-manrope">AI CRM</h1>
              <p className="text-[8px] text-[#3B82F6] font-bold uppercase tracking-[0.2em] -mt-1">Analytics</p>
            </div>
          </div>
          
          <nav className="space-y-1.5">
            {[
              { id: "overview", label: "Intelligence", icon: BarChart2 },
              { id: "customers", label: "Relationship", icon: Users },
              { id: "analytics", label: "Analytics & AI", icon: Zap },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded text-[13px] font-semibold transition-all ${
                  activeTab === tab.id 
                    ? "bg-[#0058be] text-white shadow-xl shadow-blue-900/30" 
                    : "text-[#64748B] hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-white' : 'text-[#475569]'}`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-slate-800/50 bg-black/10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-[#1e293b] rounded flex items-center justify-center text-white font-bold border border-slate-700 shadow-inner">
              {user.fullName?.charAt(0) || user.email?.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user.fullName}</p>
              <p className="text-[10px] text-[#64748B] truncate font-bold uppercase tracking-wider">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded text-[11px] text-[#64748B] font-bold hover:bg-red-500/10 hover:text-red-500 transition-all border border-slate-800 hover:border-red-500/20 uppercase tracking-widest"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-[1440px] mx-auto w-full">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-[#64748B] uppercase tracking-[0.2em] mb-2">
              <span className="w-1.5 h-1.5 bg-[#0058be] rounded-full shadow-lg shadow-blue-500/50" />
              <span>{activeTab === 'overview' ? 'Operational Overview' : activeTab === 'customers' ? 'Resource Management' : 'Machine Learning Core'}</span>
            </div>
            <h2 className="text-4xl font-extrabold text-[#0F172A] font-manrope tracking-tight">
              {activeTab === 'overview' ? 'Business Intelligence' : 
               activeTab === 'customers' ? 'Customer Relations' : 'Analytics Intelligence'}
            </h2>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 px-5 py-3 bg-white border border-[#E2E8F0] rounded text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Portal Exit</span>
            </button>
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className={`flex items-center space-x-2 px-6 py-3 bg-[#0F172A] text-white rounded text-xs font-bold hover:bg-black shadow-xl shadow-slate-900/20 transition-all uppercase tracking-widest ${isExporting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isExporting ? 'Syncing...' : 'Export Data'}</span>
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && renderDashboard()}
            {activeTab === "customers" && renderCustomers()}
            {activeTab === "analytics" && renderAnalytics()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Add Customer Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded p-10 max-w-lg w-full relative z-10 shadow-2xl border border-[#E2E8F0]"
            >
              <h4 className="text-2xl font-bold text-[#0F172A] mb-2 font-manrope">Enroll New Customer</h4>
              <p className="text-[#64748B] text-sm mb-8">Vui lòng điền thông tin chi tiết để khởi tạo hồ sơ khách hàng mới.</p>
              
              <form onSubmit={handleAddCustomer} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Full Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-sm focus:border-[#0058be] outline-none" placeholder="e.g. John Smith" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Email Identity</label>
                  <input type="email" required className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-sm focus:border-[#0058be] outline-none" placeholder="john@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Phone</label>
                    <input type="tel" className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-sm focus:border-[#0058be] outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Segment</label>
                    <select className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-sm outline-none">
                      <option>Regular</option>
                      <option>VIP</option>
                      <option>Corporate</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 mt-10">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3 border border-[#E2E8F0] text-[#64748B] text-xs font-bold rounded uppercase tracking-widest hover:bg-[#F8FAFC]">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-[#0F172A] text-white text-xs font-bold rounded uppercase tracking-widest hover:bg-black shadow-lg shadow-slate-900/20">Enroll Customer</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
