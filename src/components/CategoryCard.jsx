import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CategoryCard({ title, description, image, to, accent = 'from-purple-600 to-pink-500' }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 240, damping: 20 }}>
      <Link to={to} className="block relative rounded-3xl overflow-hidden group card-dark card-hover">
        <div className="relative aspect-[16/10]">
          <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className={`absolute inset-0 bg-gradient-to-tr ${accent} opacity-60 mix-blend-multiply`} />
        </div>
        <div className="p-5">
          <h3 className="text-xl font-extrabold text-white">{title}</h3>
          <p className="text-sm text-purple-200/70 mt-1">{description}</p>
          <span className="inline-flex items-center gap-1 mt-3 text-pink-300 font-semibold text-sm">
            Explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}