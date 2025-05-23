import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'light',
  className = '' 
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-secondary-950';
  
  return (
    <Link to="/">
      <motion.div 
        className={`flex items-center cursor-pointer ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <h1 className={`text-2xl font-bold ${textColor}`}>
          DFF
          <span className="text-primary transform -scale-x-100 inline-block">R</span>
          NT
        </h1>
      </motion.div>
    </Link>
  );
};