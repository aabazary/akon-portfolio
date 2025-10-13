'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Github, ExternalLink, AlertCircle } from 'lucide-react';
import { FullScreenProjectCard } from './FullScreenProjectCard';
import { OtherProjectCard } from './OtherProjectCard';

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

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false, margin: "-100px" });

  useEffect(() => {
    // Load projects data
    fetch('/assets/data/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Error loading projects:', err));

    // Load technologies data
    fetch('/assets/data/technologies.json')
      .then(res => res.json())
      .then(data => setTechnologies(data))
      .catch(err => console.error('Error loading technologies:', err));
  }, []);

  return (
    <>
      {/* Projects Title Section */}
      <section 
        ref={titleRef}
        id="projects" 
        className="h-screen min-h-screen flex items-center justify-center relative overflow-hidden snap-start"
      >
        <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isTitleInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl sm:text-8xl lg:text-[12rem] font-bold gradient-text mb-8">
              PROJECTS
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto px-4"
            >
              Explore my latest work and side projects
            </motion.p>

            {/* Spacer */}
            <div style={{ height: '80px' }} />

            {/* Warning Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center px-4"
            >
              <div className="max-w-md w-full">
                <div className="glass rounded-md p-4 border border-yellow-500/30 bg-yellow-500/5">
                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={{ 
                        rotate: [0, -10, 10, -10, 10, 0],
                        scale: [1, 1.1, 1.1, 1.1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      <AlertCircle className="text-yellow-400 flex-shrink-0" size={16} />
                    </motion.div>
                    <p className="text-xs text-gray-300 text-left leading-relaxed">
                      <span className="text-yellow-400 font-semibold">Note:</span> Many personal projects use free-tier deployments. 
                      These may take 30-60 seconds to start if the site hasn&apos;t been visited recently.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          />
        </div>
      </section>

      {/* First 5 Individual Full-Screen Project Sections */}
      {projects.slice(0, 5).map((project, index) => (
        <div key={project.id} id={`project-${index}`}>
          <FullScreenProjectCard
            project={project}
            index={index}
            technologies={technologies}
          />
        </div>
      ))}

      {/* Other Projects Section - if more than 5 projects */}
      {projects.length > 5 && (
        <section className="relative snap-start h-screen flex flex-col py-6 sm:py-8">
          <div className="relative z-10 w-full h-full flex flex-col items-center px-4 sm:px-6 md:px-8">
            {/* Header - Fixed percentage of viewport height */}
            <div className="text-center flex-shrink-0 w-full max-w-7xl" style={{ height: '18vh' }}>
              <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold gradient-text mb-2">
                  Other Projects
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-3">
                  More of my work and experiments
                </p>
                <motion.a
                  href="https://github.com/aabazary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 mx-4 sm:mx-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold rounded-md shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 text-xs sm:text-sm border border-cyan-400/30"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                >
                  <Github className="w-4 h-4" />
                  <span>View All on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </div>

            {/* Project Cards Grid - Remaining viewport height */}
            <div className="flex-1 overflow-y-hidden w-full max-w-7xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full">
                {projects.slice(5).map((project, index) => (
                  <OtherProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    technologies={technologies}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Background Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
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
              className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default ProjectsSection;
