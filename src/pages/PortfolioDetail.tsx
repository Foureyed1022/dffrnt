import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { portfolioItems } from '../data/portfolio';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const PortfolioDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const project = portfolioItems.find(item => 
    item.link === `/portfolio/${slug}`
  );

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project not found</h2>
          <Button variant="primary" onClick={() => navigate('/portfolio')}>
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <Container>
        <motion.button
          onClick={() => navigate('/portfolio')}
          className="flex items-center text-gray-600 hover:text-primary mb-8"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Portfolio
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-video rounded-lg overflow-hidden mb-6">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-secondary-950">Deliverables</h3>
                <ul className="space-y-2">
                  {project.deliverables.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-secondary-950">Technologies</h3>
                <ul className="space-y-2">
                  {project.technologies.map((tech, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-secondary-950 mb-4">
              {project.title}
            </h1>
            
            <div className="mb-6">
              <span className="inline-block bg-primary text-secondary-950 px-4 py-1 rounded-full text-sm font-medium">
                {project.category}
              </span>
            </div>

            <div className="prose prose-lg mb-8">
              <p className="text-gray-600">{project.description}</p>
              <div className="whitespace-pre-line text-gray-600">
                {project.fullDescription}
              </div>
            </div>

            <Button 
              variant="primary"
              className="flex items-center"
              onClick={() => window.open('https://dffrnt.com', '_blank')}
            >
              Visit Live Project <ExternalLink className="ml-2" size={18} />
            </Button>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

export default PortfolioDetail;