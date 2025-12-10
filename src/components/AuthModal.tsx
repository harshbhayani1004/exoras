"use client";

import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import {
  loginUser,
  registerUser,
  signInWithGoogle,
  resetPassword,
} from "@/lib/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signInWithGoogle();

      if (!result.success) {
        setError(result.error || "Google sign in failed");
        setIsLoading(false);
      }
      // Note: User will be redirected to Google, then back to the site
    } catch (err) {
      console.error("Google auth error:", err);
      setError("Google authentication failed");
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (isForgotPassword) {
        // Handle password reset
        const result = await resetPassword(formData.email);
        if (result.success) {
          setSuccessMessage("Password reset email sent! Check your inbox.");
        } else {
          setError(result.error || "Failed to send reset email");
        }
      } else {
        // Handle login/register
        let result;

        if (isLogin) {
          // Login existing user
          result = await loginUser(formData.email, formData.password);
        } else {
          // Register new user
          if (!formData.name.trim()) {
            setError("Please enter your name");
            setIsLoading(false);
            return;
          }
          result = await registerUser(
            formData.email,
            formData.password,
            formData.name
          );
        }

        if (result.success && result.user) {
          // Store user in localStorage
          localStorage.setItem("user", JSON.stringify(result.user));

          onSuccess?.();
          onClose();

          // Refresh page to update UI with logged-in user
          window.location.reload();
        } else {
          setError(result.error || "Authentication failed");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-tan p-6 border-b-2 border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-gray-800">
              {isForgotPassword
                ? "Reset Password"
                : isLogin
                ? "Welcome Back"
                : "Create Account"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {isForgotPassword
              ? "Enter your email to receive a reset link"
              : isLogin
              ? "Sign in to continue your shopping"
              : "Join EXORA to start shopping"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {successMessage}
            </div>
          )}

          {!isForgotPassword && !isLogin && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-dark focus:outline-none transition-colors placeholder:text-gray-400 text-gray-900"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-dark focus:outline-none transition-colors placeholder:text-gray-400 text-gray-900"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {!isForgotPassword && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-dark focus:outline-none transition-colors placeholder:text-gray-400 text-gray-900"
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-dark text-white py-3 rounded-lg font-serif font-bold text-lg tracking-wider hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {isLoading
              ? isForgotPassword
                ? "Sending..."
                : "Please wait..."
              : isForgotPassword
              ? "Send Reset Email"
              : isLogin
              ? "Sign In"
              : "Create Account"}
          </button>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="text-center pt-4 border-t border-gray-200">
            {isForgotPassword ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    setError("");
                    setSuccessMessage("");
                    setFormData({ email: "", password: "", name: "" });
                  }}
                  className="text-gray-700 hover:text-black font-semibold text-sm mx-auto block"
                >
                  ← Back to Sign In
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError("");
                      setSuccessMessage("");
                      setFormData({ email: "", password: "", name: "" });
                    }}
                    className="text-gray-600 hover:text-black font-medium text-sm mx-auto block"
                  >
                    Forgot your password?
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setIsForgotPassword(false);
                    setError("");
                    setSuccessMessage("");
                    setFormData({ email: "", password: "", name: "" });
                  }}
                  className="text-gray-700 hover:text-black font-semibold text-sm mx-auto block"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
