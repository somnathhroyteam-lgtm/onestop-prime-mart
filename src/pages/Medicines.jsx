import { products } from '../data/mockData.js';
import ProductGrid from '../components/ProductGrid.jsx';
import SearchBar from '../components/SearchBar.jsx';

export default function Medicines() {
  const list = products.filter(p => p.category === 'Medicines');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-4">
        <h1 className="text-4xl font-black text-white">Medicines & Wellness</h1>
        <p className="text-purple-200/70 mt-1">Everyday healthcare essentials (demo catalog).</p>
      </header>

      <div className="mb-6 rounded-2xl bg-pink-500/10 border border-pink-400/30 text-pink-200 text-sm px-4 py-3">
         Demo catalog only. No real medical orders, prescriptions, or medical advice are processed.
      </div>

      <div className="mb-6"><SearchBar placeholder="Search medicines & wellness..." size="md" /></div>

      <ProductGrid products={list} emptyMessage="No medicine products found." />
    </div>
  );
}