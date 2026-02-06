"use client";

import { useState, useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { logout } from "@/lib/auth";

interface UserAvatarProps {
  onLoginClick: () => void;
}

export default function UserAvatar({ onLoginClick }: UserAvatarProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setShowMenu(false);
    // Redirect to home page after logout
    window.location.href = "/";
  };

  if (!user) {
    return (
      <button
        onClick={onLoginClick}
        className="flex items-center gap-2 px-4 py-2 bg-dark text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm"
      >
        <User className="w-4 h-4" />
        Login
      </button>
    );
  }

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-10 h-10 rounded-full bg-dark text-white flex items-center justify-center font-serif font-bold text-lg hover:bg-gray-800 transition-colors shadow-md"
        aria-label="User menu"
      >
        {initial}
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border-2 border-gray-200 py-2 z-40">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="font-serif font-bold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-2 text-gray-700 font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
