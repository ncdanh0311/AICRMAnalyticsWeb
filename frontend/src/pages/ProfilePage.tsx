import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Settings,
  Camera,
  Save,
  Edit,
  X,
  Check,
  Eye,
  EyeOff,
  Lock,
  CreditCard,
  ShoppingBag,
  Clock,
  Key,
} from "lucide-react";
import { User as UserType } from "../types";
import { formatDisplayName, getFullName } from "../utils/nameUtils";

interface ProfilePageProps {
  user: UserType;
  onBack: () => void;
  onUpdateProfile?: (updatedUser: UserType) => void;
  onShowNotification?: (type: "success" | "error", message: string) => void;
}

const ProfilePage = ({
  user,
  onBack,
  onUpdateProfile,
  onShowNotification,
}: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "",
    gender: user.gender || "other",
  });

  // Validation states
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Cập nhật form data khi user thay đổi
  useEffect(() => {
    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      gender: user.gender || "other",
    });
  }, [user]);

  // Password change states
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password validation states
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password strength indicator
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: "",
    color: "",
  });

  const tabs = [
    { id: "personal", name: "Thông tin cá nhân", icon: User },
    { id: "security", name: "Bảo mật", icon: Shield },
    { id: "account", name: "Tài khoản", icon: Settings },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Real-time validation
    if (isEditing) {
      validateField(field, value);
    }
  };

  const validateField = (field: string, value: string) => {
    let error = "";

    switch (field) {
      case "fullName":
        if (value.trim().length === 0) {
          error = "Họ và tên không được để trống";
        } else if (!validateFullName(value)) {
          error = "Họ và tên phải từ 2 đến 50 ký tự";
        }
        break;
      case "email":
        if (value.trim().length === 0) {
          error = "Email không được để trống";
        } else if (!validateEmail(value)) {
          error = "Email không đúng định dạng";
        }
        break;
      case "phone":
        if (value.trim().length === 0) {
          error = "Số điện thoại không được để trống";
        } else if (!validatePhone(value)) {
          error = "Số điện thoại phải từ 10 đến 11 số";
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const validateFullName = (name: string) => {
    return name.trim().length >= 2 && name.trim().length <= 50;
  };

  const handleSave = () => {
    // Validation
    const errors: string[] = [];

    // Validate full name
    if (!validateFullName(formData.fullName)) {
      errors.push("Họ và tên phải từ 2 đến 50 ký tự");
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      errors.push("Email không đúng định dạng");
    }

    // Validate phone
    if (!validatePhone(formData.phone)) {
      errors.push("Số điện thoại phải từ 10 đến 11 số");
    }

    // Check if there are any errors
    if (errors.length > 0) {
      const errorMessage = errors.join("\n");
      if (onShowNotification) {
        onShowNotification("error", errorMessage);
      } else {
        alert(errorMessage);
      }
      return;
    }

    // Chỉ gửi các trường có thể thay đổi, KHÔNG gửi role, id, createdAt
    const updateData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      gender: formData.gender,
    };

    // Tạo object hoàn chỉnh cho TypeScript
    const updatedUser = {
      id: user.id,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      gender: formData.gender,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: new Date().toISOString(),
    };

    if (onUpdateProfile) {
      onUpdateProfile(updatedUser);
    }
    // Clear errors after successful save
    setErrors({
      fullName: "",
      email: "",
      phone: "",
    });
    setIsEditing(false);
  };

  // Password validation functions
  const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Mật khẩu phải có ít nhất 8 ký tự");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 chữ hoa");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 chữ thường");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 số");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Mật khẩu phải có ít nhất 1 ký tự đặc biệt");
    }

    return errors;
  };

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    let text = "";
    let color = "";

    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
        text = "Rất yếu";
        color = "bg-red-500";
        break;
      case 2:
        text = "Yếu";
        color = "bg-orange-500";
        break;
      case 3:
        text = "Trung bình";
        color = "bg-yellow-500";
        break;
      case 4:
        text = "Mạnh";
        color = "bg-blue-500";
        break;
      case 5:
        text = "Rất mạnh";
        color = "bg-green-500";
        break;
      default:
        text = "";
        color = "";
    }

    return { score, text, color };
  };

  const handlePasswordInputChange = (field: string, value: string) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Real-time validation
    let error = "";

    switch (field) {
      case "currentPassword":
        if (value.trim().length === 0) {
          error = "Vui lòng nhập mật khẩu hiện tại";
        }
        break;
      case "newPassword":
        const passwordErrors = validatePassword(value);
        if (passwordErrors.length > 0) {
          error = passwordErrors[0]; // Show first error
        }

        // Update password strength
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
        break;
      case "confirmPassword":
        if (value.trim().length === 0) {
          error = "Vui lòng xác nhận mật khẩu";
        } else if (value !== passwordData.newPassword) {
          error = "Mật khẩu xác nhận không khớp";
        }
        break;
    }

    setPasswordErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handlePasswordChange = async () => {
    const errors: string[] = [];

    // Validate current password
    if (!passwordData.currentPassword.trim()) {
      errors.push("Vui lòng nhập mật khẩu hiện tại");
    }

    // Validate new password
    const passwordErrors = validatePassword(passwordData.newPassword);
    if (passwordErrors.length > 0) {
      errors.push(...passwordErrors);
    }

    // Validate confirm password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.push("Mật khẩu xác nhận không khớp");
    }

    // Check if current password matches (in real app, this would be validated on backend)
    // Note: user.password might not be available in frontend for security reasons
    // So we'll let the backend handle this validation

    // Show errors if any
    if (errors.length > 0) {
      const errorMessage = errors.join("\n");
      if (onShowNotification) {
        onShowNotification("error", errorMessage);
      } else {
        alert(errorMessage);
      }
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${user.id}/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.id}`,
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        if (onShowNotification) {
          onShowNotification(
            "success",
            result.message || "Đổi mật khẩu thành công!"
          );
        } else {
          alert(result.message || "Đổi mật khẩu thành công!");
        }

        // Reset form
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setPasswordErrors({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setPasswordStrength({
          score: 0,
          text: "",
          color: "",
        });
        setShowPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
      } else {
        const error = await response.json();
        if (onShowNotification) {
          onShowNotification(
            "error",
            error.message || "Có lỗi xảy ra khi đổi mật khẩu"
          );
        } else {
          alert(error.message || "Có lỗi xảy ra khi đổi mật khẩu");
        }
      }
    } catch (error) {
      if (onShowNotification) {
        onShowNotification("error", "Có lỗi kết nối. Vui lòng thử lại sau.");
      } else {
        alert("Có lỗi kết nối. Vui lòng thử lại sau.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Chưa cập nhật";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getGenderText = (gender: string) => {
    switch (gender) {
      case "male":
        return "Nam";
      case "female":
        return "Nữ";
      case "other":
        return "Khác";
      default:
        return "Chưa cập nhật";
    }
  };

  const getAccountTypeText = (role: string) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "user":
        return "Khách hàng";
      default:
        return "Khách hàng";
    }
  };

  return (
    <motion.div
      className="bg-gray-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
              Quay lại
            </motion.button>
            <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.fullName.charAt(0).toUpperCase()
                  )}
                </div>
                <motion.button
                  className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera className="w-4 h-4" />
                </motion.button>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {getFullName(user.fullName)}
                </h2>
                <p className="text-gray-600 mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
                <p className="text-gray-600 mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {getAccountTypeText(user.role)}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Thành viên từ {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <motion.button
                onClick={() => {
                  if (isEditing) {
                    // Cancel editing - reset form and clear errors
                    setFormData({
                      fullName: user.fullName || "",
                      email: user.email || "",
                      phone: user.phone || "",
                      gender: user.gender || "other",
                    });
                    setErrors({
                      fullName: "",
                      email: "",
                      phone: "",
                    });
                  }
                  setIsEditing(!isEditing);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isEditing ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Edit className="w-4 h-4" />
                )}
                {isEditing ? "Hủy" : "Chỉnh sửa"}
              </motion.button>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-4 px-6 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                        activeTab === tab.id
                          ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Personal Information Tab */}
                {activeTab === "personal" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Thông tin cá nhân
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Họ và tên
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 ${
                              errors.fullName
                                ? "border-red-300 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                            }`}
                          />
                          {errors.fullName && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 ${
                              errors.email
                                ? "border-red-300 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                            }`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Số điện thoại
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 disabled:bg-gray-100 ${
                              errors.phone
                                ? "border-red-300 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                            }`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Giới tính
                          </label>
                          <select
                            value={formData.gender}
                            onChange={(e) =>
                              handleInputChange("gender", e.target.value)
                            }
                            disabled={!isEditing}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                          >
                            <option value="other">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                          </select>
                        </div>
                      </div>

                      {/* Account Information */}
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-lg font-medium text-gray-900 mb-3">
                            Thông tin tài khoản
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 flex items-center gap-2">
                                <Key className="w-4 h-4" />
                                ID tài khoản:
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {user.id}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Loại tài khoản:
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {getAccountTypeText(user.role)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Ngày tham gia:
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {formatDate(user.createdAt)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Cập nhật lần cuối:
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {formatDate(user.updatedAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <motion.button
                          onClick={() => {
                            // Cancel editing - reset form and clear errors
                            setFormData({
                              fullName: user.fullName || "",
                              email: user.email || "",
                              phone: user.phone || "",
                              gender: user.gender || "other",
                            });
                            setErrors({
                              fullName: "",
                              email: "",
                              phone: "",
                            });
                            setIsEditing(false);
                          }}
                          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Hủy
                        </motion.button>
                        <motion.button
                          onClick={handleSave}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Save className="w-4 h-4" />
                          Lưu thay đổi
                        </motion.button>
                      </div>
                    )}
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Bảo mật tài khoản
                    </h3>

                    {/* Password Section */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            Mật khẩu
                          </h4>
                          <p className="text-sm text-gray-600">
                            Cập nhật mật khẩu để bảo vệ tài khoản
                          </p>
                        </div>
                        <motion.button
                          onClick={() => {
                            if (isChangingPassword) {
                              // Cancel password change - reset form and clear errors
                              setPasswordData({
                                currentPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                              });
                              setPasswordErrors({
                                currentPassword: "",
                                newPassword: "",
                                confirmPassword: "",
                              });
                              setPasswordStrength({
                                score: 0,
                                text: "",
                                color: "",
                              });
                              setShowPassword(false);
                              setShowNewPassword(false);
                              setShowConfirmPassword(false);
                            }
                            setIsChangingPassword(!isChangingPassword);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isChangingPassword ? (
                            <X className="w-4 h-4" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                          {isChangingPassword ? "Hủy" : "Đổi mật khẩu"}
                        </motion.button>
                      </div>

                      {isChangingPassword && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Mật khẩu hiện tại
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                value={passwordData.currentPassword}
                                onChange={(e) =>
                                  handlePasswordInputChange(
                                    "currentPassword",
                                    e.target.value
                                  )
                                }
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                  passwordErrors.currentPassword
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }`}
                                placeholder="Nhập mật khẩu hiện tại"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {passwordErrors.currentPassword && (
                              <p className="mt-1 text-sm text-red-600">
                                {passwordErrors.currentPassword}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Mật khẩu mới
                            </label>
                            <div className="relative">
                              <input
                                type={showNewPassword ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                  handlePasswordInputChange(
                                    "newPassword",
                                    e.target.value
                                  )
                                }
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                  passwordErrors.newPassword
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }`}
                                placeholder="Nhập mật khẩu mới"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showNewPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {passwordErrors.newPassword && (
                              <p className="mt-1 text-sm text-red-600">
                                {passwordErrors.newPassword}
                              </p>
                            )}

                            {/* Password Strength Indicator */}
                            {passwordData.newPassword && (
                              <div className="mt-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm text-gray-600">
                                    Độ mạnh:
                                  </span>
                                  <span
                                    className={`text-sm font-medium px-2 py-1 rounded ${
                                      passwordStrength.color
                                        ? `${passwordStrength.color} text-white`
                                        : "bg-gray-200"
                                    }`}
                                  >
                                    {passwordStrength.text}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      passwordStrength.color || "bg-gray-300"
                                    }`}
                                    style={{
                                      width: `${
                                        (passwordStrength.score / 5) * 100
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">
                                  <p>Mật khẩu phải có:</p>
                                  <ul className="list-disc list-inside space-y-1 mt-1">
                                    <li
                                      className={
                                        passwordData.newPassword.length >= 8
                                          ? "text-green-600"
                                          : "text-gray-400"
                                      }
                                    >
                                      Ít nhất 8 ký tự
                                    </li>
                                    <li
                                      className={
                                        /[A-Z]/.test(passwordData.newPassword)
                                          ? "text-green-600"
                                          : "text-gray-400"
                                      }
                                    >
                                      Ít nhất 1 chữ hoa
                                    </li>
                                    <li
                                      className={
                                        /[a-z]/.test(passwordData.newPassword)
                                          ? "text-green-600"
                                          : "text-gray-400"
                                      }
                                    >
                                      Ít nhất 1 chữ thường
                                    </li>
                                    <li
                                      className={
                                        /[0-9]/.test(passwordData.newPassword)
                                          ? "text-green-600"
                                          : "text-gray-400"
                                      }
                                    >
                                      Ít nhất 1 số
                                    </li>
                                    <li
                                      className={
                                        /[!@#$%^&*(),.?":{}|<>]/.test(
                                          passwordData.newPassword
                                        )
                                          ? "text-green-600"
                                          : "text-gray-400"
                                      }
                                    >
                                      Ít nhất 1 ký tự đặc biệt
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Xác nhận mật khẩu mới
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={passwordData.confirmPassword}
                                onChange={(e) =>
                                  handlePasswordInputChange(
                                    "confirmPassword",
                                    e.target.value
                                  )
                                }
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                                  passwordErrors.confirmPassword
                                    ? "border-red-300 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }`}
                                placeholder="Nhập lại mật khẩu mới"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {passwordErrors.confirmPassword && (
                              <p className="mt-1 text-sm text-red-600">
                                {passwordErrors.confirmPassword}
                              </p>
                            )}
                          </div>

                          <div className="flex justify-end gap-3 pt-4">
                            <motion.button
                              onClick={() => {
                                // Cancel password change - reset form and clear errors
                                setPasswordData({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmPassword: "",
                                });
                                setPasswordErrors({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmPassword: "",
                                });
                                setPasswordStrength({
                                  score: 0,
                                  text: "",
                                  color: "",
                                });
                                setShowPassword(false);
                                setShowNewPassword(false);
                                setShowConfirmPassword(false);
                                setIsChangingPassword(false);
                              }}
                              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Hủy
                            </motion.button>
                            <motion.button
                              onClick={handlePasswordChange}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Check className="w-4 h-4" />
                              Cập nhật mật khẩu
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}

                {/* Account Tab */}
                {activeTab === "account" && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Thông tin tài khoản
                    </h3>

                    {/* Account Details */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        Chi tiết tài khoản
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                              <Key className="w-4 h-4" />
                              ID tài khoản
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {user.id}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                              <User className="w-4 h-4" />
                              Loại tài khoản
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {getAccountTypeText(user.role)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Ngày tham gia
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {formatDate(user.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Cập nhật lần cuối
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {formatDate(user.updatedAt)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {user.email}
                            </span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              Số điện thoại
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {user.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Status */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        Trạng thái tài khoản
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-50 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-green-900">
                                Hoạt động
                              </p>
                              <p className="text-sm text-green-700">
                                Tài khoản đang hoạt động bình thường
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Shield className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-blue-900">
                                Bảo mật
                              </p>
                              <p className="text-sm text-blue-700">
                                Tài khoản được bảo vệ an toàn
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-purple-900">
                                Xác thực
                              </p>
                              <p className="text-sm text-purple-700">
                                Thông tin đã được xác thực
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
