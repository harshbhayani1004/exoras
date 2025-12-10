"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getImageUrl } from "@/lib/storage";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 bg-tan/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-serif text-dark mb-8"
            >
              The Art of <br />
              Everlasting Beauty
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-700 font-serif leading-relaxed max-w-2xl mx-auto"
            >
              At EXORA, we believe that flowers should be more than just
              fleeting moments. We craft botanical sculptures that capture the
              essence of nature in its most perfect form, designed to last a
              lifetime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden"
            >
              <Image
                src={getImageUrl("photo_2025-12-10_23-57-28.jpg")}
                alt="Handcrafting flowers"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif text-dark">
                Handcrafted with Passion
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Every petal, leaf, and stem is meticulously shaped by hand in
                  our studio. We reject mass production in favor of slow,
                  intentional craftsmanship.
                </p>
                <p>
                  Our artisans spend hours studying real botanicals to replicate
                  their delicate textures and organic imperfections. It is this
                  attention to detail that gives our creations their lifelike
                  quality—a &ldquo;perfect imperfection&rdquo; that mimics
                  nature itself.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-24 bg-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-serif mb-6">Pure Materials</h2>
            <p className="text-lg text-gray-300">
              We source only the finest materials to ensure our flowers look and
              feel extraordinary. From premium silks to hand-dyed papers, every
              element is chosen for its quality and sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Premium Silk",
                desc: "Soft, durable, and capable of holding vibrant, fade-resistant colors.",
              },
              {
                title: "Artisan Paper",
                desc: "Textured papers that mimic the delicate veins and translucency of real petals.",
              },
              {
                title: "Natural Dyes",
                desc: "Eco-friendly pigments that create deep, realistic hues and gradients.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white/5 p-8 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-2xl font-serif mb-4 text-tan">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-tan/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 space-y-8"
            >
              <h2 className="text-4xl font-serif text-dark">
                Sustainable Beauty
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  In a world of fast fashion and disposable decor, EXORA stands
                  for longevity. Our flowers never wilt, reducing the waste
                  associated with the cut flower industry.
                </p>
                <p>
                  By choosing our handmade blooms, you are investing in art that
                  stays beautiful year after year, minimizing your environmental
                  footprint while maximizing the beauty of your home.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 relative h-[600px] bg-gray-100 rounded-lg overflow-hidden"
            >
              <Image
                src={getImageUrl("photo_2025-12-10_23-57-29.jpg")}
                alt="Sustainable handmade flowers"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
