import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Team', path: '/team' },
  { name: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const headerVariants = {
    scrolled: {
      backgroundColor: '#0F0F0F',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      height: '70px',
    },
    top: {
      backgroundColor: 'rgba(15, 15, 15, 0.8)',
      backdropFilter: 'blur(10px)',
      boxShadow: 'none',
      height: '90px',
    },
  };

  return (
    <motion.header
      className="fixed w-full z-50 transition-colors duration-300"
      initial="top"
      animate={isScrolled ? 'scrolled' : 'top'}
      variants={headerVariants}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          <Logo variant="light" />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `text-sm font-medium transition duration-300 ease-in-out border-b-2 ${
                    isActive 
                      ? 'text-primary border-primary' 
                      : 'text-white dark:text-gray-200 border-transparent hover:text-primary hover:border-primary'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <ThemeToggle />
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => window.location.href = '/contact'}
            >
              Get Started
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white dark:text-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-secondary-950 dark:bg-gray-900 border-t border-gray-800 dark:border-gray-700"
          >
            <Container>
              <div className="py-4 space-y-3 flex flex-col">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => 
                      `block py-2 px-4 text-base font-medium ${
                        isActive ? 'text-primary' : 'text-white dark:text-gray-200 hover:text-primary'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-white dark:text-gray-200 text-sm">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="pt-2 pb-4">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-full"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};