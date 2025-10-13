'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink, Download } from 'lucide-react';
import { ProjectActionButton } from './ProjectActionButton';
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

interface OtherProjectCardProps {
  project: Project;
  index: number;
  technologies: Technology[];
}

export const OtherProjectCard = ({ project, index, technologies }: OtherProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group relative glass rounded-lg overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 w-full"
    >
      {/* Project Image */}
      <div className="relative w-full overflow-hidden h-[7vh] min-h-[60px] sm:h-[13vh] sm:min-h-[100px] lg:h-[15vh] lg:min-h-[120px]">
        <Image
          src={project.img}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-1 sm:p-2 md:p-3">
          <h3 className="text-[9px] sm:text-xs md:text-sm lg:text-base font-bold text-white line-clamp-1">{project.title}</h3>
        </div>
      </div>

      {/* Hover Info Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-black/95 backdrop-blur-sm p-1.5 sm:p-3 md:p-4"
      >
        <div>
          <h3 className="text-[10px] sm:text-sm md:text-base lg:text-lg font-bold text-white mb-0.5 sm:mb-1.5 md:mb-2">{project.title}</h3>
          <p className="text-[7px] sm:text-xs md:text-sm text-gray-300 mb-1 sm:mb-2 md:mb-3 line-clamp-1 sm:line-clamp-2 md:line-clamp-3">{project.desc}</p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-0.5 sm:gap-1 md:gap-1.5 mb-1 sm:mb-2">
            {project.technologies.slice(0, 3).map((techIcon, techIndex) => {
              const techData = technologies.find(t => t.icon === techIcon);
              const tech: Technology = techData || { name: techIcon.split('/').pop()?.split('.')[0] || 'Tech', icon: techIcon };
              return (
                <TechnologyBadge
                  key={techIndex}
                  tech={tech}
                  variant="small"
                  showIcon={false}
                />
              );
            })}
            {project.technologies.length > 3 && (
              <span className="px-0.5 py-0.5 sm:px-1.5 sm:py-1 md:px-2 bg-cyan-500/20 text-cyan-300 rounded text-[6px] sm:text-[9px] md:text-[10px] border border-cyan-500/30">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-1.5 right-1.5 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 flex gap-1.5 sm:gap-2 md:gap-3">
          {project.live_link && (
            <ProjectActionButton
              href={project.live_link}
              icon={ExternalLink}
              label="View Live"
              variant="primary"
              size="medium"
            />
          )}
          {project.github_link && (
            <ProjectActionButton
              href={project.github_link}
              icon={Github}
              label="View Code"
              variant="secondary"
              size="medium"
            />
          )}
          {project.download && (
            <ProjectActionButton
              href={project.download}
              icon={Download}
              label="Download"
              variant="success"
              size="medium"
              download={true}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

