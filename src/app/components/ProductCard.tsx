import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  name: string;
  images: string[];
  description: string;
  layoutVariant?: 'bottom-left' | 'bottom-centered';
}

export function ProductCard({ name, images, description, layoutVariant = 'bottom-left' }: ProductCardProps) {
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
      zIndex: 10,
      opacity: 0
    }),
    center: {
      x: 0,
      zIndex: 10,
      opacity: 1,
      transition: {
        x: { stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '20%' : '-20%', // Slight parallax movement
      zIndex: 0,
      opacity: 0,
      transition: {
        x: { stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="relative group mb-12 h-full flex flex-col"
      >
        {/* Image Container - Pinterest Style */}
        <div
          className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 cursor-zoom-in group-hover:shadow-2xl bg-[#202020] grid grid-cols-1 grid-rows-1"
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
            />
          </AnimatePresence>

          {/* Minimal Gradient Overlay for Controls */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Navigation Arrows - Modern, Always Visible (but subtle), brighter on hover */}
          {images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white bg-black/30 backdrop-blur-md rounded-full border border-white/10 transition-all duration-300 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-white bg-black/30 backdrop-blur-md rounded-full border border-white/10 transition-all duration-300 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              {/* Minimal Image Counter */}
              <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/40 backdrop-blur-md text-white/80 text-[10px] uppercase tracking-wider rounded-md" style={{ fontFamily: 'var(--font-sans)' }}>
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}

          {/* Zoom Icon - Subtle */}
          <div className="absolute top-3 right-3 text-white/90 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none drop-shadow-lg">
            <ZoomIn className="w-5 h-5" />
          </div>
        </div>

        {/* Product Info - Varied Layouts */}
        <div className={`mt-5 px-1 ${layoutVariant === 'bottom-centered' ? 'text-center' : 'text-left'}`}>
          <div className="inline-block relative">
            <h3
              className="text-2xl mb-2 text-[#b8956a] font-medium tracking-wide"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {name}
            </h3>
            {/* Smooth animated underline */}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#b8956a] transition-all duration-500 ease-out group-hover:w-full" />
          </div>

          <p
            className={`text-[#888888] text-sm leading-relaxed mt-1 ${layoutVariant === 'bottom-centered' ? 'mx-auto max-w-sm' : ''}`}
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {description}
          </p>
        </div>
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