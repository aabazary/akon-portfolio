'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Technology {
  name: string;
  icon: string;
}

interface TechnologyBadgeProps {
  tech: Technology;
  index?: number;
  variant?: 'large' | 'small';
  showIcon?: boolean;
  isInView?: boolean;
}

const variantStyles = {
  large: {
    container: 'bg-black/60 rounded-lg p-2 lg:p-3 border border-cyan-500/30 hover:border-cyan-500 transition-all group flex flex-col items-center gap-1',
    iconSize: 'w-6 h-6 lg:w-10 lg:h-10',
    textSize: 'text-[7px] lg:text-[10px]',
    width: '50px',
  },
  small: {
    container: 'px-0.5 py-0.5 sm:px-1.5 sm:py-1 md:px-2 bg-cyan-500/20 text-cyan-300 rounded text-[6px] sm:text-[9px] md:text-[10px] border border-cyan-500/30',
    iconSize: '',
    textSize: '',
    width: 'auto',
  },
};

export const TechnologyBadge = ({
  tech,
  index = 0,
  variant = 'large',
  showIcon = true,
  isInView = true,
}: TechnologyBadgeProps) => {
  const styles = variantStyles[variant];

  if (variant === 'small' || !showIcon) {
    return (
      <span className={styles.container}>
        {tech.name}
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
      whileHover={{ scale: 1.15, y: -4 }}
      className={styles.container}
      style={{ width: styles.width }}
    >
      <div className={`relative ${styles.iconSize}`}>
        <Image
          src={tech.icon}
          alt={tech.name}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <p className={`${styles.textSize} text-gray-400 text-center group-hover:text-cyan-300 transition-colors leading-tight`}>
        {tech.name}
      </p>
    </motion.div>
  );
};

