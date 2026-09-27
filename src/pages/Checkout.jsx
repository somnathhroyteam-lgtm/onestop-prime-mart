import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart, formatINR } from '../context/CartContext.jsx';
import { LOCATION } from '../data/mockData.js';

export default function Checkout() {
  const { items, subtotal, delivery, total, clear } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) navigate('/cart');
  }, [items.length, navigate]);

  const place = () => {
    clear();
    navigate('/success', { state: { total, count: items.length } });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-black text-white">Almost there!</h1>
      <p className="text-purple-200/80 mt-1">Confirm your demo order details below.</p>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <section className="card-dark rounded-3xl p-6">
            <h2 className="font-extrabold text-white">Delivery information (demo)</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-purple-300/70">Name</div>
                <div className="font-semibold text-white">Demo Customer</div>
              </div>
              <div>
                <div className="text-purple-300/70">Address</div>
                <div className="font-semibold text-white">
                  {LOCATION.full}
                </div>
              </div>
              <div>
                <div className="text-purple-300/70">Contact</div>
                <div className="font-semibold text-white">+91 00000 00000 (demo)</div>
              </div>
              <div>
                <div className="text-purple-300/70">Payment</div>
                <div className="font-semibold text-pink-300">Demo — No payment required</div>
              </div>
            </div>
          </section>

          <section className="card-dark rounded-3xl p-6">
            <h2 className="font-extrabold text-white">Items</h2>
            <ul className="mt-4 divide-y divide-purple-500/15">
              {items.map(it => (
                <li key={it.id} className="py-3 flex items-center gap-3">
                  <img src={it.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">{it.name}</div>
                    <div className="text-xs text-purple-300/70 truncate">{it.seller} · Qty {it.qty}</div>
                  </div>
                  <div className="font-bold text-white">{formatINR(it.price * it.qty)}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 card-dark rounded-3xl p-6 shadow-lift">
            <div className="text-xs uppercase tracking-widest text-pink-300 font-bold">Order Summary</div>
            <div className="mt-3 text-3xl font-black text-gradient">OneStop Prime Mart</div>
            <div className="text-purple-300/70 text-sm mt-1">Demo delivery to {LOCATION.city}</div>

            <dl className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-purple-300/80">Subtotal</dt>
                <dd className="text-white">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-purple-300/80">Delivery</dt>
                <dd className="text-pink-300">{delivery === 0 ? 'FREE' : formatINR(delivery)}</dd>
              </div>
              <div className="border-t border-purple-500/20 my-2" />
              <div className="flex justify-between text-base">
                <dt className="font-bold text-white">Total</dt>
                <dd className="font-black text-gradient">{formatINR(total)}</dd>
              </div>
            </dl>

            <button
              onClick={place}
              className="mt-6 w-full py-3 rounded-xl btn-gradient text-white font-black shadow-glow"
            >
              Place Demo Order
            </button>
            <p className="mt-3 text-[11px] text-purple-300/70 text-center">
              No real order will be placed. This is a frontend demonstration.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}