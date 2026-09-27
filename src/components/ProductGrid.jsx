import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, emptyMessage = 'No products found.' }) {
  if (!products.length) {
    return (
      <div className="text-center py-16 text-purple-200/70">
        <div className="text-5xl mb-3">🛍️</div>
        <p className="font-semibold text-white">{emptyMessage}</p>
        <p className="text-sm mt-1">Try a different filter or search term.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}