/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart } from 'lucide-react';

export default function Passcode({ onCorrect }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase().trim() === '24th november 2025') {
      onCorrect();
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
      setInput('');
    }
  };

  return (
    <motion.div 
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0, y: -20 }}
       className="flex flex-col items-center gap-6"
    >
      <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center shadow-inner relative mb-4">
         <motion.div
           animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
         >
           <Lock className="w-12 h-12 text-pink-400" />
         </motion.div>
         {error && (
            <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="absolute -top-2 -right-2 text-2xl"
            >
              💔
            </motion.div>
         )}
      </div>

      <div className="text-center font-serif text-[#3D405B]">
        <h2 className="text-2xl font-bold mb-2">Login Required</h2>
        <p className="opacity-70 text-sm tracking-widest uppercase">Secret Code Word?</p>
      </div>

      <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter keyword..."
          className="w-full px-6 py-3 rounded-full bg-white border-2 border-pink-200 focus:border-pink-400 outline-none text-center text-[#3D405B] font-medium shadow-sm transition-colors"
          autoFocus
        />
        <motion.button 
           whileTap={{ scale: 0.95 }}
           type="submit"
           className="absolute right-2 top-1.5 p-1.5 bg-pink-400 text-white rounded-full hover:bg-pink-500 transition-colors"
        >
           <Heart className="w-5 h-5 fill-current" />
        </motion.button>
      </form>
    </motion.div>
  );
}
