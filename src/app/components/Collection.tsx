import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';


type RoomType = 'all' | 'living-room' | 'kitchen' | 'bedroom' | 'bathroom';

export function Collection() {
  const [activeFilter, setActiveFilter] = useState<RoomType>('all');

  const products = [
    {
      name: "The Kudu Coffee Table",
      category: 'living-room' as RoomType,
      images: [
        "/images/products/coffee-table-1.jpg",
        "/images/products/coffee-table-2.jpg"
      ],
      description: "Handcrafted from rich teak with a striking kudu silhouette. A centerpiece for gathering."
    },
    {
      name: "Rhino Dining Table",
      category: 'kitchen' as RoomType,
      images: [
        "/images/products/dining-table-1.jpg",
        "/images/products/dining-table-2.jpg",
        "/images/products/dining-table-3.jpg"
      ],
      description: "A powerful statement piece featuring rhino silhouettes. Built for feasts and family."
    },
    {
      name: "Elephant Dining Chair",
      category: 'kitchen' as RoomType,
      images: [
        "/images/products/dining-chair-1.jpg",
        "/images/products/dining-chair-2.jpg",
        "/images/products/dining-chair-3.jpg",
        "/images/products/dining-chair-4.jpg"
      ],
      description: "Majestic elephant tea-time chairs. Comfortable, durable, and uniquely African."
    },
    {
      name: "Leopard Bed Side Table",
      category: 'bedroom' as RoomType,
      images: [
        "/images/products/bed-side-table-1.jpg"
      ],
      description: "Sleek and sophisticated with a prowling leopard detail. Perfect for your bedside essentials."
    },
    {
      name: "Buffalo Headboard",
      category: 'bedroom' as RoomType,
      images: [
        "/images/products/bed-headboard-1.jpg"
      ],
      description: "Strong and protective buffalo motif headboard. Dreams under the African sky."
    },
    {
      name: "Giraffe Bathroom Towel Holder",
      category: 'bathroom' as RoomType,
      images: [
        "/images/products/bathroom-towel-holder-1.jpg"
      ],
      description: "Elegant giraffe neck design for holding your towels. Functional art for the bath."
    },
    {
      name: "Safari Fruit Box",
      category: 'kitchen' as RoomType,
      images: [
        "/images/products/fruit-box-1.jpg",
        "/images/products/fruit-box-2.jpg"
      ],
      description: "Rustic wooden fruit box with intricate wildlife cutouts. Freshness meets wild beauty."
    },
    {
      name: "Savanna Mirror",
      category: 'living-room' as RoomType,
      images: [
        "/images/products/living-room-mirror-1.png"
      ],
      description: "Reflect the beauty of your space with this wildlife-accented mirror."
    },
    {
      name: "Savanna Mirror (Small)",
      category: 'living-room' as RoomType,
      images: [
        "/images/products/living-room-mirror-2.png"
      ],
      description: "A compact version of our wildlife mirror, perfect for any nook."
    },
    {
      name: "Wild Wall Art",
      category: 'living-room' as RoomType,
      images: [
        "/images/products/wall-art.jpg"
      ],
      description: "Steel cut wall art depicting scenes from the bushveldt. A finishing touch for any room."
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
    <section id="collection" className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-[#1a1a1a]">
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

        {/* Asymmetrical Grid - Restored Artistic Layout */}
        <motion.div
          layout
          className="space-y-32"
        >
          {filteredProducts.length > 0 ? (
            <>
              {/* Row 1 - Two columns with offset */}
              {filteredProducts[0] && (
                <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                  <div>
                    <ProductCard key={filteredProducts[0].name} {...filteredProducts[0]} />
                  </div>
                  {filteredProducts[1] && (
                    <div>
                      <ProductCard key={filteredProducts[1].name} {...filteredProducts[1]} offset={true} />
                    </div>
                  )}
                </div>
              )}

              {/* Row 2 - Single large item - Constrained to match other cards */}
              {filteredProducts[2] && (
                <div className="grid md:grid-cols-1 max-w-lg mx-auto">
                  <ProductCard key={filteredProducts[2].name} {...filteredProducts[2]} />
                </div>
              )}

              {/* Row 3 - Two columns with quote */}
              {filteredProducts[3] && (
                <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
                  {filteredProducts[3] && <ProductCard key={filteredProducts[3].name} {...filteredProducts[3]} />}

                  <div className="hidden md:block sticky top-32 pt-32">
                    <blockquote
                      className="text-4xl leading-tight text-[#a8a8a0] border-l-2 border-[#b8956a] pl-8"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      "Furniture that tells the story of Africa's soul."
                    </blockquote>
                    <p className="mt-6 text-[#b8956a] uppercase tracking-widest text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                      — Wild on Woods Philosophy
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Products - Staggered Grid */}
              {filteredProducts.length > 4 && (
                <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                  {filteredProducts.slice(4).map((product, index) => (
                    <ProductCard
                      key={product.name}
                      {...product}
                      offset={index % 2 === 1}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-[#a8a8a0]" style={{ fontFamily: 'var(--font-serif)' }}>
                No pieces found in this category.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Decorative Background Element */}
        <div className="absolute top-1/4 left-0 w-1/4 h-1/2 border border-[#b8956a]/10 -z-10 pointer-events-none" />
      </div>
    </section>
  );
}
