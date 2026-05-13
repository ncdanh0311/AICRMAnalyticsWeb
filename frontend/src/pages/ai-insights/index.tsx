import React, { useState } from 'react';
import { BrainCircuit, PieChart, TrendingDown, MessageSquare, Play, CheckCircle2, Loader2 } from 'lucide-react';
import api from '../../services/api';

const AIInsights: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, string>>({});

  const runAnalysis = async (type: string, endpoint: string) => {
    setLoading(type);
    try {
      const res = await api.post(endpoint);
      setResults(prev => ({ ...prev, [type]: res.data.message }));
    } catch (err) {
      console.error(err);
      setResults(prev => ({ ...prev, [type]: 'Error running analysis' }));
    } finally {
      setLoading(null);
    }
  };

  const tasks = [
    {
      id: 'segmentation',
      title: 'Phân khúc khách hàng',
      description: 'Phân nhóm khách hàng thành các phân khúc VIP, Thân thiết và Tiềm năng bằng thuật toán KMeans clustering dựa trên thói quen chi tiêu.',
      icon: PieChart,
      endpoint: '/ai/segmentation/',
      color: 'bg-purple-500'
    },
    {
      id: 'churn',
      title: 'Dự báo rời bỏ',
      description: 'Phân tích các mẫu hành vi để xác định những khách hàng có nguy cơ ngừng sử dụng dịch vụ. Sử dụng phân loại RandomForest.',
      icon: TrendingDown,
      endpoint: '/ai/churn/',
      color: 'bg-red-500'
    },
    {
      id: 'sentiment',
      title: 'Phân tích cảm xúc',
      description: 'Tự động phân loại phản hồi của khách hàng thành Tích cực, Trung lập hoặc Tiêu cực bằng công nghệ NLP cho tiếng Việt.',
      icon: MessageSquare,
      endpoint: '/ai/sentiment/',
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Trung tâm phân tích AI</h1>
        <p className="text-surface-500">Chạy các mô hình học máy để trích xuất những thông tin chi tiết từ dữ liệu của bạn.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {tasks.map((task) => {
          const Icon = task.icon;
          const isLoading = loading === task.id;
          const result = results[task.id];

          return (
            <div key={task.id} className="card flex flex-col">
              <div className="p-6 flex-1">
                <div className={`w-12 h-12 ${task.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-surface-900 mb-2">{task.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed mb-6">
                  {task.description}
                </p>

                {result && (
                  <div className="flex items-start gap-2 p-3 bg-green-50 text-green-700 rounded-lg border border-green-100 text-xs mb-4">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{result}</p>
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-surface-50 border-t border-surface-100 mt-auto">
                <button 
                  disabled={!!loading}
                  onClick={() => runAnalysis(task.id, task.endpoint)}
                  className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                    isLoading 
                      ? 'bg-surface-200 text-surface-400 cursor-not-allowed'
                      : 'bg-white text-surface-900 border border-surface-200 hover:border-primary-500 hover:text-primary-600 shadow-sm'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  {isLoading ? 'Đang xử lý...' : 'Chạy phân tích'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Model Information */}
      <div className="card p-8 bg-surface-900 text-white overflow-hidden relative">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Hoạt động như thế nào?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <p className="font-semibold">Chuẩn bị dữ liệu</p>
                  <p className="text-sm text-surface-400">Hệ thống tổng hợp các hoạt động của khách hàng, nhật ký chi tiêu và phản hồi.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <p className="font-semibold">Thực thi mô hình</p>
                  <p className="text-sm text-surface-400">Các thuật toán Scikit-learn xử lý dữ liệu để tìm ra các phân khúc và dự báo rủi ro.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <p className="font-semibold">Cung cấp thông tin</p>
                  <p className="text-sm text-surface-400">Kết quả được lưu lại vào cơ sở dữ liệu và hiển thị ngay lập tức trên trang tổng quan.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block opacity-20">
            <BrainCircuit className="w-64 h-64 mx-auto" />
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-[120px] -mr-32 -mt-32"></div>
      </div>
    </div>
  );
};

export default AIInsights;
