import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  name: string;
  images: string[];
  description: string;
}

export function ProductCard({ name, images, description }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImageIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    paginate(-1);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    paginate(1);
  };

  // Preload images for instant switching
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      zIndex: 10
    }),
    center: {
      x: 0,
      zIndex: 10,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '20%' : '-20%', // Slight parallax movement
      zIndex: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -8 }}
        className="relative group mb-8 h-full flex flex-col"
      >
        {/* Image Container with Arrow Overlays */}
        <div
          className="relative overflow-hidden bg-[#242424] rounded-2xl shadow-xl transition-transform duration-500 cursor-zoom-in group-hover:shadow-2xl grid grid-cols-1"
          onClick={() => setIsLightboxOpen(true)}
        >
          {/* Main Image Carousel */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentImageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              src={images[currentImageIndex]}
              alt={name}
              className="col-start-1 row-start-1 w-full h-auto object-cover block"
              style={{ gridArea: "1 / 1" }} // Force stacking
            />
          </AnimatePresence>

          {/* Gradient Overlays for Arrows */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Navigation Arrows - Only visible if multiple images */}
          {images.length > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-[#b8956a]/30 text-[#b8956a] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:border-[#b8956a]/60 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-sm border border-[#b8956a]/30 text-[#b8956a] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:border-[#b8956a]/60 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-[#b8956a] text-sm rounded-full" style={{ fontFamily: 'var(--font-sans)' }}>
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}

          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/30 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <ZoomIn className="w-5 h-5" />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-6 px-2">
          <h3
            className="text-3xl mb-3 text-[#b8956a]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {name}
          </h3>
          <p
            className="text-[#a8a8a0] leading-relaxed"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {description}
          </p>
        </div>

        {/* Decorative Corner Element - Adjusted position */}
        <div className="absolute -top-4 -left-4 w-16 h-16 border-l border-t border-[#b8956a]/0 group-hover:border-[#b8956a]/50 transition-all duration-500 rounded-tl-3xl pointer-events-none" />
      </motion.div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentImageIndex]}
                alt={name}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl text-[#f5f5f0] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{name}</h3>
                <p className="text-[#a8a8a0] text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  {currentImageIndex + 1} / {images.length}
                </p>
              </div>

              {/* Lightbox Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center text-white/50 hover:text-[#b8956a] hover:scale-110 transition-all"
                  >
                    <ChevronLeft className="w-10 h-10" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center text-white/50 hover:text-[#b8956a] hover:scale-110 transition-all"
                  >
                    <ChevronRight className="w-10 h-10" />
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}