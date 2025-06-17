import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from 'lucide-react';
import { faqData, faqCategories } from '../../data/faq';
import { FAQItem } from '../../types/chat';

export const FAQSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set());

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleVote = (itemId: string, isHelpful: boolean) => {
    if (votedItems.has(itemId)) return;
    
    setVotedItems(prev => new Set([...prev, itemId]));
    // In a real app, you'd send this to your backend
    console.log(`Voted ${isHelpful ? 'helpful' : 'not helpful'} for FAQ ${itemId}`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Search and Filter */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        >
          {faqCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* FAQ List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {filteredFAQs.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="font-medium text-sm text-gray-800">{item.question}</span>
                {expandedItems.has(item.id) ? (
                  <ChevronUp size={16} className="text-gray-500" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </button>
              
              <AnimatePresence>
                {expandedItems.has(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-3 bg-gray-50">
                      <p className="text-sm text-gray-700 mb-3">{item.answer}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                          {item.category}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">Was this helpful?</span>
                          <button
                            onClick={() => handleVote(item.id, true)}
                            disabled={votedItems.has(item.id)}
                            className={`p-1 rounded transition-colors ${
                              votedItems.has(item.id) 
                                ? 'text-green-600 bg-green-100' 
                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                          >
                            <ThumbsUp size={12} />
                          </button>
                          <button
                            onClick={() => handleVote(item.id, false)}
                            disabled={votedItems.has(item.id)}
                            className={`p-1 rounded transition-colors ${
                              votedItems.has(item.id) 
                                ? 'text-red-600 bg-red-100' 
                                : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <ThumbsDown size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredFAQs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No FAQs found matching your search.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-primary text-sm hover:underline mt-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};