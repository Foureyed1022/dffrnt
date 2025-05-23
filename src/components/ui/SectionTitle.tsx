import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = false,
  light = false,
}) => {
  const titleWords = title.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <motion.h2 
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-secondary-950'}`}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {titleWords.map((word, index) => (
          <motion.span 
            key={index} 
            className="inline-block mr-3"
            variants={item}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className={`text-lg md:text-xl max-w-3xl ${centered ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-gray-600'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        className={`h-1 w-24 bg-primary mt-6 ${centered ? 'mx-auto' : ''}`}
        initial={{ width: 0 }}
        animate={{ width: '6rem' }}
        transition={{ delay: 0.4, duration: 0.8 }}
      />
    </div>
  );
};