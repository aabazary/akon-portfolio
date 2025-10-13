'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { GraduationCap, Award, Code2, ChevronDown, Github, Mail, Linkedin, Download } from 'lucide-react';

interface Technology {
  name: string;
  icon: string;
}

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isBioExpanded, setIsBioExpanded] = useState(false);

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

  useEffect(() => {
    fetch('/assets/data/technologies.json')
      .then((res) => res.json())
      .then((data) => setTechnologies(data))
      .catch((err) => console.error('Error loading technologies:', err));
  }, []);

  const education = [
    { 
      degree: 'B.S. Software Engineering', 
      school: 'Western Governors University',
      image: '/assets/credentials/WGU_Bachelors.jpg' 
    },
    { 
      degree: 'Backend Development Certificate', 
      school: 'Western Governors University',
      image: '/assets/credentials/WGUBE.png' 
    },
    { 
      degree: 'Frontend Development Certificate', 
      school: 'Western Governors University',
      image: '/assets/credentials/WGUFE.png' 
    },
    { 
      degree: 'Full Stack Bootcamp', 
      school: 'UC San Diego Extension',
      image: '/assets/credentials/ucsdcodingbootcamp.jpg' 
    },
    { 
      degree: 'A.S. Biology', 
      school: 'San Diego Miramar College',
      image: '/assets/credentials/MiramarAS_Biology.jpg' 
    },
  ];

  const certifications = [
    { name: 'AWS Certified Cloud Practitioner', image: '/assets/credentials/AWS.png' },
    { name: 'ITIL 4 Foundation', image: '/assets/credentials/Itil4.png' },
    { name: 'CompTIA Project+', image: '/assets/credentials/ProjectPlus.png' },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden snap-start py-20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold gradient-text mb-3 md:mb-4">
              About Me
            </h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6 md:space-y-8">
            {/* Profile Image & Expandable Bio - Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass rounded-lg p-4 md:p-6"
            >
              <div className="flex flex-row gap-4 items-start">
                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex-shrink-0 flex flex-col items-center"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mb-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg blur-md opacity-50"></div>
                    <Image
                      src="/assets/akon.jpg"
                      alt="Akon"
                      fill
                      className="object-cover rounded-lg border-2 border-cyan-500/30 relative z-10"
                    />
                  </div>
                  <p className="text-xs md:text-sm text-center text-gray-300">
                    <span className="font-semibold text-white">Ashkon</span>
                    <br />
                    <span className="text-cyan-400">&quot;Akon&quot;</span>
                    <br />
                    <span className="font-semibold text-white">Abazary</span>
                  </p>
                </motion.div>

                {/* Story - Expandable */}
                <div className="flex-1 text-left">
                  <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2 mb-3">
                    <Code2 className="text-cyan-400" size={20} />
                    From Diagnostician to Developer
                  </h3>
                  
                  {/* First paragraph - always visible */}
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-3">
                    I started as an automotive technician and Owner, where I honed my diagnostic skills—systematically 
                    identifying problems, analyzing systems, and finding root causes.
                  </p>

                  {/* Expandable content */}
                  <motion.div
                    initial={false}
                    animate={{ height: isBioExpanded ? 'auto' : 0, opacity: isBioExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-3">
                      Those same skills now drive how I debug and optimize code. Today, I build full-stack applications 
                      and have the privilege of teaching and mentoring aspiring developers, helping bring the next 
                      generation into software development.
                    </p>
                  </motion.div>

                  {/* Expand/Collapse button */}
                  <button
                    onClick={() => setIsBioExpanded(!isBioExpanded)}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium mt-2"
                  >
                    <span>{isBioExpanded ? 'Show Less' : 'Read More'}</span>
                    <motion.div
                      animate={{ rotate: isBioExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  {/* Social Links & Resume - Mobile */}
                  <div className="flex gap-3 mt-4 items-center">
                    <motion.a
                      href="https://github.com/aabazary"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg glass hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} className="text-white" />
                    </motion.a>
                    
                    <motion.button
                      onClick={handleEmailClick}
                      className="p-2 rounded-lg glass hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.95 }}
                      title="Click to email (also copies to clipboard)"
                    >
                      <Mail size={16} className="text-white" />
                    </motion.button>
                    
                    <motion.a
                      href="https://www.linkedin.com/in/ashkon-abazary/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg glass hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin size={16} className="text-white" />
                    </motion.a>

                    {/* Resume Download Button */}
                    <motion.a
                      href="/assets/Ashkon_Akon_ Abazary_Resume.pdf"
                      download="Ashkon_Abazary_Resume.pdf"
                      className="flex items-center gap-1 px-3 py-2 rounded-lg glass hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Download Resume"
                    >
                      <Download size={14} className="text-cyan-400" />
                      <span className="text-xs text-cyan-400 font-medium">Resume</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education & Certifications Side by Side - Mobile */}
            <div className="grid grid-cols-2 gap-4 md:gap-6" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="glass rounded-lg p-3 md:p-4"
              >
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <GraduationCap className="text-cyan-400" size={20} />
                  <h3 className="text-sm md:text-base font-bold text-white">Education</h3>
                </div>
                
                <div className="space-y-2">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="bg-black/40 rounded-lg p-2 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                          <Image
                            src={edu.image}
                            alt={edu.degree}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-cyan-300 font-semibold text-[9px] md:text-[10px] leading-tight truncate">{edu.degree}</p>
                          <p className="text-gray-400 text-[7px] md:text-[8px] truncate">{edu.school}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass rounded-lg p-3 md:p-4"
              >
                <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <Award className="text-cyan-400" size={20} />
                  <h3 className="text-sm md:text-base font-bold text-white">Certs</h3>
                </div>
                
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-black/40 rounded-lg p-2 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                          <Image
                            src={cert.image}
                            alt={cert.name}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-[7px] md:text-[8px] text-gray-300 group-hover:text-cyan-300 transition-colors text-center leading-tight">
                          {cert.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Desktop Layout - Original 3-column design */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-8 mb-16">
            {/* Profile & Story */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3 glass rounded-lg p-8 space-y-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex-shrink-0 flex flex-col items-center"
                >
                  <div className="relative w-48 h-48 mb-3">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg blur-md opacity-50"></div>
                    <Image
                      src="/assets/akon.jpg"
                      alt="Akon"
                      fill
                      className="object-cover rounded-lg border-2 border-cyan-500/30 relative z-10"
                    />
                  </div>
                  <p className="text-sm text-center text-gray-300">
                    <span className="font-semibold text-white">Ashkon</span>
                    <br />
                    <span className="text-cyan-400">&quot;Akon&quot;</span>
                    <br />
                    <span className="font-semibold text-white">Abazary</span>
                  </p>
                </motion.div>

                {/* Story */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Code2 className="text-cyan-400" size={28} />
                    From Diagnostician to Developer
                  </h3>
                  
                  <p className="text-base text-gray-300 leading-relaxed">
                    I started as an automotive technician and Owner, where I honed my diagnostic skills—systematically 
                    identifying problems, analyzing systems, and finding root causes. Those same skills now 
                    drive how I debug and optimize code.
                  </p>

                  <p className="text-base text-gray-300 leading-relaxed">
                    Today, I build full-stack applications and have the privilege of teaching and mentoring 
                    aspiring developers, helping bring the next generation into software development.
                  </p>

                  {/* Social Links & Resume - Desktop */}
                  <div className="flex gap-4 items-center justify-start mt-6">
                    <motion.a
                      href="https://github.com/aabazary"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg glass hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={24} className="text-white" />
                    </motion.a>
                    
                    <motion.button
                      onClick={handleEmailClick}
                      className="p-3 rounded-lg glass hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.95 }}
                      title="Click to email (also copies to clipboard)"
                    >
                      <Mail size={24} className="text-white" />
                    </motion.button>
                    
                    <motion.a
                      href="https://www.linkedin.com/in/ashkon-abazary/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg glass hover:bg-white/10 transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin size={24} className="text-white" />
                    </motion.a>

                    {/* Resume Download Button */}
                    <motion.a
                      href="/assets/Ashkon_Akon_ Abazary_Resume.pdf"
                      download="Ashkon_Abazary_Resume.pdf"
                      className="flex items-center gap-2 px-4 py-3 rounded-lg glass hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Download Resume"
                    >
                      <Download size={20} className="text-cyan-400" />
                      <span className="text-sm text-cyan-400 font-medium">Resume</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-2 glass rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-cyan-400" size={28} />
                <h3 className="text-xl font-bold text-white">Education</h3>
              </div>
              
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="bg-black/40 rounded-xl p-3 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image
                          src={edu.image}
                          alt={edu.degree}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-cyan-300 font-semibold text-xs leading-tight">{edu.degree}</p>
                        <p className="text-gray-400 text-[10px]">{edu.school}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-cyan-400" size={28} />
                <h3 className="text-xl font-bold text-white">Certifications</h3>
              </div>
              
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/40 rounded-lg p-3 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={cert.image}
                          alt={cert.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-[10px] text-gray-300 group-hover:text-cyan-300 transition-colors text-center leading-tight">
                        {cert.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Technical Skills - Scrolling Conveyor Belt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass rounded-lg p-4 md:p-6 mt-6 md:mt-8 lg:mt-16"
            style={{ overflow: 'visible' }}
          >
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
              <Code2 className="text-cyan-400" size={20} />
              <h3 className="text-base md:text-lg font-bold text-white">Technical Skills</h3>
            </div>
            
            <div className="relative" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-4 bottom-4 w-12 md:w-20 bg-gradient-to-r from-black/80 to-transparent z-[5] pointer-events-none"></div>
              <div className="absolute right-0 top-4 bottom-4 w-12 md:w-20 bg-gradient-to-l from-black/80 to-transparent z-[5] pointer-events-none"></div>
              
              <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'visible' }}>
                <style jsx>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                  @keyframes scroll {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(-50%);
                    }
                  }
                  .animate-scroll {
                    animation: scroll 60s linear infinite;
                  }
                  .animate-scroll:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                
                <div className="flex gap-3 md:gap-6 animate-scroll" style={{ width: 'max-content', paddingTop: '14px', paddingBottom: '8px' }}>
                  {/* Duplicate the technologies array twice for infinite scroll effect */}
                  {[...technologies, ...technologies].map((tech, index) => (
                    <motion.div
                      key={`${tech.name}-${index}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.4, delay: 0.6 + (index % technologies.length) * 0.01 }}
                      whileHover={{ scale: 1.15, y: -8 }}
                      className="bg-black/40 rounded-lg p-2 md:p-4 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group flex flex-col items-center justify-center flex-shrink-0"
                      style={{ width: '70px', zIndex: 9999, position: 'relative' }}
                    >
                      <div className="relative w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2">
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-[9px] md:text-[11px] text-gray-400 text-center group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                        {tech.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
};

export default AboutSection;