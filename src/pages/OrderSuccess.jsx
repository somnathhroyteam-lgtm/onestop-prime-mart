import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Confetti() {
  const pieces = Array.from({ length: 40 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i % 10) * 0.08;
        const dur = 1.6 + (i % 5) * 0.2;
        const colors = ['#a78bfa', '#ec4899', '#f472b6', '#60a5fa', '#f59e0b'];
        return (
          <span
            key={i}
            className="absolute top-0 w-2 h-3 rounded-sm"
            style={{
              left: `${left}%`,
              background: colors[i % colors.length],
              animation: `confettiFall ${dur}s linear ${delay}s forwards`
            }}
          />
        );
      })}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(80vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function OrderSuccess() {
  const location = useLocation();
  const total = location.state?.total ?? 0;
  const count = location.state?.count ?? 0;
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowCheck(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center relative">
      <Confetti />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 16 }}
        className="relative z-10 grid place-items-center w-24 h-24 mx-auto rounded-full btn-gradient text-white shadow-glow"
      >
        {showCheck && (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <motion.path
              d="M5 12l5 5L20 7"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
          </svg>
        )}
      </motion.div>

      <h1 className="mt-6 text-4xl font-black text-white">Order placed!</h1>
      <p className="mt-2 text-purple-200/80">Your demo order is on its way.</p>

      <div className="mt-6 inline-flex items-center gap-3 card-dark rounded-2xl px-5 py-3">
        <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
        <span className="text-sm font-semibold text-purple-100">Demo order confirmed</span>
      </div>

      <div className="mt-8 card-dark rounded-3xl p-6 max-w-md mx-auto text-left">
        <h2 className="font-extrabold text-white">Order summary</h2>
        <dl className="mt-3 text-sm space-y-1.5">
          <div className="flex justify-between">
            <dt className="text-purple-200/70">Items</dt>
            <dd className="font-semibold text-white">{count}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-purple-200/70">Total (demo)</dt>
            <dd className="font-black text-gradient">{'\u20B9' + Number(total).toLocaleString('en-IN')}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-purple-200/70">Payment</dt>
            <dd className="font-semibold text-pink-300">Not required (demo)</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Link to="/grocery" className="px-5 py-3 rounded-xl btn-gradient text-white font-bold shadow-glow">
          Continue Shopping
        </Link>
        <Link to="/" className="px-5 py-3 rounded-xl bg-white/5 border border-purple-400/30 text-white font-bold hover:bg-white/10">
          Back to Home
        </Link>
      </div>
    </div>
  );
}