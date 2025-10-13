'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Github, Linkedin, Copy, Check, ExternalLink } from 'lucide-react';
import BouncingBalls from './BouncingBalls';

// Contact Information Configuration
const CONTACT_INFO = {
  email: 'aabazary@gmail.com',
  location: 'San Diego, CA',
  socials: {
    github: 'https://github.com/aabazary',
    linkedin: 'https://www.linkedin.com/in/ashkon-abazary/',
  },
  tagline: 'Have a project in mind or want to collaborate? I\'d love to hear from you!',
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section id="contact" className="h-screen min-h-screen flex items-center justify-center relative overflow-hidden snap-start">
      {/* Bouncing Balls Background */}
      <BouncingBalls />
      
      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 w-full" style={{ zIndex: 10 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl sm:text-7xl lg:text-8xl font-bold gradient-text mb-6">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              {CONTACT_INFO.tagline}
            </p>
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-2xl p-8 lg:p-12 space-y-10"
          >
            {/* Email Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="text-cyan-400" size={32} />
                <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
              </div>

              {/* Email Display with Actions */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex-1 flex items-center space-x-4 p-5 bg-black/40 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="p-3 rounded-full bg-cyan-500/20">
                    <Mail size={24} className="text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-cyan-300 font-semibold text-xs uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white text-lg truncate">{CONTACT_INFO.email}</p>
                  </div>
                </motion.div>

                {/* Email Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleCopyEmail}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border-2 border-cyan-500 text-cyan-400 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap"
                  >
                    {copied ? (
                      <>
                        <Check size={20} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={20} />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </motion.button>

                  <motion.a
                    href={`mailto:${CONTACT_INFO.email}`}
                    target="_blank" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap"
                  >
                    <ExternalLink size={20} />
                    <span className="hidden sm:inline">Send Email</span>
                  </motion.a>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

            {/* Location & Social Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Location */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 p-5 bg-black/40 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-blue-500/20">
                  <MapPin size={24} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-blue-300 font-semibold text-xs uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white text-lg">{CONTACT_INFO.location}</p>
                </div>
              </motion.div>

              {/* Social Links */}
              <div>
                <h4 className="text-sm font-semibold text-cyan-400 mb-4 uppercase tracking-wider">
                  Connect With Me
                </h4>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    href={CONTACT_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-black/60 border-2 border-cyan-500 hover:bg-cyan-500/20 transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github size={28} className="text-cyan-400" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    href={CONTACT_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-black/60 border-2 border-blue-500 hover:bg-blue-500/20 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={28} className="text-blue-400" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
