"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-[50vh] lg:h-screen bg-[#FDFBF7] overflow-hidden flex flex-col justify-end lg:justify-center">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Handmade Sunflower Arrangement"
          fill
          className="object-cover object-[83%_center] md:object-[75%_center] lg:object-[50%_30%] opacity-90 will-change-transform"
          priority
          quality={85}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/70 lg:via-black/30 lg:to-transparent" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-6 pb-12 lg:pb-0 lg:px-12 h-full flex flex-col justify-end lg:justify-center">
        
        <div 
          className="max-w-2xl text-white animate-fade-in"
        >
          <span className="inline-block mb-3 lg:mb-4 text-[10px] lg:text-sm font-medium tracking-[0.2em] text-[#CDBA9A] uppercase">
            Est. 2026 Collection
          </span>
          
          <h1 className="text-3xl lg:text-8xl font-serif font-medium leading-[1.1] mb-4 lg:mb-8 tracking-tight">
             Nature’s <br/>
             <span className="italic">Eternal</span> Art.
          </h1>
          
          <p className="text-sm lg:text-lg text-white/90 font-light leading-relaxed max-w-md mb-6 lg:mb-10 opacity-90 mix-blend-screen hidden lg:block">
            Discover the elegance of fully handmade florals. 
            Sustainable luxury crafted to last a lifetime.
          </p>

          <div className="flex flex-row gap-4">
            <Link 
              href="/collection" 
              className="px-6 py-3 lg:px-8 lg:py-4 bg-[#CDBA9A] text-[#110f0f] text-xs lg:text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors duration-300 text-center min-w-[140px] lg:min-w-[180px]"
            >
              Shop Collection
            </Link>
            <Link 
              href="/about" 
              className="px-6 py-3 lg:px-8 lg:py-4 border border-white/30 text-white text-xs lg:text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300 text-center min-w-[140px] lg:min-w-[180px] backdrop-blur-sm hidden lg:inline-block"
            >
              Our Studio
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal Footer / Scroll Indicator */}
      <div className="absolute bottom-8 left-0 w-full flex justify-between px-6 md:px-12 text-white/40 text-xs font-medium uppercase tracking-widest z-10 hidden md:flex">
        <span>Premium Quality</span>
        <span>Scroll to Explore</span>
        <span>Handmade in USA</span>
      </div>
    </section>
  );
}