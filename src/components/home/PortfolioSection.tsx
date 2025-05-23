import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { portfolioItems } from '../../data/portfolio';
import { Badge } from '../ui/Badge';
import { ExternalLink } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const navigate = useNavigate();
  const categories = ['All', ...new Set(portfolioItems.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 bg-secondary-950 text-white">
      <Container>
        <SectionTitle 
          title="Our Portfolio" 
          subtitle="Explore our latest work and see how we've helped brands transform their digital presence."
          centered
          light
        />
        
        <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-primary text-secondary-950' 
                  : 'bg-secondary-800 text-white hover:bg-secondary-700'
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-lg aspect-[4/3] cursor-pointer"
                onClick={() => navigate(item.link)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform: hoveredItem === item.id ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
                
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-secondary-950 to-transparent opacity-80"
                  style={{
                    opacity: hoveredItem === item.id ? 0.9 : 0.6,
                  }}
                ></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <Badge variant="primary" className="self-start mb-2">
                    {item.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  
                  <motion.p 
                    className="text-gray-300 text-sm mb-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredItem === item.id ? 1 : 0,
                      height: hoveredItem === item.id ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.description}
                  </motion.p>
                  
                  <motion.div
                    className="inline-flex items-center text-primary font-medium hover:underline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: hoveredItem === item.id ? 1 : 0,
                      y: hoveredItem === item.id ? 0 : 10
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    View Project <ExternalLink size={16} className="ml-1" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
};