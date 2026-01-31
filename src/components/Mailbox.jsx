/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen } from 'lucide-react';

export default function Mailbox({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    setTimeout(onOpen, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        className="cursor-pointer relative group"
        onClick={handleClick}
      >
        <div className="w-64 h-64 bg-amber-100 rounded-t-full rounded-b-lg shadow-2xl flex items-center justify-center border-4 border-amber-200 relative overflow-hidden">
          {/* Mailbox body details */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 opacity-50" />
          
          <motion.div
            animate={isOpen ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="z-10"
          >
            <Mail className="w-32 h-32 text-red-400" />
            <p className="mt-4 text-center text-amber-800 font-serif font-bold text-xl">
              You've got mail!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <MailOpen className="w-32 h-32 text-red-500" />
          </motion.div>
        </div>
        
        {/* Flag */}
        <motion.div 
          className="absolute -right-4 top-12 w-4 h-24 bg-red-500 rounded-full origin-bottom"
          initial={{ rotate: 45 }}
          animate={isOpen ? { rotate: 0 } : { rotate: 45 }}
        />
      </motion.div>
      <p className="mt-8 text-white/80 animate-pulse text-lg">Click to open</p>
    </div>
  );
}
