"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CartButton from "./CartButton";
import UserAvatar from "./UserAvatar";

const AuthModal = dynamic(() => import("./AuthModal"), { 
  ssr: false,
  loading: () => null 
});

export default function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Hide if scrolling down and past 50px, show if scrolling up
          if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`sticky top-0 z-50 bg-tan border-none shadow-sm transition-transform duration-300 will-change-transform ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className="md:hidden p-1 text-gray-800"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link
                href="/"
                className="text-2xl font-serif tracking-widest font-bold text-gray-800"
              >
                EXORA
              </Link>
            </div>

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
              <Link
                href="/contact"
                className="text-gray-700 font-semibold hover:text-black transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <UserAvatar onLoginClick={() => setShowAuthModal(true)} />
              <CartButton />
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-[#F5F5F0] z-50 shadow-xl md:hidden flex flex-col will-change-transform"
            >
              <div className="p-4 flex items-center justify-between border-b border-gray-200">
                <span className="text-xl font-serif tracking-widest font-bold text-gray-800">MENU</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-gray-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col p-6 gap-6 font-serif text-lg tracking-wide">
                <Link
                  href="/"
                  className="text-gray-800 hover:text-[#CDBA9A] transition-colors font-medium border-b border-gray-100 pb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/collection"
                  className="text-gray-800 hover:text-[#CDBA9A] transition-colors font-medium border-b border-gray-100 pb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Store
                </Link>
                <Link
                  href="/about"
                  className="text-gray-800 hover:text-[#CDBA9A] transition-colors font-medium border-b border-gray-100 pb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-800 hover:text-[#CDBA9A] transition-colors font-medium border-b border-gray-100 pb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
