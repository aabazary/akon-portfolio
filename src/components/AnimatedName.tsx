'use client';

import { motion } from 'framer-motion';

const AnimatedName = () => {
  const letters = 'AKON'.split('');

  return (
    <motion.h1 
      className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.span 
        className="gradient-text block text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Hi, I'm
      </motion.span>
      
      <motion.div 
        className="text-white block mt-1 lg:mt-2 flex justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={letter}
            className="inline-block"
            initial={{ 
              opacity: 0, 
              y: 100,
              rotateX: -90,
              scale: 0.5
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              rotateX: 0,
              scale: 1
            }}
            transition={{
              duration: 0.8,
              delay: 0.6 + index * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 12
            }}
            whileHover={{
              scale: 1.2,
              rotateY: 360,
              transition: { duration: 0.5 }
            }}
            style={{
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </motion.h1>
  );
};

export default AnimatedName;
