"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/types";
import { getImageUrl } from "@/lib/storage";

interface ProductGridClientProps {
  products: Product[];
  onAuthRequired?: () => void;
}

export default function ProductGridClient({
  products,
  onAuthRequired,
}: ProductGridClientProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, onAuthRequired);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          {/* Image Container */}
          <div className="block relative aspect-3/4 overflow-hidden bg-gray-100 mb-6">
            <Link
              href={`/collection/${product.slug}`}
              className="block w-full h-full"
            >
              {product.images[0] ? (
                <Image
                  src={getImageUrl(product.images[0].src)}
                  alt={product.images[0].alt || product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </Link>

            {/* Sale Badge */}
            {product.on_sale && (
              <div className="absolute top-4 left-4 bg-dark text-white text-xs tracking-widest px-3 py-1 uppercase">
                Sale
              </div>
            )}

            {/* Action Buttons on Hover */}
            <div
              className={`absolute inset-x-0 bottom-0 p-4 bg-white/90 backdrop-blur-sm transition-all duration-300 transform ${
                hoveredProduct === product.id
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <div className="flex gap-2">
                <Link
                  href={`/collection/${product.slug}`}
                  className="flex-1 bg-tan text-dark py-3 text-sm uppercase tracking-wider hover:bg-tan/80 transition-colors text-center"
                >
                  View Details
                </Link>
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="flex-1 bg-dark text-white py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="text-center">
            <h3 className="text-xl font-serif text-dark mb-2 group-hover:text-gray-600 transition-colors">
              {product.name}
            </h3>
            <div className="flex justify-center items-center gap-3 text-gray-600 font-medium">
              {product.on_sale && product.sale_price ? (
                <>
                  <span className="text-dark">
                    ${product.sale_price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ${product.regular_price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span>${product.price.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
