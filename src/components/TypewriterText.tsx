'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = () => {
  const titles = useMemo(() => [
    'Full Stack Developer',
    'Software Engineer',
    'Creative Problem Solver',
    'Tech Enthusiast'
  ], []);

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000); // Pause for 2 seconds when fully typed
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentTitle.length) {
          setCurrentText(currentTitle.substring(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentTitle.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((currentTitleIndex + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100); // Faster when deleting

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentTitleIndex, titles]);

  return (
    <div className="inline-flex items-center gap-1 min-h-[2rem] pb-6 lg:pb-12 px-3 py-2 rounded-lg bg-black/40 backdrop-blur-sm border border-cyan-400/20">
      <motion.span 
        className="text-lg sm:text-2xl lg:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentText}
      </motion.span>
      <motion.span
        className="text-lg sm:text-2xl lg:text-4xl text-cyan-400"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      >
        |
      </motion.span>
    </div>
  );
};

export default TypewriterText;

