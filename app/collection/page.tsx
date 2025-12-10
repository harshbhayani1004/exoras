"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import ProductGridClient from "@/components/ProductGridClient";
import AuthModal from "@/components/AuthModal";
import type { Product } from "@/types";

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="bg-tan/10 py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-serif text-dark mb-6">
              The Collection
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-serif">
              Explore our exclusive range of handcrafted botanicals, designed to
              bring everlasting beauty to your space.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-16">
          <ProductGridClient
            products={products}
            onAuthRequired={() => setShowAuthModal(true)}
          />
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}
