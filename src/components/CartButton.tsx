"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function CartButton() {
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <Link
      href="/cart"
      className="relative p-2.5 hover:bg-gray-200/50 rounded-lg transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="w-7 h-7 text-gray-800 stroke-[2.5]" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
