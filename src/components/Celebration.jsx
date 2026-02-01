/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Celebration() {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    // Initial burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (e) => {
    setClicks(c => c + 1);
    // Click explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: e.clientY / window.innerHeight, x: e.clientX / window.innerWidth },
      colors: ['#FFB7B2', '#E07A5F', '#F2CC8F'],
      shapes: ['heart']
    });
  };

  return (
    <div 
      className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden"
      onClick={handleClick}
    >
      {/* Radiant Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="w-[200vw] h-[200vw] bg-gradient-to-r from-transparent via-[#F2CC8F]/10 to-transparent opacity-50"
         />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="text-center p-8 bg-[#FDFBF7]/80 backdrop-blur-md rounded-2xl shadow-2xl max-w-3xl border border-[#81B29A]/20 relative z-10"
      >
        <motion.div 
           animate={{ scale: [1, 1.2, 1] }}
           transition={{ duration: 1.5, repeat: Infinity }}
           className="text-6xl mb-4"
        >
          🥰
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-serif text-[#E07A5F] mb-4 tracking-wide font-bold drop-shadow-sm">
          AWWW MY DARLINGGGGG!
        </h1>
        
        <p className="text-xl md:text-2xl text-[#3D405B] font-medium font-handwriting mb-8 italic">
           You are the Best Valentine Ever ❤️
        </p>

        {/* Photo Container with Halo */}
        <div className="relative inline-block group cursor-pointer">
          {/* Pulsing Halo */}
          <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="absolute inset-0 bg-[#E07A5F] rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition-opacity"
          />
          
          <motion.div 
             initial={{ scale: 0, rotate: -5 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
             whileHover={{ scale: 1.05, rotate: 2 }}
             whileTap={{ scale: 0.95 }}
             className="relative p-3 bg-white shadow-2xl rotate-1 border border-gray-100 rounded-sm z-10"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 bg-[#F4F1DE] overflow-hidden relative rounded-sm">
               <img 
                 src="./maria_raph.jpg" 
                 alt="Happy Maria" 
                 className="w-full h-full object-cover"
               />
               
               {/* Shine Effect */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-full shadow-lg font-handwriting text-[#E07A5F] z-20 rotate-[-5deg] border border-[#E07A5F]/20">
              
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <p className="absolute bottom-8 text-[#3D405B]/40 font-sans text-sm animate-pulse">
        (Tap anywhere for more love!)
      </p>
    </div>
  );
}
