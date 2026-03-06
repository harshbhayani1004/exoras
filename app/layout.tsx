import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EXORA - Handmade Flowers & Premium Floral Arrangements",
  description:
    "Discover beautiful handmade flowers crafted with care. Shop our collection of premium artisan floral arrangements at EXORA.",
  icons: {
    icon: [{ url: "/vision_final_logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/vision_final_logo.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pub-2a5d8e5eaff3498da143b1150b20a7c1.r2.dev" />
        <link rel="dns-prefetch" href="https://pub-2a5d8e5eaff3498da143b1150b20a7c1.r2.dev" />
      </head>
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
