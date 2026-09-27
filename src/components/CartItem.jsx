import SafeImage from './SafeImage.jsx';
import { useCart, formatINR } from '../context/CartContext.jsx';

export default function CartItem({ item }) {
  const { inc, dec, remove } = useCart();
  const lineTotal = item.price * item.qty;

  return (
    <div className="flex items-center gap-4 p-4 card-dark rounded-2xl">
      <SafeImage src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-white truncate">{item.name}</h4>
        <p className="text-xs text-purple-300/70 truncate">{item.seller} · {item.category}</p>
        <div className="mt-1 text-sm">
          <span className="text-xs text-purple-300/60 line-through mr-2">{formatINR(item.mrp)}</span>
          <span className="font-semibold text-gradient">{formatINR(item.price)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-purple-500/20">
        <button
          onClick={() => dec(item.id)}
          aria-label={`Decrease quantity of ${item.name}`}
          className="w-8 h-8 grid place-items-center rounded-full bg-white/5 hover:bg-white/10 font-bold text-white"
        >−</button>
        <span className="w-8 text-center font-bold text-sm text-white">{item.qty}</span>
        <button
          onClick={() => inc(item.id)}
          aria-label={`Increase quantity of ${item.name}`}
          className="w-8 h-8 grid place-items-center rounded-full bg-white/5 hover:bg-white/10 font-bold text-white"
        >+</button>
      </div>

      <div className="hidden sm:block w-20 text-right font-extrabold text-gradient">{formatINR(lineTotal)}</div>

      <button
        onClick={() => remove(item.id)}
        aria-label={`Remove ${item.name}`}
        className="text-purple-300/60 hover:text-pink-400 p-2"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}