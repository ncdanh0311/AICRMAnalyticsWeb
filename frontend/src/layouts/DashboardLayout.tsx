import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  BrainCircuit, 
  LogOut,
  User as UserIcon,
  Bell,
  Search
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Tổng quan', path: '/', icon: LayoutDashboard },
    { name: 'Khách hàng', path: '/customers', icon: Users },
    { name: 'Phân tích', path: '/analytics', icon: BarChart3 },
    { name: 'Gợi ý AI', path: '/ai-insights', icon: BrainCircuit },
  ];

  const handleLogout = () => {
    // Clear tokens and redirect
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-surface-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-surface-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-surface-900">AI CRM</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-surface-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-medium text-surface-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-8">
          <div className="flex items-center bg-surface-50 border border-surface-200 rounded-lg px-3 py-1.5 w-96">
            <Search className="w-4 h-4 text-surface-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm khách hàng, báo cáo..." 
              className="bg-transparent border-none outline-none text-sm ml-2 w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-surface-500 hover:bg-surface-50 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-surface-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-surface-900">Quản trị viên</p>
                <p className="text-xs text-surface-500">Hệ thống phân tích</p>
              </div>
              <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                <UserIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
