import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Asymmetrical Editorial Layout */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 relative"
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 1.2 }}
                src="/images/products/about-maker.png"
                alt="Artisan wood workshop"
                className="w-full h-[500px] object-cover"
              />
              {/* Overlapping accent element */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-8 -right-8 w-48 h-48 border border-[#b8956a]/30 -z-10"
              />
            </motion.div>
          </motion.div>

          {/* Right Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7"
          >
            <div className="mb-6">
              <span className="text-sm uppercase tracking-widest text-[#b8956a]" style={{ fontFamily: 'var(--font-sans)' }}>
                About the Maker
              </span>
            </div>

            <h2
              className="text-5xl md:text-6xl mb-8 leading-tight"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Crafted Stories in Wood & Steel
            </h2>

            <div className="space-y-6 text-lg md:text-xl text-[#a8a8a0]" style={{ fontFamily: 'var(--font-sans)' }}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                The furniture pieces are uniquely crafted with <span className="text-[#f5f5f0]">African wildlife silhouettes</span>, making each one a work of art that brings a piece of the wild into any space.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                You work with both <span className="text-[#f5f5f0]">soft and hard woods</span>, depending on the customer's preferences, and the steel components are powder-coated for durability and a sleek finish. Additionally, the wood is carefully varnished to enhance its grain and ensure longevity. Every piece is built to the customer's exact specifications, allowing for personalization in design, size, and finish.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                This custom approach ensures that each piece is unique and tailored to fit the style and needs of the client, whether it's for a home, office, or special project. Your furniture is a blend of artistry, functionality, and durability, with a nod to African wildlife, appealing to those who appreciate craftsmanship and nature-inspired designs.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-base italic text-[#b8956a]"
              >
                Started 2 years ago, we continue to grow our passion for creating bespoke pieces that withstand the test of time.
              </motion.p>
            </div>

            {/* Decorative Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-8 border-t border-[#b8956a]/20 pt-8"
            >
              <div>
                <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: '#b8956a' }}>2+</div>
                <div className="text-sm uppercase tracking-wider text-[#a8a8a0]" style={{ fontFamily: 'var(--font-sans)' }}>Years Crafting</div>
              </div>
              <div>
                <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: '#b8956a' }}>100%</div>
                <div className="text-sm uppercase tracking-wider text-[#a8a8a0]" style={{ fontFamily: 'var(--font-sans)' }}>Bespoke</div>
              </div>
              <div>
                <div className="text-4xl mb-2" style={{ fontFamily: 'var(--font-serif)', color: '#b8956a' }}>∞</div>
                <div className="text-sm uppercase tracking-wider text-[#a8a8a0]" style={{ fontFamily: 'var(--font-sans)' }}>Unique Pieces</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background Texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1680538993934-f81adb9e7828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwZ3JhaW4lMjB0ZWFrJTIwdGV4dHVyZXxlbnwxfHx8fDE3Njc2ODE2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Wood texture"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}