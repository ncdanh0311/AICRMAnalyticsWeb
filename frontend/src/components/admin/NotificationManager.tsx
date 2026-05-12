import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Gift,
  Zap,
  Star,
  Clock,
  Users,
  TrendingUp,
  Upload,
  X as XIcon,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isActive: boolean;
  image?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface NotificationFormData {
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isActive: boolean;
  image?: string;
  startDate: string;
  endDate: string;
}

interface NotificationManagerProps {
  user: any;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ user }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingNotification, setEditingNotification] =
    useState<Notification | null>(null);
  const [formData, setFormData] = useState<NotificationFormData>({
    title: "",
    message: "",
    type: "info",
    isActive: true,
    image: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = user.email || user.id;
      const response = await fetch("http://localhost:8000/api/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const token = user.email || user.id;
      const response = await fetch(
        "http://localhost:8000/api/admin/upload-image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, image: data.data.fullUrl }));
      } else {
        alert("Lỗi khi upload ảnh");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Lỗi khi upload ảnh");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = user.email || user.id;
      const url = editingNotification
        ? `http://localhost:8000/api/notifications/${editingNotification.id}`
        : "http://localhost:8000/api/notifications";

      const method = editingNotification ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchNotifications();
        resetForm();
        setShowForm(false);
      } else {
        const error = await response.json();
        alert(error.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error saving notification:", error);
      alert("Có lỗi xảy ra khi lưu thông báo");
    }
  };

  const handleEdit = (notification: Notification) => {
    setEditingNotification(notification);
    setFormData({
      title: notification.title,
      message: notification.message,
      type: notification.type,
      isActive: notification.isActive,
      image: notification.image || "",
      startDate: notification.startDate
        ? notification.startDate.split("T")[0]
        : "",
      endDate: notification.endDate ? notification.endDate.split("T")[0] : "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa thông báo này?")) return;

    try {
      const token = user.email || user.id;
      const response = await fetch(
        `http://localhost:8000/api/notifications/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchNotifications();
      } else {
        const error = await response.json();
        alert(error.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      alert("Có lỗi xảy ra khi xóa thông báo");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      type: "info",
      isActive: true,
      image: "",
      startDate: "",
      endDate: "",
    });
    setEditingNotification(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Gift className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const styles: Record<string, string> = {
      info: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
      success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
      warning: "bg-gradient-to-r from-yellow-500 to-orange-600 text-white",
      error: "bg-gradient-to-r from-red-500 to-pink-600 text-white",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
          styles[type] || styles.info
        }`}
      >
        {type.toUpperCase()}
      </span>
    );
  };

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case "success":
        return {
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          shadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)",
        };
      case "warning":
        return {
          background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
          shadow: "0 10px 25px -5px rgba(245, 158, 11, 0.3)",
        };
      case "error":
        return {
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          shadow: "0 10px 25px -5px rgba(239, 68, 68, 0.3)",
        };
      default:
        return {
          background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
          shadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
        };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "success":
        return "KHUYẾN MÃI";
      case "warning":
        return "CẢNH BÁO";
      case "error":
        return "QUAN TRỌNG";
      default:
        return "THÔNG BÁO";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              <Sparkles className="w-8 h-8 mr-3" />
              Quản lý thông báo
            </h2>
            <p className="text-blue-100 text-lg">
              Tạo và quản lý thông báo tổng cho người dùng
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{notifications.length}</div>
            <div className="text-blue-100">Thông báo</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {notifications.filter((n) => n.isActive).length}
              </div>
              <div className="text-sm text-gray-600">Đang hiển thị</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {notifications.filter((n) => n.type === "success").length}
              </div>
              <div className="text-sm text-gray-600">Khuyến mãi</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {notifications.filter((n) => n.startDate || n.endDate).length}
              </div>
              <div className="text-sm text-gray-600">Có lịch trình</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {notifications.length > 0
                  ? Math.round(
                      (notifications.filter((n) => n.isActive).length /
                        notifications.length) *
                        100
                    )
                  : 0}
                %
              </div>
              <div className="text-sm text-gray-600">Tỷ lệ hoạt động</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between">
        <div></div>
        <motion.button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Tạo thông báo mới</span>
        </motion.button>
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {editingNotification
                  ? "Chỉnh sửa thông báo"
                  : "Tạo thông báo mới"}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {showPreview ? "Ẩn" : "Xem"} preview
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tiêu đề
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Nhập tiêu đề thông báo"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loại thông báo
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as any,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="info">Thông tin</option>
                      <option value="success">Khuyến mãi</option>
                      <option value="warning">Cảnh báo</option>
                      <option value="error">Quan trọng</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nội dung
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Nhập nội dung thông báo"
                    required
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ảnh thông báo (tùy chọn)
                  </label>
                  <div className="space-y-3">
                    {formData.image ? (
                      <div className="relative">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-gray-300"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <XIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="image-upload"
                          disabled={uploadingImage}
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer flex flex-col items-center space-y-2"
                        >
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {uploadingImage
                              ? "Đang upload..."
                              : "Click để chọn ảnh"}
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ngày bắt đầu
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Ngày kết thúc
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isActive: e.target.checked,
                          })
                        }
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">
                        Đang hoạt động
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-semibold"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-semibold shadow-lg"
                  >
                    {editingNotification ? "Cập nhật" : "Tạo"}
                  </button>
                </div>
              </form>

              {/* Preview */}
              {showPreview && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Preview
                  </h4>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🔔</span>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          {formData.title || "Thông báo"}
                        </h2>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Image */}
                      {formData.image && (
                        <div className="mb-4">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Message */}
                      <div className="text-gray-700 text-sm">
                        {formData.message ||
                          "Nội dung thông báo sẽ hiển thị ở đây..."}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex border-t border-gray-200">
                      <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-blue-600 hover:bg-blue-50 transition-colors font-medium">
                        <span>Không hiển thị lại</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-red-600 hover:bg-red-50 transition-colors font-medium border-l border-gray-200">
                        <span>Đóng</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h3 className="text-xl font-bold text-gray-900">
            Danh sách thông báo ({notifications.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {notifications.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Chưa có thông báo nào</p>
              <p className="text-sm text-gray-400 mt-2">
                Tạo thông báo đầu tiên để bắt đầu
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getTypeIcon(notification.type)}
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {notification.title}
                      </h4>
                      {getTypeBadge(notification.type)}
                      {notification.isActive ? (
                        <span className="flex items-center text-green-600 text-sm font-medium">
                          <Eye className="w-4 h-4 mr-1" />
                          Đang hiển thị
                        </span>
                      ) : (
                        <span className="flex items-center text-gray-500 text-sm font-medium">
                          <EyeOff className="w-4 h-4 mr-1" />
                          Đã ẩn
                        </span>
                      )}
                    </div>

                    {/* Image Preview */}
                    {notification.image && (
                      <div className="mb-3">
                        <img
                          src={notification.image}
                          alt="Notification"
                          className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}

                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {notification.message}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Tạo:{" "}
                        {new Date(notification.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                      {notification.startDate && (
                        <span>
                          Từ:{" "}
                          {new Date(notification.startDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      )}
                      {notification.endDate && (
                        <span>
                          Đến:{" "}
                          {new Date(notification.endDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(notification)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationManager;
