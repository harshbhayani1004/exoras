"use client";

import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { getImageUrl } from "@/lib/storage";
import { useState } from "react";

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, total, itemCount, removeItem, updateQuantity } =
    useCartStore();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2.5 hover:bg-gray-200/50 rounded-lg transition-colors"
        aria-label="Shopping cart"
      >
        <ShoppingCart className="w-7 h-7 text-gray-800 stroke-[2.5]" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 bg-tan">
                <h2 className="text-2xl font-serif font-bold text-gray-800">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-6 h-6 text-gray-800" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gray-50">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      Your cart is empty
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      {item.product.images[0] && (
                        <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={getImageUrl(item.product.images[0].src)}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-gray-800 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-700 font-semibold text-lg mb-3">
                          ${item.product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="w-9 h-9 hover:bg-gray-200 rounded-lg font-bold text-lg transition-colors"
                            >
                              -
                            </button>
                            <span className="w-10 text-center font-bold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-9 h-9 hover:bg-gray-200 rounded-lg font-bold text-lg transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-auto text-red-600 hover:text-red-800 font-semibold text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t-2 border-gray-200 p-6 space-y-4 bg-white">
                <div className="flex justify-between items-center text-2xl font-serif font-bold text-gray-800">
                  <span>Total:</span>
                  <span className="text-black">${total.toFixed(2)}</span>
                </div>
                <button
                  disabled={items.length === 0}
                  className="w-full bg-dark text-white py-4 rounded-lg font-serif font-bold text-lg tracking-wider hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
