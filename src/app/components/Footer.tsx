import { MessageCircle, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer id="contact" className="relative py-20 px-8 md:px-16 lg:px-24 bg-[#0a0a0a] border-t border-[#b8956a]/20">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
          {/* Left Column - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-4xl md:text-5xl mb-6"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Wild on Woods Factory
            </h3>
            <p
              className="text-lg text-[#a8a8a0] mb-8 max-w-md leading-relaxed"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Crafting bespoke furniture for Africa's most distinguished game lodges and nature reserves. Every piece tells a story.
            </p>
            <div className="flex items-center gap-3 text-[#b8956a]">
              <div className="h-[1px] w-12 bg-[#b8956a]" />
              <span className="text-sm uppercase tracking-widest" style={{ fontFamily: 'var(--font-sans)' }}>
                South Africa
              </span>
            </div>
          </motion.div>

          {/* Right Column - Contact */}
          <motion.div
            className="md:text-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4
              className="text-2xl mb-8 text-[#f5f5f0]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Let's Create Together
            </h4>

            {/* WhatsApp Button - Primary CTA */}
            <motion.a
              href="https://wa.me/0828566269?text=Hello,%20I'm%20interested%20in%20commissioning%20a%20bespoke%20furniture%20piece"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#b8956a] text-[#0a0a0a] hover:bg-[#c9a67a] transition-all duration-300 mb-6 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="uppercase tracking-wider" style={{ fontFamily: 'var(--font-sans)' }}>
                Chat on WhatsApp
              </span>
            </motion.a>

            {/* Email Link */}
            <div className="flex items-center gap-3 md:justify-end">
              <Mail className="w-5 h-5 text-[#b8956a]" />
              <a
                href="mailto:info@wildonwoods.co.za"
                className="text-[#a8a8a0] hover:text-[#b8956a] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                info@wildonwoods.co.za
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#b8956a]/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p
            className="text-sm text-[#a8a8a0]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            © {new Date().getFullYear()} Wild on Woods Factory. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <span
              className="text-sm text-[#a8a8a0] uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Bespoke · Artisanal · Timeless
            </span>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#b8956a]/50 to-transparent" />
      </div>
    </footer>
  );
}