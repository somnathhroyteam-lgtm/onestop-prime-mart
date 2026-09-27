import { motion } from 'framer-motion';
import { sellers } from '../data/mockData.js';
import SellerCard from '../components/SellerCard.jsx';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black tracking-tight text-white"
        >
          Getting everyday essentials <span className="text-gradient">quickly</span> and conveniently.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="mt-4 text-lg text-purple-200/80"
        >
          We, <span className="text-white font-semibold">Somnath Roy, Junaid Jia and Samrat Mondal</span> with our mentor <span className="text-white font-semibold">Simran ma'am</span>, built OneStop Prime Mart around one simple idea: getting everyday essentials from nearby stores, fast.
        </motion.p>
      </section>

      <section className="mt-14 grid md:grid-cols-3 gap-5">
        {[
          { t: 'Our idea', d: 'A local-first delivery platform concept. Neighborhood shops, one clean app, and products arriving quickly.' },
          { t: 'How it works', d: 'Browse nearby sellers, add items to your bag, and place a demo order. No real payments happen here.' },
          { t: 'Why nearby stores', d: 'Short distances mean fresher products, faster delivery, and support for local businesses in Berhampore.' }
        ].map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="card-dark rounded-3xl p-6"
          >
            <h3 className="text-xl font-extrabold text-white">{s.t}</h3>
            <p className="text-purple-200/80 mt-2">{s.d}</p>
          </motion.div>
        ))}
      </section>

      <section className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { k: '50+',  v: 'Demo products' },
          { k: '10+',  v: 'Local store examples' },
          { k: '3',    v: 'Core categories' },
          { k: '100%', v: 'Frontend demo' }
        ].map((s, i) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="card-dark rounded-3xl p-6 text-center"
          >
            <div className="text-3xl font-black text-gradient">{s.k}</div>
            <div className="text-sm text-purple-200/70 mt-1">{s.v}</div>
          </motion.div>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-black text-white mb-5">Meet some of our demo sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sellers.slice(0, 3).map(s => <SellerCard key={s.id} seller={s} />)}
        </div>
      </section>

      <section className="mt-16 rounded-3xl p-8 md:p-12 btn-gradient-blue text-white">
        <h2 className="text-3xl font-black">Our mission</h2>
        <p className="mt-3 max-w-3xl text-purple-100/90">
          To imagine a world where everyday shopping is fast, friendly, and local — powered by nearby shops and simple technology. This project is a visual and interactive exploration of that idea, based around Berhampore, Murshidabad.
        </p>
        <p className="mt-6 text-sm text-purple-100/70">
          All numbers, sellers, and products shown across this site are fictional demo values used strictly for design demonstration.
        </p>
      </section>
    </div>
  );
}