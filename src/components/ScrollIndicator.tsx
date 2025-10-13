'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const ScrollIndicator = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState(['home', 'about', 'projects', 'contact']);

  useEffect(() => {
    // Dynamically build sections array based on available projects
    const buildSectionsArray = () => {
      const baseSections = ['home', 'about', 'projects'];
      
      // Find all project sections
      const projectSections = [];
      let projectIndex = 0;
      while (document.querySelector(`#project-${projectIndex}`)) {
        projectSections.push(`project-${projectIndex}`);
        projectIndex++;
      }
      
      // If no individual project IDs found, use first-project as fallback
      if (projectSections.length === 0 && document.querySelector('#first-project')) {
        projectSections.push('first-project');
      }
      
      const newSections = [...baseSections, ...projectSections, 'contact'];
      setSections(newSections);
    };

    // Build sections array after delays to ensure DOM is loaded
    const timer1 = setTimeout(buildSectionsArray, 500);
    const timer2 = setTimeout(buildSectionsArray, 1500);
    const timer3 = setTimeout(buildSectionsArray, 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Find which section we're currently in
      let currentSectionIndex = 0;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.querySelector(`#${sections[i]}`) as HTMLElement;
        if (element && scrollPosition >= element.offsetTop) {
          currentSectionIndex = i;
          break;
        }
      }
      
      setCurrentSection(currentSectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToNextSection = () => {
    const nextSection = currentSection + 1;
    if (nextSection < sections.length) {
      const element = document.querySelector(`#${sections[nextSection]}`) as HTMLElement;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Hide indicator on last section
  if (currentSection >= sections.length - 1) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <motion.button
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center space-y-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group"
      >
        <span className="text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Scroll
        </span>
        
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="p-3 rounded-full glass border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 group-hover:shadow-glow-primary"
        >
          <ChevronDown size={20} className="text-cyan-400" />
        </motion.div>
        
        <div className="w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
    </motion.div>
  );
};

export default ScrollIndicator;
