/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoveLetter({ onAccept }) {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 250) - (window.innerWidth / 2 - 125);
    const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    setNoBtnPosition({ x, y });
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#FDFBF7] p-8 md:p-14 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-2xl w-full mx-auto relative overflow-hidden ring-1 ring-[#000]/5"
    >
      {/* Decorative Border */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-[#81B29A]/30 rounded-sm pointer-events-none" />

      {/* Wax Seal */}
      <motion.div 
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 15 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="absolute top-6 right-8 w-16 h-16 bg-[#E07A5F] rounded-full flex items-center justify-center shadow-md z-20"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#FDFBF7" className="opacity-80">
           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </motion.div>

      <div className="relative z-10 text-center space-y-8">
        <motion.h2 variants={itemVariants} className="text-4xl font-serif text-[#3D405B] mb-8 font-medium tracking-wide">
          My Dearest
        </motion.h2>

        {/* Polaroid Photo */}
        <motion.div variants={itemVariants} className="flex justify-center my-10 perspective-500">
          <motion.div 
             whileHover={{ rotate: 1, scale: 1.02, transition: { duration: 0.2 } }}
             className="bg-white p-4 pb-16 shadow-[0_10px_20px_rgba(0,0,0,0.08)] rotate-[-2deg] w-64 h-auto border border-gray-100"
          >
             <div className="w-56 h-56 bg-[#F4F1DE] flex items-center justify-center text-[#81B29A] overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                <span className="text-center p-4 text-sm font-sans tracking-widest uppercase">
                  (Insert Photo)
                </span>
             </div>
             <div className="absolute bottom-4 w-full text-center font-handwriting text-[#3D405B]/70 text-lg font-serif italic">
                us, forever
             </div>
          </motion.div>
        </motion.div>

        <div className="space-y-6 font-serif text-lg text-[#3D405B]/90 leading-relaxed px-4 md:px-12">
          <motion.p variants={itemVariants}>
            Every day with you feels like a beautiful dream I never want to wake up from.
          </motion.p>
          <motion.p variants={itemVariants}>
            You are my quiet peace and my wildest adventure.
          </motion.p>
          <motion.div variants={itemVariants} className="pt-8">
             <p className="text-center font-bold text-2xl text-[#E07A5F] tracking-tight">
               Will you be my Valentine?
             </p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex justify-center gap-6 mt-12 items-center relative h-24">
           <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#D0684E" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-[#E07A5F] text-[#FDFBF7] font-medium rounded-full shadow-lg text-lg tracking-wide transition-all z-20 font-sans"
            onClick={onAccept}
          >
            Yes, I will
          </motion.button>

          <motion.button
            animate={noBtnPosition}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onMouseEnter={() => {
              moveButton();
              setIsHovered(true);
            }}
            onClick={moveButton}
            className="px-8 py-3 bg-[#8D99AE]/20 text-[#3D405B] font-medium rounded-full text-lg hover:bg-[#8D99AE]/30 transition-colors absolute font-sans"
            style={{ position: isHovered ? 'absolute' : 'relative' }}
          >
            No
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
