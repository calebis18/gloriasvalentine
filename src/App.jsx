/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Mailbox from './components/Mailbox';
import LoveLetter from './components/LoveLetter';
import Celebration from './components/Celebration';

function FloatingHearts() {
  const hearts = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 100 + "vw",
    scale: 0.5 + Math.random() * 0.8,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 10,
    rotate: Math.random() * 360,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            y: "110vh",
            x: heart.initialX,
            opacity: 0,
            scale: heart.scale,
            rotate: heart.rotate,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.8, 0],
            rotate: [heart.rotate, heart.rotate + 180],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute text-rose-300/40 text-4xl blur-[1px]"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

function App() {
  // 'mailbox', 'letter', 'celebration'
  const [step, setStep] = useState('mailbox');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-stone-100 to-rose-100 flex items-center justify-center p-4 overflow-hidden relative font-sans">
      <FloatingHearts />
      
      <div className="z-10 relative w-full flex justify-center">
        <AnimatePresence mode='wait'>
          {step === 'mailbox' && (
            <motion.div
              key="mailbox"
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Mailbox onOpen={() => setStep('letter')} />
            </motion.div>
          )}

          {step === 'letter' && (
             <motion.div
               key="letter"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0, y: -50 }}
             >
              <LoveLetter onAccept={() => setStep('celebration')} />
            </motion.div>
          )}

          {step === 'celebration' && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Celebration />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 right-4 text-rose-400/50 text-xs font-serif italic">
        Made with love
      </div>
    </div>
  );
}

export default App;
