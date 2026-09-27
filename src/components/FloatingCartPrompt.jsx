import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart, formatINR } from '../context/CartContext.jsx';

export default function FloatingCartPrompt() {
  const { count, total } = useCart();
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();

  useEffect(() => { setDismissed(false); }, [count]);

  const hide = location.pathname === '/cart' || location.pathname === '/checkout' || location.pathname === '/success';

  return (
    <AnimatePresence>
      {count > 0 && !dismissed && !hide && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="fixed z-50 bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm"
        >
          <div className="glass rounded-2xl shadow-lift border border-purple-500/25 p-4 flex items-start gap-3">
            <div className="grid place-items-center w-10 h-10 rounded-xl btn-gradient text-white shrink-0 shadow-glow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6h15l-1.5 9h-12L6 6z" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="9" cy="20" r="1.6" fill="currentColor"/>
                <circle cx="18" cy="20" r="1.6" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-white leading-tight">Done adding?</p>
              <p className="text-sm text-purple-200/80 leading-snug">Let us get you your items.</p>
              <Link
                to="/cart"
                className="inline-flex items-center gap-1 mt-2 text-sm font-bold text-pink-300 hover:text-pink-200"
              >
                View Bag · {count} item{count > 1 ? 's' : ''} · {formatINR(total)} →
              </Link>
            </div>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="text-purple-300/60 hover:text-white p-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}