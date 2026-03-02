"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, ArrowUpRight, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#110f0f] text-[#F5F5F0] pt-24 pb-12 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CDBA9A] to-transparent opacity-30" />

      <div className="container mx-auto px-4 lg:px-12">
        {/* Top Section: CTA & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-3xl">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8 text-[#CDBA9A]">
              Let&apos;s bloom <br />{" "}
              <span className="text-white/90 italic font-medium">together.</span>
            </h2>
            <p className="text-white/60 text-lg max-w-lg font-light leading-relaxed">
              Join our community of floral enthusiasts. Receive care tips, styling
              ideas, and exclusive offers delivered to your inbox.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[300px] xl:min-w-[400px] pt-4">
            <form className="flex flex-col gap-6 group">
              <label className="text-xs uppercase tracking-[0.2em] text-[#CDBA9A] font-bold">
                Join our newsletter
              </label>
              <div className="relative border-b border-white/20 transition-all duration-500 group-focus-within:border-[#CDBA9A]">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent py-4 text-xl outline-none placeholder:text-white/20 text-white font-serif transition-colors duration-300"
                />
                <button
                  type="button"
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#CDBA9A] hover:text-white transition-colors duration-300 transform hover:scale-110"
                >
                  <ArrowUpRight className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20 pt-12 border-t border-white/5">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-col justify-between h-full space-y-8">
            <div>
              <Link
                href="/"
                className="text-3xl font-serif font-bold tracking-widest mb-6 inline-block text-white"
              >
                EXORA
              </Link>
              <address className="not-italic text-sm text-white/50 leading-loose">
                C-41, Sumeru City Mall
                <br />
                Surat, Gujarat
                <br />
                <a
                  href="tel:+917861886462"
                  className="hover:text-[#CDBA9A] transition-colors"
                >
                  +91 78618 86462
                </a>
              </address>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#CDBA9A] mb-8 font-bold">
              Shop
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "All",          href: "/collection" },
                { label: "Crochet",      href: "/collection?group=crochet" },
                { label: "Pipe Cleaner", href: "/collection?group=pipe-cleaner" },
                { label: "Mobile Case",  href: "/collection?group=mobile-case" },
              ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-lg font-serif text-white/80 hover:text-[#CDBA9A] hover:translate-x-2 transition-all duration-300 inline-block will-change-transform"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#CDBA9A] mb-8 font-bold">
              Company
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "Our Story",      href: "/about" },
                { label: "Artisans",       href: "/about" },
                { label: "Sustainability", href: "/about" },
                { label: "Contact",        href: "/contact" },
              ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-lg font-serif text-white/80 hover:text-[#CDBA9A] hover:translate-x-2 transition-all duration-300 inline-block will-change-transform"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#CDBA9A] mb-8 font-bold">
              Social
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: "Instagram", icon: Instagram },
                { name: "Facebook", icon: Facebook },
                { name: "Twitter", icon: Twitter },
                { name: "Email Us", icon: Mail },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href="#"
                    className="group flex items-center gap-3 text-lg font-serif text-white/80 hover:text-white transition-colors"
                  >
                    <span className="flex items-center justify-center w-10 h-10 border border-white/10 rounded-full group-hover:border-[#CDBA9A] group-hover:bg-[#CDBA9A] group-hover:text-[#110f0f] transition-all duration-300 transform group-hover:scale-110 will-change-transform">
                      <item.icon className="w-4 h-4" />
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Big Text */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <p className="text-xs text-white/40 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Exora. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-white/40 uppercase tracking-widest">
            <Link
              href="#"
              className="hover:text-[#CDBA9A] transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-[#CDBA9A] transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Big Text Background Effect */}
        <div className="absolute -bottom-[5vw] left-0 w-full overflow-hidden opacity-[0.02] pointer-events-none select-none">
          <h1 className="text-[18vw] leading-none font-serif text-center whitespace-nowrap tracking-tighter">
            CROCHET
          </h1>
        </div>
      </div>
    </footer>
  );
}
