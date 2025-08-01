import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { testimonials } from '../../data/testimonials';
import { Quote } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <Container>
        <SectionTitle 
          title="Client Testimonials" 
          subtitle="Don't just take our word for it. Here's what our clients have to say about working with us."
          centered
        />
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, delay: index * 0.2 }
              }}
              viewport={{ once: true }}
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary opacity-20" />
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 relative z-10">"{testimonial.quote}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-secondary-950 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};