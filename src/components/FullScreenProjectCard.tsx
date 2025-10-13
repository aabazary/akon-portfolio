'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Github, ExternalLink, Download, Code2 } from 'lucide-react';
import { TechnologyBadge } from './TechnologyBadge';

interface Project {
  id: number;
  img: string;
  title: string;
  desc: string;
  github_link?: string;
  live_link?: string;
  download?: string;
  technologies: string[];
}

interface Technology {
  name: string;
  icon: string;
}

interface FullScreenProjectCardProps {
  project: Project;
  index: number;
  technologies: Technology[];
}

export const FullScreenProjectCard = ({ project, index, technologies }: FullScreenProjectCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-200px" });
  const slideDirection = index % 2 === 0 ? -100 : 100;

  return (
    <section 
      ref={ref}
      className="h-screen min-h-screen flex items-center justify-center relative overflow-hidden snap-start"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, x: slideDirection }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: slideDirection }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row lg:grid lg:grid-cols-2 gap-4 lg:gap-8 items-center justify-center h-full"
        >
          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative w-full md:w-1/2 lg:w-auto ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="relative aspect-[5/3] sm:aspect-[2/1] md:aspect-video rounded-2xl overflow-hidden glass group">
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Hover Overlay with Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center space-x-6 bg-black/60 backdrop-blur-sm"
              >
                {project.github_link && (
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/40 border-2 border-cyan-500 transition-all duration-300"
                  >
                    <Github size={28} className="text-cyan-400" />
                  </motion.a>
                )}
                {project.live_link && (
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-full bg-blue-500/20 hover:bg-blue-500/40 border-2 border-blue-500 transition-all duration-300"
                  >
                    <ExternalLink size={28} className="text-blue-400" />
                  </motion.a>
                )}
                {project.download && (
                  <motion.a
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    href={project.download}
                    download
                    className="p-5 rounded-full bg-green-500/20 hover:bg-green-500/40 border-2 border-green-500 transition-all duration-300"
                  >
                    <Download size={28} className="text-green-400" />
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`w-full md:w-1/2 lg:w-auto md:flex-1 lg:flex-none lg:h-auto ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <div className="glass rounded-lg p-3 sm:p-4 md:p-6 lg:p-10 flex flex-col justify-center h-full">
              <div className="flex items-center space-x-2">
                <Code2 className="text-cyan-400 w-[16px] h-[16px] lg:w-7 lg:h-7" />
                <span className="text-cyan-400 font-semibold text-xs lg:text-base">
                  Project {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div style={{ height: '10px' }} className="lg:hidden" />
              <div style={{ height: '12px' }} className="hidden lg:block" />

              <h3 className="text-xl md:text-2xl lg:text-5xl font-bold text-white leading-tight">
                {project.title}
              </h3>

              <div style={{ height: '8px' }} className="lg:hidden" />
              <div style={{ height: '10px' }} className="hidden lg:block" />

              <p className="text-xs md:text-sm lg:text-xl text-gray-300 leading-relaxed">
                {project.desc}
              </p>

              <div style={{ height: '14px' }} className="lg:hidden" />
              <div style={{ height: '20px' }} className="hidden lg:block" />

              {/* Action Icons */}
              <div className="flex gap-3">
                {project.live_link && (
                  <motion.a
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 lg:p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                    title="View Live Site"
                  >
                    <ExternalLink className="w-5 h-5 lg:w-6 lg:h-6" />
                  </motion.a>
                )}
                {project.github_link && (
                  <motion.a
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 lg:p-4 border-2 border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
                    title="View Code on GitHub"
                  >
                    <Github className="w-5 h-5 lg:w-6 lg:h-6" />
                  </motion.a>
                )}
                {project.download && (
                  <motion.a
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.download}
                    download
                    className="p-2.5 lg:p-4 border-2 border-green-500 text-green-400 rounded-lg hover:bg-green-500/10 transition-all duration-300"
                    title="Download APK"
                  >
                    <Download className="w-5 h-5 lg:w-6 lg:h-6" />
                  </motion.a>
                )}
              </div>

              <div style={{ height: '14px' }} className="lg:hidden" />
              <div style={{ height: '24px' }} className="hidden lg:block" />

              {/* Technologies */}
              <div>
                <h4 className="text-[10px] lg:text-sm uppercase tracking-wider text-cyan-400 font-semibold">
                  Technologies Used
                </h4>
                
                <div style={{ height: '8px' }} className="lg:hidden" />
                <div style={{ height: '12px' }} className="hidden lg:block" />
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((techIcon, techIndex) => {
                    const techData = technologies.find(t => t.icon === techIcon);
                    const tech: Technology = techData || { name: techIcon.split('/').pop()?.split('.')[0] || 'Unknown', icon: techIcon };
                    return (
                      <TechnologyBadge
                        key={techIndex}
                        tech={tech}
                        index={techIndex}
                        variant="large"
                        showIcon={true}
                        isInView={isInView}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute ${index % 2 === 0 ? 'top-1/4 left-0' : 'bottom-1/4 right-0'} w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl`}
        />
      </div>
    </section>
  );
};

