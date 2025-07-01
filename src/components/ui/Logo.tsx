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
        <img 
          src="/DFFRNT LTD LOGO OFF PNG.png" 
          alt="DFFRNT" 
          className="h-12 w-auto"
        />
      </motion.div>
    </Link>
  );
};