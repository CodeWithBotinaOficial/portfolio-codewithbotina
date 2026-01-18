import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeartIcon from './HeartIcon';

const Particle = () => {
  const [config, setConfig] = useState<{
    duration: number;
    delay: number;
    x: number;
    size: number;
  } | null>(null);

  useEffect(() => {
    // Use setTimeout to avoid "synchronous setState in effect" lint error
    // and ensure this runs after the initial paint.
    const timer = setTimeout(() => {
      setConfig({
        duration: Math.random() * 5 + 3, // 3 to 8 seconds
        delay: Math.random() * 5, // 0 to 5 seconds
        x: Math.random() * 100, // 0 to 100vw
        size: Math.random() * 20 + 10, // 10 to 30px
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!config) return null;

  return (
    <motion.div
      className="absolute bottom-0"
      style={{
        left: `${config.x}vw`,
        width: config.size,
        height: config.size,
      }}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: -window.innerHeight, opacity: 0 }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      <HeartIcon className="text-valentine-rose" />
    </motion.div>
  );
};

const Particles = ({ count = 20 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <Particle key={i} />
      ))}
    </div>
  );
};

export default Particles;