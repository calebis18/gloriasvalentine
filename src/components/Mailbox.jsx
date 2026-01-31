/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MailOpen } from 'lucide-react';

export default function Mailbox({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(onOpen, 1000); // Wait for open animation
  };

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <motion.div
        layout
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        animate={isHovered && !isOpen ? { 
           rotate: [0, -1, 1, -1, 0], 
           y: [0, -2, 0] 
        } : {}}
      >
        {/* Mailbox Container */}
        <div className="w-72 h-56 relative perspective-[800px]">
           {/* Back of Mailbox (Interior) */}
           <div className="absolute inset-0 bg-[#3D405B] rounded-lg translate-z-[-20px] shadow-inner" />

           {/* Mailbox Body (Outer Shell) */}
           <motion.div 
              className="absolute inset-0 bg-[#FFB7B2] rounded-lg border-4 border-[#3D405B] shadow-2xl flex items-center justify-center z-20 origin-top overflow-hidden"
              initial={false}
              animate={isOpen ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
           >
              {/* Texture/Decor */}
              <div className="absolute top-0 left-0 w-full h-2 bg-white/30" />
              <div className="absolute bottom-0 left-0 w-full h-2 bg-white/30" />
              
              <Mail className="w-20 h-20 text-white/90" />
           </motion.div>

           {/* Letter Inside (Hidden initially) */}
           <motion.div
             className="absolute top-8 left-10 w-52 h-40 bg-[#F4F1DE] shadow-md z-10 flex items-center justify-center rounded-sm border border-gray-200"
             initial={{ y: 50, opacity: 0 }}
             animate={isOpen ? { y: -60, opacity: 1, rotate: -5 } : { y: 50, opacity: 0 }}
             transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
           >
              <div className="w-40 h-1 bg-gray-200 mb-2 rounded-full" />
              <div className="w-32 h-1 bg-gray-200 rounded-full" />
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#E07A5F]" />
           </motion.div>

           {/* Flag */}
           <motion.div 
             className="absolute -right-6 top-10 w-4 h-20 bg-[#FF686B] rounded-full origin-bottom z-0 border-2 border-[#3D405B]"
             initial={{ rotate: 45 }}
             animate={isOpen ? { rotate: 0 } : { rotate: isHovered ? 25 : 45 }}
           />
        </div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.6, y: 0 }}
        className="mt-12 text-[#3D405B] font-serif font-bold text-lg tracking-[0.2em] uppercase"
      >
        {isOpen ? "Opening..." : "Open Me"}
      </motion.p>
    </div>
  );
}
