/* eslint-disable no-unused-vars */
import { useEffect } from 'react';

import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Celebration() {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl max-w-2xl"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.1, 1.1, 1]
        }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
        className="text-8xl mb-6"
      >
        🥰
      </motion.div>
      <h1 className="text-5xl font-bold text-pink-600 mb-6 font-serif">
        Yay! I knew you'd say Yes!
      </h1>
      <p className="text-2xl text-gray-700 font-medium">
        Best Valentine Ever! ❤️
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3h6OWc4Z3Z6Z3Z6Z3Z6Z3Z6Z3Z6Z3Z6Z3Z6Z3Z6/26BRv0ThflsKCqLXG/giphy.gif" 
          alt="Cute couple" 
          className="rounded-lg shadow-md w-full h-48 object-cover"
        />
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3h6OWc4Z3Z6Z3Z6Z3Z6Z3Z6Z3Z6Z3Z6Z3Z6Z3Z6/T86i6yDyOYz7J6v9d5/giphy.gif" 
          alt="Happy bear" 
          className="rounded-lg shadow-md w-full h-48 object-cover"
        />
      </div>
    </motion.div>
  );
}
