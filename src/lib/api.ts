import { supabase } from "./supabase";
import type { Product } from "@/types";

export interface ProductWithImages extends Product {
  product_images: Array<{
    id: number;
    src: string;
    alt: string | null;
    name: string | null;
  }>;
}

/**
 * Fetch all products from Supabase
 */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (
        id,
        src,
        alt,
        name
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  // Transform data to match Product type
  return (data || []).map((product: ProductWithImages) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description || "",
    price: Number(product.price),
    regular_price: Number(product.regular_price),
    sale_price: product.sale_price ? Number(product.sale_price) : undefined,
    on_sale: product.on_sale,
    images: product.product_images.map((img) => ({
      id: img.id,
      src: img.src,
      alt: img.alt || product.name,
      name: img.name || "",
    })),
    categories: [],
    stock_status: product.stock_status,
    featured: product.featured,
    created_at: product.created_at,
    updated_at: product.updated_at,
  }));
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (
        id,
        src,
        alt,
        name
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    description: data.description || "",
    price: Number(data.price),
    regular_price: Number(data.regular_price),
    sale_price: data.sale_price ? Number(data.sale_price) : undefined,
    on_sale: data.on_sale,
    images: data.product_images.map(
      (img: {
        id: number;
        src: string;
        alt: string | null;
        name: string | null;
      }) => ({
        id: img.id,
        src: img.src,
        alt: img.alt || data.name,
        name: img.name || "",
      })
    ),
    categories: [],
    stock_status: data.stock_status,
    featured: data.featured,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };
}

/**
 * Fetch featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (
        id,
        src,
        alt,
        name
      )
    `
    )
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }

  return (data || []).map((product: ProductWithImages) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description || "",
    price: Number(product.price),
    regular_price: Number(product.regular_price),
    sale_price: product.sale_price ? Number(product.sale_price) : undefined,
    on_sale: product.on_sale,
    images: product.product_images.map((img) => ({
      id: img.id,
      src: img.src,
      alt: img.alt || product.name,
      name: img.name || "",
    })),
    categories: [],
    stock_status: product.stock_status,
    featured: product.featured,
    created_at: product.created_at,
    updated_at: product.updated_at,
  }));
}

/**
 * Create a new order
 */
export async function createOrder(orderData: {
  customer_email: string;
  customer_name: string;
  customer_phone?: string;
  shipping_address: Record<string, unknown>;
  billing_address?: Record<string, unknown>;
  total: number;
  items: Array<{
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
}) {
  // Insert order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_email: orderData.customer_email,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      shipping_address: orderData.shipping_address,
      billing_address: orderData.billing_address,
      total: orderData.total,
      status: "pending",
      payment_status: "pending",
    })
    .select()
    .single();

  if (orderError || !order) {
    console.error("Error creating order:", orderError);
    throw orderError;
  }

  // Insert order items
  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    quantity: item.quantity,
    price: item.price,
    subtotal: item.subtotal,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    throw itemsError;
  }

  return order;
}
