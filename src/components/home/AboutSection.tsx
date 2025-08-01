import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { Lightbulb, Target, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovative Thinking',
      description:
        'We challenge conventional wisdom and push creative boundaries to deliver truly unique solutions.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Strategic Approach',
      description:
        'Every creative decision is backed by data-driven insights and aligned with your business goals.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaborative Process',
      description:
        'We work hand-in-hand with our clients, making you an integral part of the creative journey.',
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <Container>
        <SectionTitle
          title="About DFFRNT"
          subtitle="We're a Lilongwe-based creative agency specializing in digital solutions that help brands stand out in a crowded marketplace."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="aspect-video overflow-hidden rounded-lg bg-secondary-950 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary-800 to-transparent opacity-40"></div>
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="DFFRNT Team at work"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div>
            <motion.h3
              className="text-2xl font-bold mb-4 text-secondary-950 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Story
            </motion.h3>

            <motion.p
              className="text-gray-700 dark:text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Founded in 2020 as DFFRNT VIBES, an entertainment platform that
              launched The Brandon Chiza Show, we've grown into a vibrant and
              forward-thinking company. In 2024, we rebranded as DGL, a
              multiservice organisation with portfolios in media, technology,
              commerce, graphics, and more. We assist brands in reaching their
              full potential by enhancing their online presence and utilising
              future solutions. Whether it's design, content, technology, or
              information. We combine it all to make a lasting impact.
            </motion.p>

            <motion.p
              className="text-gray-700 dark:text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              We blend strategic thinking with artistic innovation to create
              marketing solutions that don't just look good—they deliver
              results. Our team of creatives, strategists, and technologists
              work together to transform your vision into reality.
            </motion.p>

            <div className="space-y-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-start"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariants}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 mr-4 p-2 bg-primary rounded-lg text-secondary-950">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-950 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
