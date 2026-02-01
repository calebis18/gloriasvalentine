/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

// Typewriter Component
const TypewriterText = ({ text, delay = 0 }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 5,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.h3
      style={{ display: 'inline-block' }} 
      variants={container}
      initial="hidden"
      animate="visible"
      className="font-handwriting text-2xl md:text-3xl text-[#3D405B] leading-relaxed"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h3>
  );
};

export default function LoveLetter({ onAccept }) {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Tilt Logic
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 250) - (window.innerWidth / 2 - 125);
    const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    setNoBtnPosition({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ scale: 0, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        duration: 1.5 
      }}
      className="bg-[#FDFBF7] p-8 md:p-14 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-w-2xl w-full mx-auto relative overflow-hidden ring-1 ring-[#000]/5 perspective-1000"
    >
      {/* Texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" 
           style={{ 
             backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png"), linear-gradient(#d1c4a6 1px, transparent 1px)', 
             backgroundSize: 'auto, 100% 2.5rem' 
           }}></div>

      {/* Wax Seal */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        className="absolute top-8 right-8 w-16 h-16 bg-[#E07A5F] rounded-full flex items-center justify-center shadow-md z-20 opacity-90"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#FDFBF7" className="opacity-90">
           <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </motion.div>

      <div className="relative z-10 space-y-8 flex flex-col items-center">
        {/* Header */}
        <div className="mb-4 text-center">
            <TypewriterText text="My Senbonzakura" delay={0.5} />
        </div>

        {/* Polaroid Photo */}
        <motion.div 
           initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
           animate={{ opacity: 1, rotate: -2, scale: 1 }}
           transition={{ delay: 1, type: "spring" }}
           whileHover={{ rotate: 0, scale: 1.05, transition: { duration: 0.3 } }}
           className="bg-white p-3 pb-12 shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-60 h-auto border border-gray-100 transform cursor-pointer z-10"
        >
           <div className="w-54 h-54 bg-[#F4F1DE] flex items-center justify-center text-[#81B29A] overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src="./maria1.jpg" 
                alt="Maria" 
                className="w-full h-full object-cover"
              />
           </div>
           <div className="absolute bottom-4 w-full text-center font-handwriting text-[#3D405B]/80 text-xl font-serif">
              my gloria ❤️
           </div>
        </motion.div>

        {/* Letter Body */}
        <div className="space-y-6 text-[#3D405B] px-4 md:px-8 text-center" style={{ fontFamily: '"Dancing Script", cursive' }}>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2.5, duration: 2 }}
             className="text-2xl md:text-3xl leading-relaxed"
          >
            My sweet girl i wish i could come up with a different word for love that no one's ever known then rewrite it into the dictionary just so i can prove that no one's ever love anyone the way i love you.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 1.5 }}
          >
             <p className="font-bold text-3xl md:text-4xl mt-8 text-[#E07A5F] drop-shadow-sm">
               Will you be my Valentine?
             </p>
          </motion.div>
        </div>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5.5 }}
          className="flex justify-center gap-6 mt-8 items-center relative h-20 w-full"
        >
           <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#D0684E", boxShadow: "0px 5px 15px rgba(224, 122, 95, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-3 bg-[#E07A5F] text-[#FDFBF7] font-bold rounded-full shadow-md text-xl tracking-wider transition-all z-20 font-sans"
            onClick={onAccept}
          >
            Yes!
          </motion.button>

          <motion.button
            animate={noBtnPosition}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={() => {
              moveButton();
              setIsHovered(true);
            }}
            onClick={moveButton}
            className="px-10 py-3 bg-[#F4F1DE] text-[#3D405B]/60 font-bold rounded-full shadow-sm text-xl hover:bg-[#F2CC8F]/20 transition-colors absolute font-sans border border-[#3D405B]/10"
            style={{ position: isHovered ? 'absolute' : 'relative' }}
          >
            No
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
