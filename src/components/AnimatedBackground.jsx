import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const floaters = [
  { src: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&q=60', x: '8%',  y: '18%', size: 90,  delay: 0,  dur: 12 },
  { src: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=200&q=60', x: '82%', y: '12%', size: 110, delay: 2,  dur: 14 },
  { src: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=200&q=60', x: '78%', y: '72%', size: 100, delay: 4,  dur: 13 },
  { src: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&q=60', x: '12%', y: '76%', size: 95,  delay: 3,  dur: 15 },
  { src: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&q=60', x: '50%', y: '6%',  size: 80,  delay: 1,  dur: 16 }
];

export default function AnimatedBackground() {
  const reduce = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (reduce) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [reduce]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base mesh gradient */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Animated color blobs — blue / purple / pink */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-purple-500/35 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-32 w-[460px] h-[460px] rounded-full bg-pink-500/35 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
      <div className="absolute -bottom-40 left-1/3 w-[560px] h-[560px] rounded-full bg-blue-500/30 blur-3xl animate-blob" style={{ animationDelay: '6s' }} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #a78bfa 1px, transparent 1px), linear-gradient(to bottom, #a78bfa 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black, transparent 75%)'
        }}
      />

      {/* Floating product images with parallax */}
      {!reduce && floaters.map((f, i) => (
        <motion.img
          key={i}
          src={f.src}
          alt=""
          loading="lazy"
          className="absolute rounded-2xl opacity-20 shadow-soft object-cover"
          style={{ left: f.x, top: f.y, width: f.size, height: f.size, y: -scrollY * 0.06 * (i % 2 ? 1 : -1) }}
          animate={{ y: [0, -18, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Tiny particles */}
      {!reduce && Array.from({ length: 14 }).map((_, i) => (
        <span
          key={`p${i}`}
          className="absolute w-1.5 h-1.5 rounded-full bg-pink-500/50 animate-floaty"
          style={{
            left: `${(i * 7 + 5) % 100}%`,
            top: `${(i * 13 + 10) % 100}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${6 + (i % 4)}s`
          }}
        />
      ))}
    </div>
  );
}