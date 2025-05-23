import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Megaphone, Lightbulb, Video, MousePointer } from 'lucide-react';
import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const iconComponents = {
    code: <Code size={32} />,
    palette: <Palette size={32} />,
    megaphone: <Megaphone size={32} />,
    lightbulb: <Lightbulb size={32} />,
    video: <Video size={32} />,
    'mouse-pointer': <MousePointer size={32} />,
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0.5 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: index * 0.1 + 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl overflow-hidden shadow-lg h-full"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ 
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { duration: 0.3 }
      }}
    >
      <div className="p-8">
        <motion.div 
          className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-secondary-950 mb-6"
          variants={iconVariants}
        >
          {iconComponents[service.icon as keyof typeof iconComponents]}
        </motion.div>
        
        <h3 className="text-xl font-bold mb-3 text-secondary-950">{service.title}</h3>
        <p className="text-gray-600 mb-6">{service.description}</p>
        
        <ul className="space-y-2">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center text-gray-700">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};