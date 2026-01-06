import { Hero } from './components/Hero';
import { About } from './components/About';
import { Collection } from './components/Collection';
import { CustomProcess } from './components/CustomProcess';
import { Footer } from './components/Footer';
import { motion } from 'motion/react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#f5f5f0] overflow-x-hidden">
      {/* Simple Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-[#b8956a]/10"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-4 group"
          >
            {/* Logo Icon */}
            <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img src="/images/logo.png" alt="Wild on Woods Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div
                className="text-xl tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Wild on Woods
              </div>
              <div
                className="text-xs text-[#b8956a] uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Factory
              </div>
            </div>
          </a>
          <div className="flex gap-8" style={{ fontFamily: 'var(--font-sans)' }}>
            <a
              href="#collection"
              className="text-sm uppercase tracking-wider text-[#a8a8a0] hover:text-[#b8956a] transition-colors"
            >
              Collection
            </a>
            <a
              href="#contact"
              className="text-sm uppercase tracking-wider text-[#a8a8a0] hover:text-[#b8956a] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Collection />
        <CustomProcess />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}