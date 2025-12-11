import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/storage";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-tan flex items-center overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Arched Image */}
            <div className="relative h-[600px] lg:h-[800px] w-full order-2 lg:order-1">
              <div className="absolute inset-0 rounded-t-[20rem] overflow-hidden bg-gray-200">
                <Image
                  src={getImageUrl("photo_5_2025-12-11_14-58-13.jpg")}
                  alt="Exquisite Handmade Florals"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>{" "}
            {/* Right: Typography */}
            <div className="flex flex-col justify-center lg:pl-12 order-1 lg:order-2">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-black leading-tight mb-8">
                Exquisite <br />
                Handmade <br />
                Florals
              </h1>
              <p className="text-lg md:text-xl text-gray-800 max-w-md mb-8 leading-relaxed">
                EXORA creates fully handmade flowers from pure materials,
                prioritizing quality at an affordable price so your spaces feel
                special every day.
              </p>
              <Link
                href="/collection"
                className="inline-block bg-dark text-white px-8 py-4 rounded-lg font-serif font-bold text-lg tracking-wider hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Crafted with Care Section */}
      <section className="py-24 bg-dark text-white">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-square bg-gray-800 overflow-hidden rounded-t-3xl">
              <Image
                src={getImageUrl("photo_3_2025-12-11_14-58-13.jpg")}
                alt="Elegant White Lily arrangement"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square bg-gray-800 overflow-hidden rounded-t-3xl">
              <Image
                src={getImageUrl("photo_6_2025-12-11_14-58-13.jpg")}
                alt="Passionate Red Rose collection"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square bg-gray-800 overflow-hidden rounded-t-3xl">
              <Image
                src={getImageUrl("photo_7_2025-12-11_14-58-13.jpg")}
                alt="Sunshine Yellow Dahlia arrangement"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative aspect-3/4 overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={getImageUrl("photo_2025-12-10_23-57-30.jpg")}
                  alt="Flower stems"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-end justify-center p-8">
                  <Link
                    href="/collection"
                    className="bg-white/90 backdrop-blur-sm text-black px-8 py-3 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-3/4 overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={getImageUrl("photo_2025-12-10_23-57-31.jpg")}
                  alt="Bouquets"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-end justify-center p-8">
                  <Link
                    href="/collection"
                    className="bg-white/90 backdrop-blur-sm text-black px-8 py-3 rounded-full hover:bg-white transition-colors shadow-lg"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-3/4 overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={getImageUrl("photo_2025-12-10_23-57-32.jpg")}
                  alt="All products"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-end justify-center p-8">
                  <Link
                    href="/collection"
                    className="bg-white/90 backdrop-blur-sm text-black px-8 py-3 rounded-full hover:bg-white transition-colors shadow-lg"
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
    </>
  );
}
