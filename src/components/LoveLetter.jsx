/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LoveLetter({ onAccept }) {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    setNoBtnPosition({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#fff9f0] p-8 md:p-12 rounded-lg shadow-2xl max-w-2xl w-full mx-4 my-8 relative overflow-hidden border-2 border-[#e6dcc6]"
    >
      {/* Paper texture/lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#d1c4a6 1px, transparent 1px)', backgroundSize: '100% 2rem' }}></div>

      <div className="relative z-10 text-center space-y-6">
        <h2 className="text-3xl font-serif text-[#8b4513] mb-4">My Dearest...</h2>

        {/* Photo Template */}
        <div className="flex justify-center my-6">
          <div className="bg-white p-3 shadow-lg rotate-[-2deg] hover:rotate-0 transition-transform duration-300 w-64 h-64 flex items-center justify-center border border-gray-200">
             <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm overflow-hidden">
                {/* Placeholder for user photo */}
                <span className="text-center p-4">
                  (Insert special photo here)<br/>
                  <span className="text-xs">Edit src/components/LoveLetter.jsx</span>
                </span>
                {/* Example image implementation:
                <img src="/path/to/image.jpg" alt="Us" className="w-full h-full object-cover" /> 
                */}
             </div>
          </div>
        </div>

        <div className="space-y-4 font-serif text-lg text-[#5d4037] leading-relaxed text-left px-4">
          <p>
            From the moment I met you, everything changed. You bring so much light and joy into my life.
          </p>
          <p>
            I wanted to ask you something very special... something that means the world to me.
          </p>
          <p className="text-center font-bold text-xl mt-8">
            Will you be my Valentine?
          </p>
        </div>

        <div className="flex justify-center gap-8 mt-12 items-center relative h-24">
           {/* Yes Button */}
           <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#c75d4d] text-[#fff9f0] font-bold rounded-lg shadow-md text-xl hover:bg-[#a64d3f] transition-colors z-20 font-serif"
            onClick={onAccept}
          >
            Yes, I will! 🌹
          </motion.button>

          {/* No Button (Unclickable) */}
          <motion.button
            animate={noBtnPosition}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={() => {
              moveButton();
              setIsHovered(true);
            }}
            onClick={moveButton}
            className="px-8 py-3 bg-[#8d6e63] text-[#fff9f0] font-bold rounded-lg shadow-md text-xl hover:bg-[#795548] transition-colors absolute font-serif"
            style={{ position: isHovered ? 'absolute' : 'relative' }}
          >
            No
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
