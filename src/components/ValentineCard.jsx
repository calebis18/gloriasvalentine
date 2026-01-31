/* eslint-disable no-unused-vars */
import { useState } from 'react';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function ValentineCard({ onYes }) {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 200) - (window.innerWidth / 2 - 100);
    const y = Math.random() * (window.innerHeight - 200) - (window.innerHeight / 2 - 100);
    setNoBtnPosition({ x, y });
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl max-w-md w-full text-center border-2 border-pink-200"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-full flex justify-center mb-6"
      >
        <Heart className="w-20 h-20 text-red-500 fill-red-500" />
      </motion.div>
      
      <h1 className="text-4xl font-bold text-pink-600 mb-8 font-serif">
        Will you be my Valentine?
      </h1>

      <div className="flex justify-center gap-4 relative h-20 items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg text-xl hover:bg-green-600 transition-colors z-10"
          onClick={onYes}
        >
          Yes! 💖
        </motion.button>

        <motion.button
          animate={noBtnPosition}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onMouseEnter={() => {
            moveButton();
            setIsHovered(true);
          }}
          onClick={moveButton}
          className="px-8 py-3 bg-red-500 text-white font-bold rounded-full shadow-lg text-xl hover:bg-red-600 transition-colors absolute"
          style={{ position: isHovered ? 'absolute' : 'relative' }}
        >
          No 😢
        </motion.button>
      </div>
    </motion.div>
  );
}
