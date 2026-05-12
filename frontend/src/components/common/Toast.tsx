import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  title: string;
  message?: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast = ({
  type,
  title,
  message,
  isVisible,
  onClose,
  duration = 5000,
}: ToastProps) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconColors = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          className={`fixed top-4 right-4 z-50 max-w-sm w-full p-4 border rounded-lg shadow-lg ${colors[type]}`}
          style={{ animationDuration: `${duration}ms` }}
        >
          <div className="flex items-start gap-3">
            <Icon
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColors[type]}`}
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{title}</h4>
              {message && <p className="text-sm mt-1 opacity-90">{message}</p>}
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-black/10 rounded-full transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
