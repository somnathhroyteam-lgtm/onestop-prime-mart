import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import FloatingCartPrompt from './components/FloatingCartPrompt.jsx';

import Home from './pages/Home.jsx';
import Grocery from './pages/Grocery.jsx';
import Medicines from './pages/Medicines.jsx';
import Stationery from './pages/Stationery.jsx';
import About from './pages/About.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2 } }
};

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/grocery" element={<Grocery />} />
              <Route path="/medicines" element={<Medicines />} />
              <Route path="/stationery" element={<Stationery />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <FloatingCartPrompt />
      <Footer />
    </div>
  );
}