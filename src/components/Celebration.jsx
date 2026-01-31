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
      colors: ['#E07A5F', '#81B29A', '#F2CC8F', '#F4F1DE', '#3D405B', '#FFB7B2'] 
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
    <div className="flex flex-col items-center justify-center h-full w-full">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="text-center p-8 bg-[#FDFBF7]/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-3xl border border-[#81B29A]/20 relative overflow-hidden"
      >
        {/* Floating Hearts Decor */}
        <motion.div 
           animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-4 left-4 text-4xl opacity-50"
        >
          💖
        </motion.div>
        
        <motion.div 
           animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-4 right-4 text-4xl opacity-50"
        >
          🥰
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-serif text-[#E07A5F] mb-2 tracking-wide font-bold drop-shadow-sm">
          AWWW MY DARLINGGGGG!
        </h1>
        
        <p className="text-xl md:text-2xl text-[#3D405B] font-medium font-handwriting mb-8 italic">
           You are the Best Valentine Ever ❤️
        </p>

        <motion.div 
           initial={{ scale: 0, rotate: -5 }}
           animate={{ scale: 1, rotate: 0 }}
           transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
           whileHover={{ scale: 1.02, rotate: 1 }}
           className="relative inline-block p-4 bg-white shadow-xl rotate-1 border border-gray-100 rounded-sm"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 bg-[#F4F1DE] overflow-hidden relative rounded-sm">
             <img 
               src="./maria_celebration.jpg" 
               alt="Happy Maria" 
               className="w-full h-full object-cover"
             />
          </div>
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#E07A5F] rounded-full flex items-center justify-center text-white shadow-md z-10 animate-bounce">
             ✨
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
