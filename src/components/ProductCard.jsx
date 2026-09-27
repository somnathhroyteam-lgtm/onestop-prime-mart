import { useState } from 'react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage.jsx';
import { useCart, formatINR } from '../context/CartContext.jsx';

export default function ProductCard({ product, compact = false }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e?.stopPropagation?.();
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group card-dark rounded-3xl overflow-hidden flex flex-col card-hover"
    >
      <div className={`relative overflow-hidden ${compact ? 'aspect-square' : 'aspect-[4/3]'}`}>
        <SafeImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Discount badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[11px] font-bold shadow-glow">
            {product.discount}% OFF
          </span>
        )}
        <span className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur text-[11px] font-bold text-pink-200 border border-pink-400/30">
          {product.deliveryTime} min
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-white leading-tight line-clamp-2">{product.name}</h3>
          <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-200 border border-purple-400/20">
            {product.category}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-purple-200/70">
          <SafeImage src={product.sellerImage} alt="" className="w-5 h-5 rounded-full object-cover" />
          <span className="truncate">{product.seller}</span>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-pink-400 font-bold">★ {product.rating.toFixed(1)}</span>
          <span className="text-purple-400/50">·</span>
          <span className="text-purple-200/60">{product.subcategory}</span>
        </div>

        {/* Price block: MRP strikethrough + discounted price below */}
        <div className="mt-auto pt-2">
          <div className="text-xs text-purple-300/60 line-through">{formatINR(product.mrp)}</div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-extrabold text-gradient">{formatINR(product.price)}</div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to bag`}
              className={`px-3.5 py-2 rounded-xl text-sm font-bold transition shadow-sm ${
                added
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                  : 'btn-gradient text-white'
              }`}
            >
              {added ? 'Added ✓' : 'Add to Bag'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}