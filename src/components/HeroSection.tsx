'use client';

import { motion } from 'framer-motion';
import { Github, Mail, Linkedin } from 'lucide-react';
import PhysicsBallPit from './PhysicsBallPit';
import TypewriterText from './TypewriterText';
import AnimatedName from './AnimatedName';
import ScrollIndicator from './ScrollIndicator';

const HeroSection = () => {
  const handleEmailClick = () => {
    // Copy to clipboard
    navigator.clipboard.writeText('aabazary@gmail.com').then(() => {
      // Email copied successfully
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = 'aabazary@gmail.com';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });
    
    // Open mailto link
    window.open('mailto:aabazary@gmail.com', '_blank');
  };

  return (
    <section id="home" className="h-screen min-h-screen flex items-center justify-center relative overflow-hidden snap-start">
      {/* Physics Ball Pit Background */}
      <PhysicsBallPit />

      {/* Social Links - Top Right on Mobile */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-6 right-4 lg:hidden z-20 flex gap-3 items-center"
      >
        <motion.a
          href="https://github.com/aabazary"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full glass hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.2, rotate: 360 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={20} className="text-white" />
        </motion.a>
        
        <motion.button
          onClick={handleEmailClick}
          className="p-2 rounded-full glass hover:bg-white/10 transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.2, rotate: 360 }}
          whileTap={{ scale: 0.95 }}
          title="Click to email (also copies to clipboard)"
        >
          <Mail size={20} className="text-white" />
        </motion.button>
        
        <motion.a
          href="https://www.linkedin.com/in/ashkon-abazary/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full glass hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.2, rotate: 360 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin size={20} className="text-white" />
        </motion.a>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full h-full flex flex-col lg:block">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center justify-start lg:justify-center min-h-screen py-12 lg:py-20">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-4 lg:space-y-8 lg:pr-12 text-left w-full pt-16 lg:pt-0"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-2 lg:space-y-4"
            >
              <p className="text-sm sm:text-base lg:text-lg text-cyan-400 font-medium uppercase tracking-wider">
                Welcome to my digital space
              </p>
              
              <AnimatedName />
            </motion.div>

            {/* Typewriter Job Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-start"
            >
              <TypewriterText />
            </motion.div>

            {/* Social Links - Desktop Only */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden lg:flex gap-8 items-center justify-start"
              style={{ marginTop: '2rem' }}
            >
              <motion.a
                href="https://github.com/aabazary"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full glass hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.3, rotate: 360 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={36} className="text-white" />
              </motion.a>
              
              <motion.button
                onClick={handleEmailClick}
                className="p-4 rounded-full glass hover:bg-white/10 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.3, rotate: 360 }}
                whileTap={{ scale: 0.95 }}
                title="Click to email (also copies to clipboard)"
              >
                <Mail size={36} className="text-white" />
              </motion.button>
              
              <motion.a
                href="https://www.linkedin.com/in/ashkon-abazary/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full glass hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.3, rotate: 360 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={36} className="text-white" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="lg:relative flex items-center justify-center lg:pl-12 w-full"
          >
            {/* Floating Cards/Stats - Horizontal on Mobile, positioned at bottom */}
            <div className="absolute lg:relative bottom-16 lg:bottom-auto left-0 lg:left-auto right-0 lg:right-auto w-full flex flex-row lg:flex-col gap-2 lg:gap-6 justify-center lg:justify-start max-w-full lg:max-w-md px-3 lg:px-0 z-10">
              
              {/* Stats Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="card glass-primary p-3 lg:p-6 text-center flex-1 lg:flex-none"
              >
                <div className="text-xl lg:text-3xl font-bold text-cyan-400 mb-1 lg:mb-2">50+</div>
                <div className="text-xs lg:text-sm text-gray-300 uppercase tracking-wider">Projects</div>
              </motion.div>

              {/* Stats Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{ scale: 1.05, rotateY: -5 }}
                className="card glass-secondary p-3 lg:p-6 text-center flex-1 lg:flex-none lg:ml-8"
              >
                <div className="text-xl lg:text-3xl font-bold text-blue-400 mb-1 lg:mb-2">3+</div>
                <div className="text-xs lg:text-sm text-gray-300 uppercase tracking-wider">Years</div>
              </motion.div>

              {/* Stats Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="card glass p-3 lg:p-6 text-center flex-1 lg:flex-none lg:mr-8"
              >
                <div className="text-xl lg:text-3xl font-bold text-green-400 mb-1 lg:mb-2">15+</div>
                <div className="text-xs lg:text-sm text-gray-300 uppercase tracking-wider">Techs</div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-10 -right-10 w-20 h-20 border-2 border-cyan-500/30 rounded-full"
            />
            <motion.div
              animate={{
                rotate: -360,
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -bottom-10 -left-10 w-16 h-16 border-2 border-blue-500/30 rounded-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Background Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-green-500/20 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default HeroSection;