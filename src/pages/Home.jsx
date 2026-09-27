import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import ProductCard from '../components/ProductCard.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import SellerCard from '../components/SellerCard.jsx';
import { products, sellers, LOCATION } from '../data/mockData.js';

export default function Home() {
  const bestsellers = products.filter(p => p.bestseller).slice(0, 8);
  const mayNeed = products.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* HERO */}
      <section className="pt-10 sm:pt-16 pb-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-pink-300 bg-pink-500/10 rounded-full px-3 py-1.5 border border-pink-400/20"
          >
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            NEARBY • FAST • SIMPLE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white"
          >
            Everything you need.<br />
            <span className="text-gradient">Delivered fast.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-purple-200/80 text-lg max-w-xl"
          >
            Shop from nearby stores in {LOCATION.city} and get your everyday essentials delivered quickly. This is a demonstration concept.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6"
          >
            <SearchBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link to="/grocery" className="px-5 py-3 rounded-xl btn-gradient text-white font-bold shadow-glow">
              Shop Now
            </Link>
            <a href="#categories" className="px-5 py-3 rounded-xl bg-white/5 border border-purple-400/30 text-white font-bold hover:bg-white/10 transition">
              Explore Categories
            </a>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-purple-200/70">
            <div><span className="block text-2xl font-black text-gradient">50+</span>Demo products</div>
            <div><span className="block text-2xl font-black text-gradient">10+</span>Local store examples</div>
            <div><span className="block text-2xl font-black text-gradient">{LOCATION.pin}</span>{LOCATION.city}</div>
          </div>
        </div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="relative aspect-square max-w-[520px] mx-auto w-full"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-purple-600/40 via-fuchsia-500/30 to-pink-500/40 blur-2xl" />
          <div className="relative w-full h-full grid grid-cols-3 grid-rows-3 gap-3 p-3">
            {[
              'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=70',
              'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=70',
              'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=70',
              'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=70',
              'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&q=70',
              'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=70',
              'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=70',
              'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=70',
              'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=70'
            ].map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                className="rounded-2xl object-cover w-full h-full shadow-lift"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              />
            ))}
          </div>
          <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-lift">
            <div className="text-xs text-purple-200/70">Delivering to</div>
            <div className="text-lg font-black text-gradient">{LOCATION.city}, {LOCATION.pin}</div>
          </div>
        </motion.div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black text-white">Shop by category</h2>
            <p className="text-purple-200/70 mt-1">Everyday essentials from nearby stores.</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <CategoryCard title="Grocery" description="Fresh food & everyday essentials" to="/grocery"
            image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=70" />
          <CategoryCard title="Medicines" description="Everyday healthcare essentials" to="/medicines"
            accent="from-blue-600 to-purple-600"
            image="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=70" />
          <CategoryCard title="Stationery" description="School, office & creative supplies" to="/stationery"
            accent="from-fuchsia-600 to-pink-500"
            image="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=600&q=70" />
        </div>
      </section>

      {/* PRODUCTS YOU MAY NEED */}
      <section className="py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black text-white">Products You May Need</h2>
            <p className="text-purple-200/70 mt-1">Popular picks from nearby stores.</p>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2 snap-x">
          {mayNeed.map(p => (
            <div key={p.id} className="min-w-[260px] max-w-[260px] snap-start">
              <ProductCard product={p} compact />
            </div>
          ))}
        </div>
      </section>

      {/* TOP PICKS */}
      <section className="py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black text-white">Top Picks</h2>
            <p className="text-purple-200/70 mt-1">Trending in your neighborhood.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* SELLERS */}
      <section className="py-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-black text-white">Local sellers near you</h2>
            <p className="text-purple-200/70 mt-1">Fictional demo shops around Berhampore.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sellers.map(s => <SellerCard key={s.id} seller={s} />)}
        </div>
      </section>
    </div>
  );
}