import React, { useEffect, useState } from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone, ExternalLink } from 'lucide-react';
import api from '../../services/api';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/customers/');
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSegmentBadge = (segment: string) => {
    switch (segment?.toLowerCase()) {
      case 'vip': return 'bg-purple-100 text-purple-700';
      case 'regular': return 'bg-blue-100 text-blue-700';
      case 'low-value': return 'bg-gray-100 text-gray-700';
      default: return 'bg-surface-100 text-surface-600';
    }
  };

  const getRiskBadge = (risk: string) => {
    const riskLabel = risk?.toLowerCase();
    if (riskLabel?.includes('high')) return 'bg-red-100 text-red-700';
    if (riskLabel?.includes('medium')) return 'bg-orange-100 text-orange-700';
    if (riskLabel?.includes('low')) return 'bg-green-100 text-green-700';
    return 'bg-surface-100 text-surface-600';
  };

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const loyaltyMap: Record<string, string> = {
    'bronze': 'Đồng',
    'silver': 'Bạc',
    'gold': 'Vàng',
    'platinum': 'Bạch kim'
  };

  const genderMap: Record<string, string> = {
    'male': 'Nam',
    'female': 'Nữ',
    'other': 'Khác'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Quản lý khách hàng</h1>
          <p className="text-surface-500">Xem và quản lý cơ sở dữ liệu khách hàng với thông tin từ AI.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Gửi thông báo
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm khách hàng..." 
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2 py-2">
            <Filter className="w-4 h-4" />
            Bộ lọc
          </button>
          <button className="btn-secondary py-2">Xuất CSV</button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-50 border-b border-surface-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-surface-500 uppercase">Khách hàng</th>
              <th className="px-6 py-4 text-xs font-semibold text-surface-500 uppercase">Phân khúc</th>
              <th className="px-6 py-4 text-xs font-semibold text-surface-500 uppercase">Hạng thẻ</th>
              <th className="px-6 py-4 text-xs font-semibold text-surface-500 uppercase">Rủi ro rời bỏ</th>
              <th className="px-6 py-4 text-xs font-semibold text-surface-500 uppercase">Chi tiêu</th>
              <th className="px-6 py-4 text-xs font-semibold text-surface-500 uppercase">Hài lòng</th>
              <th className="px-6 py-4 text-xs font-semibold text-surface-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {loading ? (
              <tr><td colSpan={7} className="px-6 py-10 text-center text-surface-500">Đang tải dữ liệu...</td></tr>
            ) : filteredCustomers.length === 0 ? (
              <tr><td colSpan={7} className="px-6 py-10 text-center text-surface-500">Không tìm thấy khách hàng nào.</td></tr>
            ) : filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-surface-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">{customer.name}</p>
                      <p className="text-xs text-surface-500">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSegmentBadge(customer.segment)}`}>
                    {customer.segment || 'Chưa có'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-surface-700">
                    {loyaltyMap[customer.loyalty_level.toLowerCase()] || customer.loyalty_level}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBadge(customer.churn_risk)}`}>
                    {customer.churn_risk || 'Chưa phân tích'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-surface-900">{formatVND(customer.total_spending)}</p>
                  <p className="text-xs text-surface-500">{customer.order_count} đơn hàng</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-surface-900">{customer.satisfaction_score}</span>
                    <span className="text-xs text-surface-400">/5.0</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-surface-100 rounded-lg transition-colors">
                    <ExternalLink className="w-4 h-4 text-surface-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
