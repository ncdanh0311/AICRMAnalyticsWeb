import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, EyeOff } from "lucide-react";

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

const GlobalNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [visibleNotifications, setVisibleNotifications] = useState<
    Notification[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);

  useEffect(() => {
    fetchActiveNotifications();
  }, []);

  const fetchActiveNotifications = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/notifications/active"
      );
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data || []);
        setVisibleNotifications(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseNotification = (notificationId: string) => {
    setVisibleNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  const handleDontShowAgain = (notificationId: string) => {
    // Store in localStorage to remember user's choice
    const dismissedNotifications = JSON.parse(
      localStorage.getItem("dismissedNotifications") || "[]"
    );
    dismissedNotifications.push(notificationId);
    localStorage.setItem(
      "dismissedNotifications",
      JSON.stringify(dismissedNotifications)
    );
    handleCloseNotification(notificationId);
  };

  const handleNextNotification = () => {
    if (visibleNotifications.length > 1) {
      setCurrentNotificationIndex(
        (prev) => (prev + 1) % visibleNotifications.length
      );
    }
  };

  const handlePrevNotification = () => {
    if (visibleNotifications.length > 1) {
      setCurrentNotificationIndex((prev) =>
        prev === 0 ? visibleNotifications.length - 1 : prev - 1
      );
    }
  };

  if (loading || visibleNotifications.length === 0) return null;

  const currentNotification = visibleNotifications[currentNotificationIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={() => handleCloseNotification(currentNotification.id)}
      />

      {/* Modal */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentNotification.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="relative w-full max-w-4xl mx-4 bg-white rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                {currentNotification.title || "Thông báo"}
              </h2>
            </div>
            <button
              onClick={() => handleCloseNotification(currentNotification.id)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content - Vertical Layout */}
          <div className="p-4">
            {/* Image at top */}
            {currentNotification.image && (
              <div className="mb-4 p-2 border-2 border-gray-200 rounded-xl bg-gray-50">
                <img
                  src={currentNotification.image}
                  alt="Notification"
                  className="w-full max-h-48 object-contain rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Content with Scroll */}
            <div className="max-h-80 overflow-y-auto text-gray-700 leading-relaxed pr-2">
              {currentNotification.message.split("\n").map((line, index) => (
                <p key={index} className="mb-2">
                  {line}
                </p>
              ))}
            </div>

            {/* Navigation Dots */}
            {visibleNotifications.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {visibleNotifications.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNotificationIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentNotificationIndex
                        ? "bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex border-t border-gray-200">
            <button
              onClick={() => handleDontShowAgain(currentNotification.id)}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              <EyeOff className="w-4 h-4" />
              <span>Không hiển thị lại</span>
            </button>
            <button
              onClick={() => handleCloseNotification(currentNotification.id)}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-red-600 hover:bg-red-50 transition-colors font-medium border-l border-gray-200"
            >
              <X className="w-4 h-4" />
              <span>Đóng</span>
            </button>
          </div>

          {/* Navigation Arrows */}
          {visibleNotifications.length > 1 && (
            <>
              <button
                onClick={handlePrevNotification}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextNotification}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default GlobalNotification;
