import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '../ui/Container';
import { SectionTitle } from '../ui/SectionTitle';
import { teamMembers } from '../../data/team';
import { Linkedin, Twitter, Instagram, Github, X } from 'lucide-react';
import { TeamMember } from '../../types';

export const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section id="team" className="py-20 bg-white">
      <Container>
        <SectionTitle 
          title="Our Leadership Team" 
          subtitle="Meet the innovative minds behind DFFRNT's success"
          centered
        />
        
        <div className="mt-16">
          <div className="flex overflow-x-auto pb-8 space-x-6">
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                className="flex-none w-72 group cursor-pointer"
                onClick={() => setSelectedMember(member)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-96 overflow-hidden rounded-lg mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white text-lg font-bold">{member.name}</h4>
                    <p className="text-primary text-sm">{member.position}</p>
                    <p className="text-gray-300 text-sm mt-2">{member.department}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>

                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div>
                    <div className="aspect-square rounded-lg overflow-hidden mb-6">
                      <img 
                        src={selectedMember.image} 
                        alt={selectedMember.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex space-x-4">
                      {selectedMember.socialLinks.linkedin && (
                        <a 
                          href={selectedMember.socialLinks.linkedin}
                          className="text-gray-400 hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                      {selectedMember.socialLinks.twitter && (
                        <a 
                          href={selectedMember.socialLinks.twitter}
                          className="text-gray-400 hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter size={20} />
                        </a>
                      )}
                      {selectedMember.socialLinks.instagram && (
                        <a 
                          href={selectedMember.socialLinks.instagram}
                          className="text-gray-400 hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Instagram size={20} />
                        </a>
                      )}
                      {selectedMember.socialLinks.github && (
                        <a 
                          href={selectedMember.socialLinks.github}
                          className="text-gray-400 hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-secondary-950 mb-2">
                      {selectedMember.name}
                    </h3>
                    <p className="text-primary font-medium mb-2">{selectedMember.position}</p>
                    <p className="text-gray-500 mb-6">{selectedMember.department}</p>
                    
                    <div className="prose prose-lg">
                      <p className="text-gray-600 mb-6">{selectedMember.bio}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-secondary-950">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.expertise.map((skill, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 text-secondary-950 px-3 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};