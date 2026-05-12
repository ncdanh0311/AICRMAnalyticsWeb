import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

type AuthMode = "login" | "register" | "forgot-password";

interface AuthPageProps {
  onAuthSuccess: (user: any) => void;
  onBackToHome: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuthSuccess, onBackToHome }) => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleAuthSuccess = (user: any) => {
    onAuthSuccess(user);
  };

  const switchToLogin = () => setAuthMode("login");
  const switchToRegister = () => setAuthMode("register");
  const switchToForgotPassword = () => setAuthMode("forgot-password");

  const renderAuthForm = () => {
    switch (authMode) {
      case "login":
        return (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToRegister={switchToRegister}
            onSwitchToForgotPassword={switchToForgotPassword}
          />
        );
      case "register":
        return (
          <RegisterForm
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={switchToLogin}
          />
        );
      case "forgot-password":
        return <ForgotPasswordForm onSwitchToLogin={switchToLogin} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="text-center mb-6">
          <motion.button
            onClick={onBackToHome}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Quay lại trang chủ
          </motion.button>
        </div>

        {/* Auth Forms */}
        <AnimatePresence mode="wait">
          <motion.div
            key={authMode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderAuthForm()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;
