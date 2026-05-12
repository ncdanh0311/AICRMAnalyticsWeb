import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  History,
  Plus,
  Minus,
  QrCode,
  Copy,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { walletApi } from "../services/api";
import { Wallet as WalletType, Transaction, DepositRequest } from "../types";

const WalletPage: React.FC = () => {
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "deposit" | "withdraw" | "history"
  >("overview");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [bankInfo, setBankInfo] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
    bankCode: "",
  });
  const [currentDeposit, setCurrentDeposit] = useState<DepositRequest | null>(
    null
  );
  const [depositStatus, setDepositStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<
    "success" | "pending" | "error" | "info"
  >("info");

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      const [walletRes, transactionsRes] = await Promise.all([
        walletApi.getBalance(),
        walletApi.getTransactions(),
      ]);

      if (walletRes.success && walletRes.data) {
        setWallet(walletRes.data);
      }

      if (transactionsRes.success && transactionsRes.data) {
        setTransactions(transactionsRes.data);
      }
    } catch (error) {
      console.error("Error loading wallet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseInt(depositAmount) < 10000) {
      alert("Số tiền phải từ 10,000đ trở lên");
      return;
    }

    try {
      setDepositStatus("loading");
      const response = await walletApi.createDeposit(parseInt(depositAmount));

      if (response.success && response.data) {
        setCurrentDeposit({
          id: response.data.depositId,
          userId: "",
          amount: response.data.amount,
          qrCode: response.data.qrCode,
          bankInfo: response.data.bankInfo,
          status: "pending",
          createdAt: new Date().toISOString(),
        });
        setDepositStatus("success");
        setActiveTab("deposit");
      } else {
        setDepositStatus("error");
        alert(response.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      setDepositStatus("error");
      console.error("Error creating deposit:", error);
      alert("Có lỗi xảy ra khi tạo yêu cầu nạp tiền");
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseInt(withdrawAmount) < 50000) {
      alert("Số tiền phải từ 50,000đ trở lên");
      return;
    }

    if (
      !bankInfo.accountNumber ||
      !bankInfo.accountName ||
      !bankInfo.bankName
    ) {
      alert("Vui lòng nhập đầy đủ thông tin ngân hàng");
      return;
    }

    if (!wallet || wallet.balance < parseInt(withdrawAmount)) {
      alert("Số dư không đủ");
      return;
    }

    try {
      const response = await walletApi.createWithdraw(
        parseInt(withdrawAmount),
        bankInfo
      );

      if (response.success && response.data) {
        alert(
          "Yêu cầu rút tiền đã được gửi. Admin sẽ xử lý trong thời gian sớm nhất."
        );
        setWithdrawAmount("");
        setBankInfo({
          accountNumber: "",
          accountName: "",
          bankName: "",
          bankCode: "",
        });
        loadWalletData(); // Reload wallet data
      } else {
        alert(response.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error creating withdraw:", error);
      alert("Có lỗi xảy ra khi tạo yêu cầu rút tiền");
    }
  };

  const checkDepositStatus = async () => {
    if (!currentDeposit) return;

    try {
      const response = await walletApi.checkDepositStatus(currentDeposit.id);

      if (response.success && response.data) {
        const status = response.data.status;

        // Cập nhật trạng thái hiện tại
        setCurrentDeposit((prev) =>
          prev
            ? {
                ...prev,
                status: status as "pending" | "confirmed" | "cancelled",
              }
            : null
        );

        // Hiển thị popup tương ứng với trạng thái và xử lý UI
        switch (status) {
          case "confirmed":
            loadWalletData(); // Reload wallet data
            setStatusType("success");
            setStatusMessage(
              "✅ Nạp tiền thành công! Số tiền đã được cộng vào ví."
            );
            // Sau khi thành công, quay về tab tổng quan để xem số dư mới
            setTimeout(() => {
              setActiveTab("overview");
              setCurrentDeposit(null);
              setDepositAmount("");
              setDepositStatus("idle");
            }, 2000); // Đợi 2 giây để user đọc thông báo
            break;
          case "pending":
            setStatusType("pending");
            setStatusMessage(
              "⏳ Giao dịch đang chờ xử lý. Vui lòng chờ admin xác nhận."
            );
            // Giữ nguyên ở giao diện nạp tiền để user có thể kiểm tra lại
            break;
          case "cancelled":
            setStatusType("error");
            setStatusMessage(
              "❌ Giao dịch đã bị từ chối. Vui lòng thử lại hoặc liên hệ admin."
            );
            // Sau khi bị từ chối, reset form để user tạo giao dịch mới
            setTimeout(() => {
              setCurrentDeposit(null);
              setDepositAmount("");
              setDepositStatus("idle");
            }, 2000);
            break;
          case "failed":
            setStatusType("error");
            setStatusMessage("❌ Giao dịch thất bại. Vui lòng thử lại sau.");
            // Sau khi thất bại, reset form để user tạo giao dịch mới
            setTimeout(() => {
              setCurrentDeposit(null);
              setDepositAmount("");
              setDepositStatus("idle");
            }, 2000);
            break;
          default:
            setStatusType("info");
            setStatusMessage(`ℹ️ Trạng thái giao dịch: ${status}`);
        }
        setShowStatusModal(true);
      } else {
        setStatusType("error");
        setStatusMessage(
          "❌ Không thể kiểm tra trạng thái giao dịch. Vui lòng thử lại."
        );
        setShowStatusModal(true);
      }
    } catch (error) {
      console.error("Error checking deposit status:", error);
      setStatusType("error");
      setStatusMessage(
        "❌ Có lỗi xảy ra khi kiểm tra trạng thái. Vui lòng thử lại."
      );
      setShowStatusModal(true);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <Plus className="w-5 h-5 text-green-500" />;
      case "withdraw":
        return <Minus className="w-5 h-5 text-red-500" />;
      case "purchase":
        return <CreditCard className="w-5 h-5 text-blue-500" />;
      default:
        return <Wallet className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin ví...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ví tiền</h1>
              <p className="text-gray-600 mt-1">
                Quản lý tài khoản và giao dịch
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Số dư hiện tại</p>
              <p className="text-3xl font-bold text-green-600">
                {wallet ? formatAmount(wallet.balance) : "0 ₫"}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Tổng quan", icon: Wallet },
                { id: "deposit", label: "Nạp tiền", icon: Plus },
                { id: "withdraw", label: "Rút tiền", icon: Minus },
                { id: "history", label: "Lịch sử", icon: History },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab("deposit")}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500 p-2 rounded-lg">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-900">
                          Nạp tiền
                        </h3>
                        <p className="text-sm text-green-600">
                          Thêm tiền vào ví
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("withdraw")}
                    className="bg-red-50 border border-red-200 rounded-lg p-4 hover:bg-red-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-500 p-2 rounded-lg">
                        <Minus className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-900">Rút tiền</h3>
                        <p className="text-sm text-red-600">
                          Rút tiền về ngân hàng
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Recent Transactions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Giao dịch gần đây
                  </h3>
                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <p className="font-medium text-gray-900">
                              {transaction.description}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(transaction.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              transaction.type === "deposit"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "deposit" ? "+" : "-"}
                            {formatAmount(transaction.amount)}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            {getStatusIcon(transaction.status)}
                            <span className="text-xs text-gray-500 capitalize">
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "deposit" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {!currentDeposit ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Nạp tiền vào ví
                    </h3>
                    <div className="max-w-md">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số tiền (VND)
                        </label>
                        <input
                          type="number"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          placeholder="Nhập số tiền (tối thiểu 10,000đ)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="10000"
                        />
                      </div>
                      <button
                        onClick={handleDeposit}
                        disabled={depositStatus === "loading"}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {depositStatus === "loading"
                          ? "Đang tạo..."
                          : "Tạo mã QR"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Quét mã QR để nạp tiền
                    </h3>
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-8 inline-block">
                      <img
                        src={currentDeposit.qrCode}
                        alt="QR Code"
                        className="w-80 h-80 mx-auto"
                        onError={(e) => {
                          console.error("QR Code load error:", e);
                          // Fallback to text display if QR fails
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>

                    <div className="mt-6 max-w-md mx-auto">
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ngân hàng:</span>
                          <span className="font-medium">
                            {currentDeposit.bankInfo.bankName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Số tài khoản:</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono">
                              {currentDeposit.bankInfo.accountNumber}
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  currentDeposit.bankInfo.accountNumber
                                )
                              }
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {copied ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tên tài khoản:</span>
                          <span className="font-medium">
                            {currentDeposit.bankInfo.accountName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nội dung:</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-sm">
                              {currentDeposit.bankInfo.transferContent}
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  currentDeposit.bankInfo.transferContent
                                )
                              }
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {copied ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Số tiền:</span>
                          <span className="font-bold text-lg text-green-600">
                            {formatAmount(currentDeposit.amount)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        <button
                          onClick={checkDepositStatus}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                        >
                          Kiểm tra trạng thái
                        </button>
                        <button
                          onClick={() => {
                            setCurrentDeposit(null);
                            setDepositAmount("");
                            setDepositStatus("idle");
                          }}
                          className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                        >
                          Tạo yêu cầu mới
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "withdraw" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Rút tiền về ngân hàng
                </h3>
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số tiền (VND)
                    </label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Nhập số tiền (tối thiểu 50,000đ)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="50000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngân hàng
                    </label>
                    <select
                      value={bankInfo.bankCode}
                      onChange={(e) =>
                        setBankInfo((prev) => ({
                          ...prev,
                          bankCode: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn ngân hàng</option>
                      <option value="VCB">Vietcombank</option>
                      <option value="TCB">Techcombank</option>
                      <option value="MB">MB Bank</option>
                      <option value="VPB">VPBank</option>
                      <option value="ACB">ACB</option>
                      <option value="BIDV">BIDV</option>
                      <option value="AGB">Agribank</option>
                      <option value="SCB">SCB</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số tài khoản
                    </label>
                    <input
                      type="text"
                      value={bankInfo.accountNumber}
                      onChange={(e) =>
                        setBankInfo((prev) => ({
                          ...prev,
                          accountNumber: e.target.value,
                        }))
                      }
                      placeholder="Nhập số tài khoản"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tên tài khoản
                    </label>
                    <input
                      type="text"
                      value={bankInfo.accountName}
                      onChange={(e) =>
                        setBankInfo((prev) => ({
                          ...prev,
                          accountName: e.target.value,
                        }))
                      }
                      placeholder="Nhập tên tài khoản"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    onClick={handleWithdraw}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    Gửi yêu cầu rút tiền
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "history" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Lịch sử giao dịch
                </h3>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(transaction.createdAt)}
                          </p>
                          <p className="text-xs text-gray-400">
                            ID: {transaction.id}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            transaction.type === "deposit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}
                          {formatAmount(transaction.amount)}
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          {getStatusIcon(transaction.status)}
                          <span className="text-xs text-gray-500 capitalize">
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {transactions.length === 0 && (
                    <div className="text-center py-8">
                      <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Chưa có giao dịch nào</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden"
          >
            {/* Header */}
            <div
              className={`px-6 py-4 ${
                statusType === "success"
                  ? "bg-green-500"
                  : statusType === "error"
                  ? "bg-red-500"
                  : statusType === "pending"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {statusType === "success"
                    ? "Thành công"
                    : statusType === "error"
                    ? "Lỗi"
                    : statusType === "pending"
                    ? "Đang xử lý"
                    : "Thông báo"}
                </h3>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="flex items-center space-x-3 mb-4">
                {statusType === "success" && (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                )}
                {statusType === "error" && (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
                {statusType === "pending" && (
                  <Clock className="w-8 h-8 text-yellow-500" />
                )}
                {statusType === "info" && (
                  <Wallet className="w-8 h-8 text-blue-500" />
                )}
                <p className="text-gray-700 text-lg">{statusMessage}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setShowStatusModal(false)}
                className={`px-6 py-2 rounded-md text-white font-medium transition-colors ${
                  statusType === "success"
                    ? "bg-green-600 hover:bg-green-700"
                    : statusType === "error"
                    ? "bg-red-600 hover:bg-red-700"
                    : statusType === "pending"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
