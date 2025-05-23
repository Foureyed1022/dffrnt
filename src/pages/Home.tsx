import React from 'react';
import { Hero } from '../components/home/Hero';
import { AboutSection } from '../components/home/AboutSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { PortfolioSection } from '../components/home/PortfolioSection';
import { TeamSection } from '../components/home/TeamSection';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { ContactSection } from '../components/home/ContactSection';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <TeamSection />
      <TestimonialSection />
      <ContactSection />
    </>
  );
};

export default Home;