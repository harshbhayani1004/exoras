"use client";

import Link from "next/link";
import { useState } from "react";
import CartButton from "./CartButton";
import UserAvatar from "./UserAvatar";
import AuthModal from "./AuthModal";

export default function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);

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
