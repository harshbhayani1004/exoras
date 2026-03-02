import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/storage";
import Hero from "@/components/Hero";
import CraftedCarousel from "@/components/CraftedCarousel";
import MarqueeTicker from "@/components/MarqueeTicker";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="order-1">
        <Hero />
      </div>

      {/* Crafted with Care Section */}
      <section className="order-4 lg:order-4 py-24 bg-dark text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16">
            <h2 className="text-5xl md:text-6xl font-serif mb-8 md:mb-0">
              Crafted with Care
            </h2>
            <p className="text-lg text-gray-300 max-w-md leading-relaxed">
              Our blooms are painstakingly handmade by skilled artisans,
              blending traditional techniques with modern design to deliver
              lifelike petals and lasting beauty.
            </p>
          </div>

          <div className="md:hidden">
             <CraftedCarousel />
          </div>

          <div className="hidden md:grid md:grid-cols-3 gap-6">
            <div className="relative aspect-square bg-gray-800 overflow-hidden rounded-t-3xl">
              <Image
                src={getImageUrl("photo_3_2025-12-11_14-58-13.jpg")}
                alt="Elegant White Lily arrangement"
                fill
                className="object-cover will-change-transform"
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-square bg-gray-800 overflow-hidden rounded-t-3xl">
              <Image
                src={getImageUrl("photo_6_2025-12-11_14-58-13.jpg")}
                alt="Passionate Red Rose collection"
                fill
                className="object-cover will-change-transform"
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-square bg-gray-800 overflow-hidden rounded-t-3xl">
              <Image
                src={getImageUrl("photo_7_2025-12-11_14-58-13.jpg")}
                alt="Sunshine Yellow Dahlia arrangement"
                fill
                className="object-cover will-change-transform"
                loading="lazy"
                quality={80}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="order-2 lg:order-2 h-[50vh] lg:h-screen py-6 bg-white flex flex-col justify-center">
        <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-12 flex flex-col justify-center">
          
          <div className="flex justify-between items-end mb-4 lg:mb-8 px-1">
             <h3 className="font-serif text-lg lg:text-5xl font-medium text-black">New Arrivals</h3>
             <Link href="/collection" className="flex items-center gap-2 text-[10px] lg:text-sm font-bold uppercase tracking-widest text-[#CDBA9A] mb-1 lg:mb-2 hover:text-[#B6A07D] transition-colors">
                Show More <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
             </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 flex-1 lg:flex-none">
            <div className="group cursor-pointer">
              <div className="relative aspect-3/4 lg:aspect-[3/4] overflow-hidden bg-gray-100 mb-2 rounded-lg transition-[border-radius] duration-700 ease-in-out group-hover:rounded-[100px] border-none will-change-[border-radius] transform-gpu">
                <Image
                  src={getImageUrl("photo_2025-12-10_23-57-30.jpg")}
                  alt="Flower stems"
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  loading="eager"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 flex items-end justify-center p-4 lg:p-8">
                  <Link
                    href="/collection"
                    className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 lg:px-6 lg:py-3 rounded-full hover:bg-white transition-colors shadow-lg text-xs lg:text-sm font-medium lg:font-semibold tracking-wide"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-3/4 lg:aspect-[3/4] overflow-hidden bg-gray-100 mb-2 rounded-lg transition-[border-radius] duration-700 ease-in-out group-hover:rounded-[100px] border-none will-change-[border-radius] transform-gpu">
                <Image
                  src={getImageUrl("photo_2025-12-10_23-57-31.jpg")}
                  alt="Bouquets"
                  loading="eager"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 50vw, 20vw"
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end justify-center p-4 lg:p-8">
                  <Link
                    href="/collection"
                    className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 lg:px-6 lg:py-3 rounded-full hover:bg-white transition-colors shadow-lg text-xs lg:text-sm font-medium lg:font-semibold tracking-wide"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer hidden lg:block">
              <div className="relative aspect-3/4 lg:aspect-[3/4] overflow-hidden bg-gray-100 mb-2 rounded-lg transition-[border-radius] duration-700 ease-in-out group-hover:rounded-[100px] border-none will-change-[border-radius] transform-gpu">
                <Image
                  src={getImageUrl("photo_2025-12-10_23-57-32.jpg")}
                  alt="All products"
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  loading="lazy"
                  quality={80}
                  sizes="20vw"
                />
                <div className="absolute inset-0 flex items-end justify-center p-4 lg:p-8">
                  <Link
                    href="/collection"
                    className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 lg:px-6 lg:py-3 rounded-full hover:bg-white transition-colors shadow-lg text-xs lg:text-sm font-medium lg:font-semibold tracking-wide"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer hidden lg:block">
              <div className="relative aspect-3/4 lg:aspect-[3/4] overflow-hidden bg-gray-100 mb-2 rounded-lg transition-[border-radius] duration-700 ease-in-out group-hover:rounded-[100px] border-none will-change-[border-radius] transform-gpu">
                <Image
                  src={getImageUrl("photo_2_2025-12-10_23-57-59.jpg")}
                  alt="Dreamy Blue Peony Vase"
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  loading="lazy"
                  quality={80}
                  sizes="25vw"
                />
                <div className="absolute inset-0 flex items-end justify-center p-4 lg:p-8">
                  <Link
                    href="/collection"
                    className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 lg:px-6 lg:py-3 rounded-full hover:bg-white transition-colors shadow-lg text-xs lg:text-sm font-medium lg:font-semibold tracking-wide"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Reviews Section Removed */}

      {/* Promotional Banner */}
      <section className="order-3 lg:order-3 py-16 bg-[#CDBA9A] text-white overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-4 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-3xl md:text-4xl mb-2 text-black">Spring Collection</h3>
              <p className="text-black/80 font-medium tracking-wide uppercase text-sm">Limited Edition Arrangements</p>
            </div>
            <MarqueeTicker />
            <div>
               <Link 
                  href="/collection" 
                  className="inline-block px-8 py-3 bg-black text-white text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Discover
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Community Section */}
      <section className="order-5 lg:order-5 pt-24 pb-12 bg-[#F5F5F0]">
        <div className="container mx-auto px-4">
          <div className="mb-16">
             <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4 block">Our Community</span>
             <h2 className="text-4xl md:text-5xl font-serif text-black max-w-2xl leading-tight">
               Hand-woven crochet bouquets that bring everlasting warmth and artisanal charm to your space.
             </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[800px]">
             {/* Left Column */}
             <div className="flex flex-col gap-8 h-full">
                {/* Top Item - Large with Card */}
                <div className="relative flex-1 rounded-[32px] overflow-hidden min-h-[400px]">
                   <Image
                      src={getImageUrl("photo_2_2025-12-10_23-57-59.jpg")}
                      alt="Cozy living room detail with crochet flowers"
                      fill
                      className="object-cover will-change-transform"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                   />
                   <div className="absolute inset-0 bg-black/10" />
                   
                   {/* Testimonial Card Overlay */}
                   <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-auto lg:w-[400px] bg-white/75 p-6 lg:p-8 rounded-2xl shadow-xl border border-white/20">
                      <p className="font-serif text-lg lg:text-xl text-gray-800 mb-6 italic">
                        &quot;The detail in this crochet bouquet is perfectly intricate. It adds such a soft, cozy texture to my room, and best of all, these blooms last forever.&quot;
                      </p>
                      <div className="flex items-center gap-4">
                         <div className="flex flex-col">
                            <span className="font-bold text-black">Sarah Mitchell</span>
                            <span className="text-xs text-gray-500 uppercase tracking-widest">Interior Lover</span>
                         </div>
                         <div className="ml-auto text-[#CDBA9A] tracking-widest text-sm">
                            ★★★★★
                         </div>
                      </div>
                   </div>
                </div>

                {/* Bottom Item - Smaller Wide */}
                <div className="relative h-64 lg:h-1/3 rounded-[32px] overflow-hidden">
                     <Image
                      src={getImageUrl("photo_2025-12-10_23-57-30.jpg")}
                      alt="Detail of petals"
                      fill
                      className="object-cover will-change-transform"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                   />
                   
                   {/* Review Card - Always Visible */}
                   <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="bg-white/75 rounded-2xl p-6 max-w-sm shadow-xl border border-white/20">
                             <div className="flex gap-1 text-[#CDBA9A] mb-2 text-xs">★★★★★</div>
                             <p className="font-serif text-gray-800 mb-3 text-sm leading-relaxed">
                                &quot;I gifted these to my mother, and she was speechless. The craftsmanship is simply unreal.&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden relative border border-gray-200">
                                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-500">EM</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm text-black">Emily M.</span>
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
             </div>

             {/* Right Column */}
             <div className="relative h-[600px] lg:h-full rounded-[32px] overflow-hidden">
                <Image
                   src={getImageUrl("photo_2025-12-10_23-57-31.jpg")}
                   alt="Holding a bouquet"
                   fill
                   className="object-cover will-change-transform"
                   loading="lazy"
                   quality={75}
                   sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 bg-white/75 px-6 py-4 rounded-full shadow-lg flex items-center gap-4 cursor-pointer">
                   <div className="flex -space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                        <Image src={getImageUrl("photo_3_2025-12-11_14-58-13.jpg")} alt="av1" width={40} height={40} className="object-cover h-full w-full" loading="lazy" quality={70} />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                        <Image src={getImageUrl("photo_6_2025-12-11_14-58-13.jpg")} alt="av2" width={40} height={40} className="object-cover h-full w-full" loading="lazy" quality={70} />
                      </div>
                       <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white overflow-hidden">
                        <Image src={getImageUrl("photo_7_2025-12-11_14-58-13.jpg")} alt="av3" width={40} height={40} className="object-cover h-full w-full" loading="lazy" quality={70} />
                      </div>
                   </div>
                   <div className="flex flex-col">
                      <span className="font-bold text-sm text-black">1,000+ Happy Customers</span>
                      <span className="text-[10px] text-gray-500">Bringing smiles daily</span>
                   </div>
                   <ArrowRight className="w-4 h-4 text-black" />
                </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
