/* eslint-disable no-unused-vars */
import { useEffect } from 'react';

import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Celebration() {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      colors: ['#E07A5F', '#81B29A', '#F2CC8F', '#F4F1DE', '#3D405B'] 
    };

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
      className="text-center p-12 bg-[#FDFBF7]/90 backdrop-blur-sm rounded-sm shadow-xl max-w-2xl border border-[#81B29A]/20"
    >
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 5, 0],
          scale: [1, 1.05, 1.05, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        className="text-8xl mb-6 text-[#E07A5F]"
      >
        🥰
      </motion.div>
      <h1 className="text-5xl font-serif text-[#3D405B] mb-6 tracking-wide">
        AWWW MY DARLINGGGGG!
      </h1>
      <p className="text-2xl text-[#81B29A] font-medium font-sans mb-8">
       You are the Best Valentine Ever ❤️
      </p>
      <div className="grid grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow-inner">
        <div className="relative aspect-square bg-[#F4F1DE] flex items-center justify-center overflow-hidden rounded-md grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholder img */}
           <span className="text-[#3D405B]/50 font-serif italic">Us 1</span>
        </div>
        <div className="relative aspect-square bg-[#F4F1DE] flex items-center justify-center overflow-hidden rounded-md grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholder img */}
           <span className="text-[#3D405B]/50 font-serif italic">Us 2</span>
        </div>
      </div>
    </motion.div>
  );
}
