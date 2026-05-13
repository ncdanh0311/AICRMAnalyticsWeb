import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { 
  Users, 
  DollarSign, 
  TrendingDown, 
  Smile,
  ArrowUpRight,
  ArrowDownRight,
  BrainCircuit
} from 'lucide-react';
import api from '../../services/api';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/analytics/dashboard/');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full">Loading...</div>;

  const revenueChartOptions = {
    chart: {
      id: 'revenue-trend',
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#3b82f6'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100]
      }
    },
    xaxis: {
      categories: data?.charts?.revenue_trend?.map((d: any) => d.date) || [],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { show: false } },
    grid: { show: false },
    tooltip: { x: { show: true } },
  };

  const revenueChartSeries = [{
    name: 'Doanh thu',
    data: data?.charts?.revenue_trend?.map((d: any) => d.amount) || []
  }];

  const segmentationOptions = {
    labels: data?.charts?.segmentation?.map((s: any) => s.segment || 'Chưa phân loại') || [],
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    legend: { position: 'bottom' as const },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Tổng cộng',
              formatter: () => (data?.cards?.total_customers || 0).toString()
            }
          }
        }
      }
    }
  };

  const segmentationSeries = data?.charts?.segmentation?.map((s: any) => s.count) || [];

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Tổng quan hệ thống</h1>
        <p className="text-surface-500">Chào mừng trở lại, đây là những diễn biến mới nhất về khách hàng của bạn.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Tổng khách hàng" 
          value={(data?.cards?.total_customers || 0).toLocaleString()} 
          icon={Users} 
          trend="+12.5%" 
          positive={true} 
        />
        <StatCard 
          title="Tổng doanh thu" 
          value={formatVND(data?.cards?.total_revenue || 0)} 
          icon={DollarSign} 
          trend="+8.2%" 
          positive={true} 
        />
        <StatCard 
          title="Tỷ lệ rời bỏ" 
          value={`${data?.cards?.churn_rate || 0}%`} 
          icon={TrendingDown} 
          trend="-2.4%" 
          positive={true} 
        />
        <StatCard 
          title="Mức độ hài lòng" 
          value={`${data?.cards?.satisfaction || 0}/5.0`} 
          icon={Smile} 
          trend="+0.3" 
          positive={true} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-surface-900">Tăng trưởng doanh thu</h3>
            <select className="text-xs border border-surface-200 rounded px-2 py-1 outline-none">
              <option>7 ngày qua</option>
              <option>30 ngày qua</option>
            </select>
          </div>
          <Chart options={revenueChartOptions as any} series={revenueChartSeries} type="area" height={300} />
        </div>

        {/* Customer Segmentation */}
        <div className="card p-6">
          <h3 className="font-semibold text-surface-900 mb-6">Phân nhóm khách hàng</h3>
          <Chart options={segmentationOptions as any} series={segmentationSeries} type="donut" height={300} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity Mockup */}
        <div className="card">
          <div className="p-6 border-b border-surface-100 flex items-center justify-between">
            <h3 className="font-semibold text-surface-900">Hoạt động khách hàng gần đây</h3>
            <button className="text-sm text-primary-600 font-medium">Xem tất cả</button>
          </div>
          <div className="p-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border-b border-surface-50 last:border-0 hover:bg-surface-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-100 flex items-center justify-center text-surface-600 font-medium text-sm">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-900">Khách hàng #{i + 1000}</p>
                    <p className="text-xs text-surface-500">Vừa thực hiện giao dịch mới</p>
                  </div>
                </div>
                <p className="text-xs text-surface-400">{i * 15} phút trước</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="card p-6 bg-primary-900 text-white border-none shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <BrainCircuit className="w-6 h-6 text-primary-400" />
            <h3 className="font-semibold text-lg">Gợi ý thông minh từ AI</h3>
          </div>
          <div className="space-y-4">
            {data?.ai_insights?.map((insight: string, idx: number) => (
              <div key={idx} className="flex gap-3 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="w-2 h-2 mt-2 bg-primary-400 rounded-full flex-shrink-0"></div>
                <p className="text-sm leading-relaxed text-primary-50">{insight}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 bg-white text-primary-900 rounded-xl font-bold hover:bg-primary-50 transition-colors">
            Tạo báo cáo mới
          </button>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend: string;
  positive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, positive }) => (
  <div className="card p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-surface-500 font-medium">{title}</p>
        <h4 className="text-2xl font-bold text-surface-900 mt-1">{value}</h4>
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          <span>{trend}</span>
          <span className="text-surface-400 ml-1">so với tháng trước</span>
        </div>
      </div>
      <div className="p-3 bg-surface-50 rounded-xl">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
    </div>
  </div>
);

export default Dashboard;
