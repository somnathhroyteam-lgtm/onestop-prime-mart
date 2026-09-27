import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'rushcart.cart.v1';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.product.id ? { ...i, qty: Math.min(i.qty + 1, 99) } : i
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.product, qty: 1 }] };
    }
    case 'INC':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: Math.min(i.qty + 1, 99) } : i
        )
      };
    case 'DEC':
      return {
        ...state,
        items: state.items
          .map(i => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
          .filter(i => i.qty > 0)
      };
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { items: [] };
    case 'HYDRATE':
      return { items: Array.isArray(action.items) ? action.items : [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', items: JSON.parse(raw) });
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items)); } catch {}
  }, [state.items]);

  const totals = useMemo(() => {
    const count = state.items.reduce((s, i) => s + i.qty, 0);
    const subtotal = state.items.reduce((s, i) => s + i.qty * i.price, 0);
    const delivery = 0; // Always free in this demo
    return { count, subtotal, delivery, total: subtotal + delivery };
  }, [state.items]);

  const api = useMemo(() => ({
    items: state.items,
    ...totals,
    add: (product) => dispatch({ type: 'ADD', product }),
    inc: (id) => dispatch({ type: 'INC', id }),
    dec: (id) => dispatch({ type: 'DEC', id }),
    remove: (id) => dispatch({ type: 'REMOVE', id }),
    clear: () => dispatch({ type: 'CLEAR' })
  }), [state.items, totals]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}

export const formatINR = (n) =>
  '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });