import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/mockData.js';
import { useCart, formatINR } from '../context/CartContext.jsx';

export default function SearchBar({ placeholder = 'Search for groceries, medicines, stationery...', size = 'lg' }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const navigate = useNavigate();
  const { add } = useCart();
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return products.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s) ||
      p.seller.toLowerCase().includes(s) ||
      (p.subcategory || '').toLowerCase().includes(s)
    ).slice(0, 8);
  }, [q]);

  const goToCategory = (cat) => navigate(`/${cat.toLowerCase()}`);

  const onSelect = (p) => {
    setOpen(false);
    setQ(p.name);
    goToCategory(p.category);
  };

  const onSubmit = (e) => {
    e?.preventDefault();
    if (results.length) {
      onSelect(results[highlight] || results[0]);
    } else {
      const lower = q.trim().toLowerCase();
      if (['grocery','medicines','stationery'].includes(lower)) goToCategory(lower);
    }
  };

  const onKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(h => Math.min(h + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlight(h => Math.max(h - 1, 0)); }
    if (e.key === 'Enter')     { onSubmit(); }
    if (e.key === 'Escape')    { setOpen(false); inputRef.current?.blur(); }
  };

  const big = size === 'lg';

  return (
    <div className="relative w-full">
      <form onSubmit={onSubmit} role="search">
        <div className={`flex items-center gap-2 rounded-2xl glass shadow-soft ${big ? 'px-3 sm:px-4 py-2.5' : 'px-3 py-2'} border border-purple-500/25`}>
          <svg width={big ? 22 : 18} height={big ? 22 : 18} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-purple-200">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={e => { setQ(e.target.value); setOpen(true); setHighlight(0); }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Search products"
            className={`flex-1 bg-transparent outline-none text-white placeholder:text-purple-300/50 ${big ? 'text-base sm:text-lg py-1.5' : 'text-sm'}`}
          />
          <button
            type="submit"
            className={`rounded-xl btn-gradient text-white font-semibold transition ${big ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs'}`}
          >
            Search
          </button>
        </div>
      </form>

      <AnimatePresence>
        {open && q.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-2 rounded-2xl card-dark shadow-lift overflow-hidden z-50"
            role="listbox"
          >
            {results.length === 0 ? (
              <div className="p-5 text-sm text-purple-200/80">
                <div className="font-semibold text-white">No products found</div>
                <div className="mt-1">Try “milk”, “pen”, “Fresh Basket”, or a category name.</div>
              </div>
            ) : (
              <ul className="max-h-96 overflow-y-auto">
                {results.map((p, i) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => onSelect(p)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition ${i === highlight ? 'bg-purple-500/20' : 'hover:bg-white/5'}`}
                      role="option"
                      aria-selected={i === highlight}
                    >
                      <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" loading="lazy" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate text-white">{p.name}</div>
                        <div className="text-xs text-purple-300/70 truncate">{p.seller} · {p.category}</div>
                      </div>
                      <div className="text-sm font-bold text-gradient">{formatINR(p.price)}</div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); add(p); }}
                        className="ml-2 px-3 py-1 rounded-lg btn-gradient text-white text-xs font-semibold"
                        aria-label={`Add ${p.name} to bag`}
                      >
                        Add
                      </button>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}