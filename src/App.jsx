/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import { useState, useMemo, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import Mailbox from './components/Mailbox';
import LoveLetter from './components/LoveLetter';
import Celebration from './components/Celebration';
import Passcode from './components/Passcode';

// Custom Matte Color Palette
const COLORS = [
  '#E07A5F', // Terracotta
  '#81B29A', // Sage Green
  '#F2CC8F', // Soft Yellow
  '#3D405B', // Slate
  '#F4F1DE', // Cream (Base)
];

function FloatingParticles() {
  const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    initialX: Math.random() * 100 + "vw",
    scale: 0.2 + Math.random() * 0.6,
    duration: 15 + Math.random() * 25,
    delay: Math.random() * 10,
    rotate: Math.random() * 360,
    color: COLORS[Math.floor(Math.random() * (COLORS.length - 1))], // Exclude base cream
    shape: Math.random() > 0.6 ? 'circle' : 'heart',
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: "110vh",
            x: p.initialX,
            opacity: 0,
            scale: p.scale,
            rotate: p.rotate,
          }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.4, 0],
            rotate: [p.rotate, p.rotate + (Math.random() > 0.5 ? 180 : -180)],
            x: [p.initialX, parseFloat(p.initialX) + (Math.random() > 0.5 ? 15 : -15) + "vw"],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute"
        >
          {p.shape === 'heart' ? (
             <svg width="24" height="24" viewBox="0 0 24 24" fill={p.color} className="blur-[1px]">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
             </svg>
          ) : (
             <div 
               className="rounded-full blur-[2px]" 
               style={{ width: '12px', height: '12px', backgroundColor: p.color }} 
             />
          )}
        </motion.div>
      ))}
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
    </div>
  );
}



function App() {
  const [step, setStep] = useState('login');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleLogin = () => {
    setStep('mailbox');
  };

  const handleOpenMailbox = () => {
    setStep('letter');
    // Attempt playback
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log("Audio play failed (waiting for interaction):", e));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative font-sans selection:bg-[#E07A5F] selection:text-white"
         style={{ backgroundColor: '#FDFBF7', color: '#3D405B' }}>
      
      {/* Background Music */}
      <audio ref={audioRef} loop src="./yngbeautiful.mp3" />
      
      {/* Music Control */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm hover:bg-white/80 transition-colors"
        title="Toggle Music"
      >
        {isPlaying ? '🎵' : '🔇'}
      </motion.button>

      <FloatingParticles />
      
      <div className="z-10 relative w-full flex justify-center perspective-[1200px]">
        <AnimatePresence mode='wait'>
          {step === 'login' && (
             <Passcode key="login" onCorrect={handleLogin} />
          )}

          {step === 'mailbox' && (
            <motion.div
              key="mailbox"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -30, transition: { duration: 0.6 } }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <Mailbox onOpen={handleOpenMailbox} />
            </motion.div>
          )}

          {step === 'letter' && (
             <motion.div
               key="letter"
               initial={{ opacity: 0, y: 100, rotateX: -20 }}
               animate={{ opacity: 1, y: 0, rotateX: 0 }}
               exit={{ opacity: 0, y: -100, rotateX: 20 }}
               transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1.2 }}
             >
              <LoveLetter onAccept={() => setStep('celebration')} />
            </motion.div>
          )}

          {step === 'celebration' && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
            >
              <Celebration />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 right-6 text-[#3D405B] opacity-40 text-xs font-serif italic tracking-widest">
        FOR MARIA
      </div>
    </div>
  );
}

export default App;
