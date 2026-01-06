import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/images/products/hero-bg.png" 
          alt="Luxury safari lodge interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#1a1a1a]" />
      </div>

      {/* Lion Silhouette SVG Overlay */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M250 100C200 100 150 130 150 180C150 200 160 220 180 235C160 250 150 270 150 290C150 340 200 380 250 380C300 380 350 340 350 290C350 270 340 250 320 235C340 220 350 200 350 180C350 130 300 100 250 100Z" fill="#b8956a" fillOpacity="0.3"/>
          <circle cx="230" cy="170" r="8" fill="#b8956a" fillOpacity="0.3"/>
          <circle cx="270" cy="170" r="8" fill="#b8956a" fillOpacity="0.3"/>
          <path d="M200 150C190 140 180 135 170 140M300 150C310 140 320 135 330 140M180 200C170 210 165 220 165 230M320 200C330 210 335 220 335 230" stroke="#b8956a" strokeWidth="3" strokeOpacity="0.3" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-start justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 overflow-hidden"
        >
          <div className="h-1 w-24 bg-[#b8956a]" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-6 text-6xl md:text-7xl lg:text-8xl tracking-tight"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Artistry of the Wild
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-12 max-w-2xl text-xl md:text-2xl text-[#a8a8a0]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Bespoke wood and steel furniture crafted for Africa's finest lodges.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          onClick={scrollToCollection}
          className="group relative overflow-hidden px-12 py-4 bg-[#b8956a] text-[#0a0a0a] transition-all duration-300 hover:bg-[#c9a67a]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <span className="relative z-10 tracking-wider uppercase text-sm">View the Collection</span>
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToCollection}
      >
        <span className="text-xs uppercase tracking-widest text-[#a8a8a0]" style={{ fontFamily: 'var(--font-sans)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[#b8956a]" />
        </motion.div>
      </motion.div>
    </section>
  );
}