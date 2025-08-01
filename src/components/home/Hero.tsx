import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navigate = useNavigate();

  // Simple 3D-like effect with canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
    }[] = [];

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function initParticles() {
      particles.length = 0;
      const particleCount = Math.floor(window.innerWidth / 10);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          color: `rgba(220, 38, 38, ${Math.random() * 0.5 + 0.1})` // Red with varying opacity
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around the screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Draw connecting lines
      particles.forEach((particleA, i) => {
        particles.slice(i + 1).forEach(particleB => {
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.1 - distance / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.9,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center text-white dark:text-gray-100">
      {/* Background Canvas for 3D effect */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full z-0"
        style={{ backgroundColor: 'var(--hero-bg)' }}
      />
      
      {/* Content */}
      <Container className="relative z-10 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            Think Different. <br className="hidden sm:block" />
            Think <span className="text-primary">DFF<span className="transform -scale-x-100 inline-block">R</span>NT</span>.
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl text-gray-300 dark:text-gray-400 mb-10"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            We're a bold, innovative marketing agency that creates impactful digital experiences for forward-thinking brands.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <Button 
              variant="primary" 
              size="lg"
              className="min-w-[200px]"
              onClick={() => navigate('/services')}
            >
              Our Services
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="min-w-[200px]"
              onClick={() => navigate('/portfolio')}
            >
              View Portfolio
            </Button>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};