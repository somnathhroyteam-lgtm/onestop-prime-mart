import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CartItem from '../components/CartItem.jsx';
import { useCart, formatINR } from '../context/CartContext.jsx';

export default function Cart() {
  const { items, subtotal, delivery, total, count } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-7xl mb-4">🛒</motion.div>
        <h1 className="text-3xl font-black text-white">Your bag is empty.</h1>
        <p className="text-purple-200/70 mt-2">Looks like you haven’t added anything yet.</p>
        <Link to="/grocery" className="inline-block mt-6 px-6 py-3 rounded-xl btn-gradient text-white font-bold shadow-glow">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-black text-white mb-2">Your Bag</h1>
      <p className="text-purple-200/70 mb-6">{count} item{count > 1 ? 's' : ''} ready for delivery.</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map(it => <CartItem key={it.id} item={it} />)}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 card-dark rounded-3xl p-6 shadow-lift">
            <h2 className="text-lg font-extrabold text-white">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-purple-200/80">Subtotal</dt>
                <dd className="font-semibold text-white">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-purple-200/80">Delivery fee</dt>
                <dd className="font-semibold text-pink-300">{delivery === 0 ? 'FREE' : formatINR(delivery)}</dd>
              </div>
              <div className="border-t border-purple-500/20 my-3" />
              <div className="flex justify-between text-base">
                <dt className="font-bold text-white">Total</dt>
                <dd className="font-black text-gradient">{formatINR(total)}</dd>
              </div>
            </dl>

            <button
              onClick={() => navigate('/checkout')}
              className="mt-5 w-full py-3 rounded-xl btn-gradient text-white font-bold shadow-glow"
            >
              Review Order →
            </button>
            <p className="mt-3 text-xs text-purple-300/60 text-center">
              Demo only — no real payment will be processed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}