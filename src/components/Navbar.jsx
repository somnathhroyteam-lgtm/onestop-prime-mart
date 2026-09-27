import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { LOCATION } from '../data/mockData.js';

const links = [
  { to: '/',           label: 'Home' },
  { to: '/grocery',    label: 'Grocery' },
  { to: '/medicines',  label: 'Medicines' },
  { to: '/stationery', label: 'Stationery' },
  { to: '/about',      label: 'About Us' }
];

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 450);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40">
      <div className="glass border-b border-purple-500/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="OneStop Prime Mart home">
            <span className="grid place-items-center w-9 h-9 rounded-xl btn-gradient text-white font-black shadow-glow">O</span>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
              OneStop <span className="text-gradient">Prime Mart</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1 ml-4">
            {links.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-semibold rounded-full transition ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-purple-600/70 to-pink-500/70'
                        : 'text-purple-200/80 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex-1" />

          {/* Location indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-purple-100/90 bg-white/5 border border-purple-500/20 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            Delivering to <span className="text-white">{LOCATION.city}, {LOCATION.pin}</span>
          </div>

          {/* Bag */}
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full btn-gradient text-white text-sm font-semibold shadow-glow"
            aria-label={`Bag with ${count} items`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6h15l-1.5 9h-12L6 6z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="9" cy="20" r="1.6" fill="currentColor" />
              <circle cx="18" cy="20" r="1.6" fill="currentColor" />
            </svg>
            <span className="hidden sm:inline">Bag</span>
            <motion.span
              animate={bump ? { scale: [1, 1.35, 1] } : {}}
              transition={{ duration: 0.4 }}
              className="ml-1 grid place-items-center min-w-6 h-6 px-1.5 rounded-full bg-white text-pink-600 text-xs font-bold"
            >
              {count}
            </motion.span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-purple-500/20"
            >
              <ul className="px-4 py-3 space-y-1">
                {links.map(l => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl font-semibold text-sm ${
                          isActive ? 'bg-gradient-to-r from-purple-600/70 to-pink-500/70 text-white' : 'text-purple-200 hover:bg-white/5'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}