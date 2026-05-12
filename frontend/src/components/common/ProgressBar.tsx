import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0-100
  color?: "blue" | "green" | "red" | "yellow";
  height?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const ProgressBar = ({
  progress,
  color = "blue",
  height = "md",
  showLabel = false,
  className = "",
}: ProgressBarProps) => {
  const heightClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const colorClasses = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-600",
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Tiến trình</span>
          <span className="text-sm text-gray-500">{clampedProgress}%</span>
        </div>
      )}
      <div
        className={`w-full bg-gray-200 rounded-full ${heightClasses[height]}`}
      >
        <motion.div
          className={`${heightClasses[height]} rounded-full ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
