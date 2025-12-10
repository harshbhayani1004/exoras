"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useState } from "react";
import type { Product } from "@/types";
import { getImageUrl } from "@/lib/storage";

interface ProductDetailProps {
  product: Product;
  onAuthRequired?: () => void;
}

export default function ProductDetail({
  product,
  onAuthRequired,
}: ProductDetailProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const mainImage = product.images[0]?.src
    ? getImageUrl(product.images[0].src)
    : "/placeholder.png";
  const mainImageAlt = product.images[0]?.alt || product.name;

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, onAuthRequired);

    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/collection"
            className="text-gray-500 hover:text-dark transition-colors text-sm uppercase tracking-wider"
          >
            ← Back to Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <div className="relative aspect-3/4 bg-gray-100 overflow-hidden">
            <Image
              src={mainImage}
              alt={mainImageAlt}
              fill
              className="object-cover"
              priority
            />
            {product.on_sale && (
              <div className="absolute top-4 left-4 bg-dark text-white text-xs tracking-widest px-3 py-1 uppercase">
                Sale
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-serif text-dark mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              {product.on_sale && product.sale_price ? (
                <>
                  <span className="text-2xl text-dark font-medium">
                    ${product.sale_price.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.regular_price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl text-dark font-medium">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mb-10 text-gray-600 font-serif leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="border-t border-b border-gray-100 py-6 mb-8">
              <div className="flex items-center justify-between text-sm text-gray-500 uppercase tracking-wider">
                <span>Availability</span>
                <span
                  className={
                    product.stock_status === "instock"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {product.stock_status === "instock"
                    ? "In Stock"
                    : "Out of Stock"}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-dark text-white py-4 px-8 uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mb-8"
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>

            {/* Additional Info */}
            <div className="space-y-4 text-sm text-gray-500">
              <div className="flex gap-2">
                <span className="uppercase tracking-wider text-dark">
                  Category:
                </span>
                <span>
                  {product.categories.map((c) => c.name).join(", ") ||
                    "Uncategorized"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
