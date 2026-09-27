import { motion } from 'framer-motion';
import SafeImage from './SafeImage.jsx';

export default function SellerCard({ seller }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="card-dark rounded-3xl overflow-hidden card-hover">
      <div className="relative aspect-[16/9]">
        <SafeImage src={seller.image} alt={seller.name} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full btn-gradient text-white text-[11px] font-bold shadow-glow">
          {seller.tag}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-white">{seller.name}</h3>
          <span className="text-sm font-bold text-pink-400">★ {seller.rating}</span>
        </div>
        <div className="mt-1 text-xs text-purple-300/70">{seller.type} · {seller.distance} km away</div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-500/15 text-purple-200 border border-purple-400/20">
            ~{seller.eta} min delivery
          </span>
          <span className="text-xs text-pink-300 font-semibold">Open now</span>
        </div>
      </div>
    </motion.div>
  );
}