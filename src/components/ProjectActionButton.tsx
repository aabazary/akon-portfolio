'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ProjectActionButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
  download?: boolean;
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:shadow-cyan-500/50',
  secondary: 'border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10',
  success: 'border-2 border-green-500 text-green-400 hover:bg-green-500/10',
};

const sizeStyles = {
  small: 'p-1 sm:p-1.5',
  medium: 'p-1.5 sm:p-2 md:p-3',
  large: 'p-5',
};

const iconSizes = {
  small: 'w-3 h-3 sm:w-3.5 sm:h-3.5',
  medium: 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6',
  large: 'w-7 h-7',
};

export const ProjectActionButton = ({
  href,
  icon: Icon,
  label,
  variant = 'secondary',
  size = 'medium',
  download = false,
}: ProjectActionButtonProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      download={download || undefined}
      className={`${variantStyles[variant]} ${sizeStyles[size]} rounded-lg hover:shadow-lg transition-all`}
      onClick={(e) => e.stopPropagation()}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
    >
      <Icon className={iconSizes[size]} />
    </motion.a>
  );
};

