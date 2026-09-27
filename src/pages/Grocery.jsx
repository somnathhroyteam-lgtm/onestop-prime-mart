import { useMemo, useState } from 'react';
import { products } from '../data/mockData.js';
import ProductGrid from '../components/ProductGrid.jsx';
import SearchBar from '../components/SearchBar.jsx';

const FILTERS = ['All','Fruits','Vegetables','Dairy','Snacks','Beverages','Household'];

export default function Grocery() {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('popular');

  const list = useMemo(() => {
    let arr = products.filter(p => p.category === 'Grocery');
    if (filter !== 'All') arr = arr.filter(p => p.subcategory === filter);
    if (sort === 'price-asc')  arr = [...arr].sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') arr = [...arr].sort((a,b) => b.price - a.price);
    if (sort === 'rating')     arr = [...arr].sort((a,b) => b.rating - a.rating);
    if (sort === 'popular')    arr = [...arr].sort((a,b) => Number(b.bestseller) - Number(a.bestseller));
    return arr;
  }, [filter, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-6">
        <h1 className="text-4xl font-black text-white">Grocery</h1>
        <p className="text-purple-200/70 mt-1">Everyday essentials from nearby stores.</p>
      </header>

      <div className="mb-6"><SearchBar placeholder="Search groceries..." size="md" /></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${
                filter === f
                  ? 'btn-gradient text-white border-transparent'
                  : 'bg-white/5 text-purple-200 border-purple-500/25 hover:bg-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="sort" className="text-purple-200/70">Sort</label>
          <select
            id="sort" value={sort} onChange={e => setSort(e.target.value)}
            className="rounded-xl border border-purple-500/25 bg-black/40 text-white px-3 py-2 text-sm font-semibold outline-none"
          >
            <option value="popular">Popular</option>
            <option value="rating">Top rated</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      <ProductGrid products={list} emptyMessage="No groceries match these filters." />
    </div>
  );
}