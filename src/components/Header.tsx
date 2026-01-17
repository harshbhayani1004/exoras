"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import CartButton from "./CartButton";
import UserAvatar from "./UserAvatar";
import AuthModal from "./AuthModal";

export default function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Handle OAuth callback only on client side
    const handleAuthCallback = async () => {
      // Only process if coming from OAuth redirect (has hash)
      if (typeof window === "undefined" || !window.location.hash) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const userData = {
          id: session.user.id,
          email: session.user.email || "",
          name:
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            session.user.email?.split("@")[0] ||
            "User",
        };
        localStorage.setItem("user", JSON.stringify(userData));

        // Clean up the URL hash
        window.history.replaceState(null, "", window.location.pathname);
        window.location.reload();
      }
    };

    handleAuthCallback();

    // Listen for auth state changes (but don't reload if user already stored)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const existingUser = localStorage.getItem("user");
        if (!existingUser) {
          // Only save and reload if user wasn't already stored
          const userData = {
            id: session.user.id,
            email: session.user.email || "",
            name:
              session.user.user_metadata?.full_name ||
              session.user.user_metadata?.name ||
              session.user.email?.split("@")[0] ||
              "User",
          };
          localStorage.setItem("user", JSON.stringify(userData));
          window.location.reload();
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-tan border-none shadow-sm">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-serif tracking-widest font-bold text-gray-800"
            >
              EXORA
            </Link>

            <div className="hidden md:flex items-center gap-10 font-serif text-base tracking-wider">
              <Link
                href="/"
                className="text-gray-700 font-semibold hover:text-black transition-colors"
              >
                Home
              </Link>
              <Link
                href="/collection"
                className="text-gray-700 font-semibold hover:text-black transition-colors"
              >
                Store
              </Link>
              <Link
                href="/about"
                className="text-gray-700 font-semibold hover:text-black transition-colors"
              >
                About
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <UserAvatar onLoginClick={() => setShowAuthModal(true)} />
              <CartButton />
            </div>
          </div>
        </nav>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
