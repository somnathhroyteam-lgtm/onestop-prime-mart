import { products } from '../data/mockData.js';
import ProductGrid from '../components/ProductGrid.jsx';
import SearchBar from '../components/SearchBar.jsx';

export default function Stationery() {
  const list = products.filter(p => p.category === 'Stationery');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-6">
        <h1 className="text-4xl font-black text-white">Stationery</h1>
        <p className="text-purple-200/70 mt-1">School, office & creative supplies.</p>
      </header>
      <div className="mb-6"><SearchBar placeholder="Search stationery..." size="md" /></div>
      <ProductGrid products={list} emptyMessage="No stationery products found." />
    </div>
  );
}