import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-purple-500/20 bg-black/40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid place-items-center w-9 h-9 rounded-xl btn-gradient text-white font-black">O</span>
            <span className="font-extrabold text-lg text-white">OneStop <span className="text-gradient">Prime Mart</span></span>
          </Link>
          <p className="mt-3 text-sm text-purple-200/70 max-w-md">
            Your nearby essentials, delivered fast. OneStop Prime Mart is a frontend demonstration project exploring a fast, local-first shopping experience around Berhampore, Murshidabad.
          </p>
          <div className="mt-4 flex gap-3">
            {['Twitter','Instagram','GitHub','LinkedIn'].map(n => (
              <a key={n} href="#" aria-label={n} className="w-9 h-9 grid place-items-center rounded-full bg-white/5 hover:bg-white/10 text-purple-200 border border-purple-500/20">
                <span className="text-xs font-bold">{n[0]}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ['/', 'Home'], ['/grocery', 'Grocery'], ['/medicines', 'Medicines'],
              ['/stationery', 'Stationery'], ['/about', 'About Us'], ['/cart', 'Bag']
            ].map(([to, label]) => (
              <li key={to}><Link to={to} className="text-purple-200/70 hover:text-pink-300">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3">Disclaimer</h4>
          <p className="text-sm text-purple-200/70">
            This website is a frontend demonstration project. Products, sellers, prices, delivery times, and orders are fictional.
          </p>
        </div>
      </div>
      <div className="border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-purple-300/60 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <span>© {new Date().getFullYear()} OneStop Prime Mart. Demo project — no real transactions.</span>
          <span>Berhampore · Murshidabad · WB · 742101</span>
        </div>
      </div>
    </footer>
  );
}