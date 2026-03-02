"use client";

import { Suspense, useEffect, useState, memo, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { getProducts } from "@/lib/api";
import ProductGridClient from "@/components/ProductGridClient";
import AuthModal from "@/components/AuthModal";
import type { Product } from "@/types";
import { MAIN_GROUPS } from "@/lib/category-data";

import { getImageUrl } from "@/lib/storage";

function CollectionPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeGroup, setActiveGroup] = useState(() => searchParams.get("group") ?? "all");

  // If the URL ?group param changes (e.g. browser back/forward), sync state
  useEffect(() => {
    const g = searchParams.get("group");
    if (g) setActiveGroup(g);
  }, [searchParams]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleAuthRequired = useCallback(() => {
    setShowAuthModal(true);
  }, []);

  const getProductsByCategory = useCallback((slug: string) => {
      return products.filter((p) => p.categories.some((c) => c.slug === slug));
  }, [products]);

  const scrollToGroup = (groupId: string) => {
    setActiveGroup(groupId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const randomProducts = useMemo(() => {
    const shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [products]);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Editorial Style Hero Section with Background */}
        <div className="relative h-[60vh] min-h-[500px] flex items-end pb-16 px-6 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero.png"
                    alt="Collection Hero"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="container mx-auto relative z-10 border-b border-white/20 pb-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    
                    {/* Left Side: Title */}
                    <div className="flex-1">
                         <span className="block text-xs font-semibold tracking-[0.25em] text-white/80 uppercase mb-4">
                            2025 Collection
                        </span>
                        <h1 className="text-6xl md:text-8xl font-serif text-white leading-[0.9] tracking-tight">
                            The <br/>
                            <span className="italic ml-4 text-white/60">Store.</span>
                        </h1>
                    </div>

                    {/* Right Side: Description */}
                    <div className="flex-1 max-w-lg md:text-right md:pl-12">
                         <p className="text-xl text-white/90 font-serif leading-relaxed mb-6">
                            "Timeless beauty, captured in yarn. Each piece is a unique story of craftsmanship meant to bloom forever in your home."
                        </p>
                         <div className="flex items-center md:justify-end gap-2 text-sm font-medium text-white uppercase tracking-widest">
                            <span className="w-2 h-2 bg-tan rounded-full"></span>
                            <span>Handmade</span>
                            <span className="mx-2 text-white/40">|</span>
                            <span>Unique</span>
                            <span className="mx-2 text-white/40">|</span>
                            <span>Sustainable</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Sticky Filter Navigation */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="container mx-auto">
            {/* Desktop View: Centered Pills */}
            <div className="hidden lg:flex justify-center space-x-8 py-4">
               <button
                onClick={() => scrollToGroup("all")}
                className={`text-sm uppercase tracking-widest font-medium py-2 px-6 rounded-full transition-all duration-300 ${
                  activeGroup === "all"
                    ? "bg-dark text-white shadow-md transform scale-105"
                    : "text-gray-500 hover:text-dark hover:bg-gray-100"
                }`}
              >
                All
              </button>
              {MAIN_GROUPS.map((group) => (
                <button
                  key={group.id}
                  onClick={() => scrollToGroup(group.id)}
                  className={`text-sm uppercase tracking-widest font-medium py-2 px-6 rounded-full transition-all duration-300 ${
                    activeGroup === group.id
                      ? "bg-dark text-white shadow-md transform scale-105"
                      : "text-gray-500 hover:text-dark hover:bg-gray-100"
                  }`}
                >
                  {group.title}
                </button>
              ))}
            </div>

            {/* Mobile/Tablet View: Story Style Circles */}
            <div className="lg:hidden w-full bg-white border-b border-gray-100 py-4">
               <div className="container mx-auto px-4">
                  <div className="mb-3">
                     <h3 className="text-lg font-bold text-dark">Category</h3>
                  </div>
                  
                  <div className="flex overflow-x-auto hide-scrollbar space-x-4 pb-2">
                     {/* "All" Circle */}
                     <button
                        onClick={() => scrollToGroup("all")}
                        className="flex flex-col items-center min-w-[72px] group"
                      >
                        <div className={`w-[72px] h-[72px] rounded-full p-[2px] mb-2 transition-all ${
                          activeGroup === "all" 
                            ? "bg-gradient-to-tr from-orange-400 to-rose-400" 
                            : "bg-gray-100"
                        }`}>
                            <div className="w-full h-full rounded-full border-[2px] border-white overflow-hidden bg-gray-200 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-500">ALL</span>
                            </div>
                        </div>
                        <span className={`text-xs font-medium ${
                          activeGroup === "all" ? "text-dark" : "text-gray-500"
                        }`}>
                          All
                        </span>
                      </button>

                     {MAIN_GROUPS.map((group) => (
                        <button
                          key={group.id}
                          onClick={() => scrollToGroup(group.id)}
                          className="flex flex-col items-center min-w-[72px] group"
                        >
                          <div className={`w-[72px] h-[72px] rounded-full p-[2px] mb-2 transition-all ${
                            activeGroup === group.id
                              ? "bg-gradient-to-tr from-orange-400 to-rose-400"
                              : "bg-gray-100"
                          }`}>
                              <div className="relative w-full h-full rounded-full border-[2px] border-white overflow-hidden bg-gray-50">
                                  {group.image ? (
                                     <Image
                                        src={getImageUrl(group.image)}
                                        alt={group.title}
                                        fill
                                        className="object-cover"
                                        sizes="72px"
                                      />
                                  ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                                    </div>
                                  )}
                              </div>
                          </div>
                          <span className={`text-xs font-medium whitespace-nowrap ${
                            activeGroup === group.id ? "text-dark" : "text-gray-500"
                          }`}>
                            {group.title}
                          </span>
                        </button>
                      ))}
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Product Sections */}
        <div className="container mx-auto px-4 py-8 space-y-16 md:space-y-24">
          
          {activeGroup === 'all' ? (
             <section>
                 <ProductGridClient
                    products={randomProducts}
                    onAuthRequired={handleAuthRequired}
                 />
             </section>
          ) : (
            MAIN_GROUPS.map((group) => {
             // Logic: Show only the active group
             if (activeGroup !== group.id) return null;

             // Special Case for Mobile Case since it has no subsections
             if (group.id === 'mobile-case') {
                return (
                 <section key="mobile-case" id="mobile-covers" className="scroll-mt-32 py-16 bg-gray-50 rounded-2xl">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-3xl mx-auto">
                            <span className="inline-block py-1 px-3 rounded bg-tan text-dark text-xs font-bold uppercase tracking-widest mb-4">
                                Coming Soon
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif text-dark mb-6">
                                Mobile Cover with Custom Design
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 font-serif leading-relaxed">
                                We are working on something special! Soon you will be able to order custom-designed crochet mobile covers purely made for your style.
                            </p>
                            <div className="mt-10">
                                <button disabled className="bg-gray-300 text-white px-8 py-3 rounded-none uppercase tracking-widest cursor-not-allowed">
                                    Pre-orders Opening Soon
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                );
             }

             return (
                <div key={group.id} className="space-y-12">
                   {group.subSections.map(sub => {
                       const sectionProducts = getProductsByCategory(sub.slug);
                       if (sectionProducts.length === 0) return null;
                       return (
                          <section key={sub.id} id={sub.id} className="scroll-mt-32">
                            <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-4">
                              <h2 className="text-2xl md:text-3xl font-serif text-dark">
                                {group.title} {sub.title}
                              </h2>
                               <div className="hidden md:block text-gray-400 font-serif italic">
                                  {sectionProducts.length} items
                               </div>
                            </div>
                            
                            <ProductGridClient
                              products={sectionProducts}
                              onAuthRequired={handleAuthRequired}
                            />
                          </section>
                       );
                   })}
                </div>
             );
          })
        )}
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

const MemoCollectionPage = memo(CollectionPage);

export default function Page() {
  return (
    <Suspense>
      <MemoCollectionPage />
    </Suspense>
  );
}

