"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, ArrowLeft, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { getImageUrl } from "@/lib/storage";

export default function CartPage() {
  const { items, total, itemCount, removeItem, updateQuantity, clearCart } =
    useCartStore();

  const shipping = total >= 100 ? 0 : 12.99;
  const orderTotal = total + shipping;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-tan/20 py-16 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <Link
              href="/collection"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <h1 className="text-5xl md:text-6xl font-serif text-dark">
              Your Cart
            </h1>
            {itemCount > 0 && (
              <p className="text-gray-500 mt-2">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {items.length === 0 ? (
            /* Empty Cart State */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <ShoppingCart className="w-20 h-20 text-gray-200 mb-6" />
              <h2 className="text-3xl font-serif text-dark mb-3">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8 max-w-sm">
                Discover our handcrafted botanical sculptures and find something
                you love.
              </p>
              <Link
                href="/collection"
                className="bg-black text-white px-8 py-3.5 font-semibold text-sm tracking-wide hover:bg-gray-800 transition-colors"
              >
                Shop Collection
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-serif font-semibold text-dark">
                    Order Items
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-5 bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      {/* Product Image */}
                      <div className="relative w-28 h-28 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        {item.product.images[0] ? (
                          <Image
                            src={getImageUrl(item.product.images[0].src)}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-serif font-semibold text-dark text-lg leading-tight">
                              {item.product.name}
                            </h3>
                            {item.product.categories?.[0] && (
                              <p className="text-xs text-gray-400 mt-0.5 uppercase tracking-wider">
                                {item.product.categories[0].name}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors shrink-0 mt-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 border border-gray-200 rounded-lg bg-white">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-l-lg transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                            <span className="w-10 text-center font-semibold text-gray-800 text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-r-lg transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5 text-gray-600" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <p className="font-semibold text-dark text-lg">
                            ${item.subtotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-gray-50 rounded-xl border border-gray-100 p-6 sticky top-8"
                >
                  <h2 className="text-xl font-serif font-semibold text-dark mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>
                        Subtotal ({itemCount}{" "}
                        {itemCount === 1 ? "item" : "items"})
                      </span>
                      <span className="font-medium text-dark">
                        ${total.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        <span className="font-medium text-dark">
                          ${shipping.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {shipping > 0 && (
                      <p className="text-xs text-gray-400">
                        Free shipping on orders over $100
                      </p>
                    )}

                    <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-semibold text-base">
                      <span className="text-dark">Total</span>
                      <span className="text-dark text-lg">
                        ${orderTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-black text-white py-4 font-semibold text-sm tracking-wide hover:bg-gray-800 active:scale-[0.98] transition-all">
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/collection"
                    className="block w-full mt-3 text-center py-3.5 border border-gray-200 text-gray-600 text-sm font-medium hover:border-gray-400 hover:text-dark transition-colors"
                  >
                    Continue Shopping
                  </Link>

                  {/* Trust Badge */}
                  <p className="text-xs text-gray-400 text-center mt-5">
                    Secure checkout · Free returns
                  </p>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
