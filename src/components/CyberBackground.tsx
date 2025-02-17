import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

const CyberBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticle = () => {
      const id = Date.now();
      const x = Math.random() * 100; // percentage
      const y = Math.random() * 100; // percentage
      const size = Math.random() * 100 + 50; // between 50 and 150
      const duration = Math.random() * 3 + 2; // between 2 and 5 seconds

      setParticles(prev => [...prev, { id, x, y, size, duration }]);

      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== id));
      }, duration * 1000);
    };

    // Create new particles periodically
    const interval = setInterval(createParticle, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ 
              opacity: 0,
              scale: 0,
              x: `${particle.x}%`,
              y: `${particle.y}%`
            }}
            animate={{ 
              opacity: [0, 0.1, 0],
              scale: [0, 1],
              rotate: [0, 90]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: particle.duration }}
            className="absolute"
            style={{
              width: particle.size,
              height: particle.size,
              background: 'radial-gradient(circle, rgba(52, 211, 153, 0.1) 0%, rgba(52, 211, 153, 0) 70%)'
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CyberBackground;