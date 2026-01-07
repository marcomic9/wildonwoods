import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


type RoomType = 'all' | 'living-room' | 'kitchen' | 'bedroom' | 'bathroom';

export function Collection() {
  const [activeFilter, setActiveFilter] = useState<RoomType>('all');

  const products = [
    {
      name: "Coffee Table",
      category: 'living-room' as RoomType,
      images: [
        "/images/products/coffee-table-1.webp",
        "/images/products/coffee-table-2.webp"
      ],
      description: "A masterfully handcrafted teak centerpiece, blending organic silhouettes with timeless design for elegant gathering spaces."
    },
    {
      name: "Towel Holder",
      category: 'bathroom' as RoomType,
      images: [
        "/images/products/bathroom-towel-holder-1.webp"
      ],
      description: "Sculptural functionality meets refined design, transforming everyday essentials into a statement of artistic utility."
    },
    {
      name: "Dining Table",
      category: 'kitchen' as RoomType,
      images: [
        "/images/products/dining-table-1.webp",
        "/images/products/dining-table-2.webp",
        "/images/products/dining-table-3.webp"
      ],
      description: "A commanding dining centerpiece of substantial proportions, crafted to host memorable gatherings with strength and sophistication."
    },
    {
      name: "Wall Art",
      category: 'living-room' as RoomType,
      images: [
        "/images/products/wall-art.webp"
      ],
      description: "Intricate steel craftsmanship capturing the essence of the wild, adding a sophisticated focal point to any interior."
    },
    {
      name: "Bedside Table",
      category: 'bedroom' as RoomType,
      images: [
        "/images/products/bed-side-table-1.webp"
      ],
      description: "A sleek, contemporary bedside companion combining functional surface area with subtle, sophisticated artistic detailing."
    },
    {
      name: "Fruit Box",
      category: 'kitchen' as RoomType,
      images: [
        "/images/products/fruit-box-1.webp",
        "/images/products/fruit-box-2.webp"
      ],
      description: "An artisanal wooden accent piece featuring delicate cutouts, perfectly marrying rustic charm with refined craftsmanship."
    },
    {
      name: "Headboard",
      category: 'bedroom' as RoomType,
      images: [
        "/images/products/bed-headboard-1.webp"
      ],
      description: "A robust and dignified bedroom statement, anchoring the space with a sense of enduring strength and natural calm."
    },
    {
      name: "Small Mirror",
      category: 'living-room' as RoomType,
      images: [
        "/images/products/living-room-mirror-2.webp"
      ],
      description: "A perfectly proportioned reflective accent, designed to bring light and depth to intimate spaces with subtle elegance."
    },
    {
      name: "Dining Chair",
      category: 'kitchen' as RoomType,
      images: [
        "/images/products/dining-chair-1.webp",
        "/images/products/dining-chair-2.webp",
        "/images/products/dining-chair-3.webp",
        "/images/products/dining-chair-4.webp"
      ],
      description: "Ergonomically crafted seating that harmonizes durability with a unique, culturally inspired aesthetic for the modern dining room."
    },
    {
      name: "Wall Mirror",
      category: 'living-room' as RoomType,
      images: [
        "/images/products/living-room-mirror-1.webp"
      ],
      description: "An expansive reflective surface framed by artistic accents, designed to amplify light and enhance spatial perception."
    }
  ];

  const filters = [
    { id: 'all' as RoomType, label: 'All Pieces' },
    { id: 'living-room' as RoomType, label: 'Living Room' },
    { id: 'kitchen' as RoomType, label: 'Kitchen' },
    { id: 'bedroom' as RoomType, label: 'Bedroom' },
    { id: 'bathroom' as RoomType, label: 'Bathroom' }
  ];

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(product => product.category === activeFilter);

  return (
    <section id="collection" className="relative pt-24 pb-20 md:pt-32 md:pb-24 px-4 md:px-12 lg:px-16 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-[#b8956a] mb-4 block" style={{ fontFamily: 'var(--font-sans)' }}>
            The Collection
          </span>
          <h2
            className="text-5xl md:text-7xl mb-6 max-w-3xl leading-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Where Nature Meets Craft
          </h2>
          <p
            className="text-xl text-[#a8a8a0] max-w-2xl"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Each piece is a unique creation, blending the raw beauty of African wildlife with artisanal woodwork and industrial steel.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-16 justify-center md:justify-start"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 border transition-all duration-300 ${activeFilter === filter.id
                ? 'bg-[#b8956a] text-[#0a0a0a] border-[#b8956a]'
                : 'bg-transparent text-[#a8a8a0] border-[#b8956a]/30 hover:border-[#b8956a]/60 hover:text-[#b8956a]'
                }`}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <span className="uppercase tracking-wider text-sm">{filter.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Products Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-12 text-[#a8a8a0] text-sm uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'} Available
        </motion.div>

        {/* Masonry Grid Layout - Pinterest Style */}
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
          <Masonry gutter="2rem">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.name}
                  {...product}
                  layoutVariant={index % 2 === 0 ? 'bottom-left' : 'bottom-centered'}
                />
              ))
            ) : (
              <div className="w-full text-center py-20">
                <p className="text-2xl text-[#a8a8a0]" style={{ fontFamily: 'var(--font-serif)' }}>
                  No pieces found in this category.
                </p>
              </div>
            )}
          </Masonry>
        </ResponsiveMasonry>

        {/* Decorative Background Element */}
        <div className="absolute top-1/4 left-0 w-1/4 h-1/2 border border-[#b8956a]/10 -z-10 pointer-events-none" />
      </div>
    </section>
  );
}
