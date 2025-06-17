import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  User, 
  Bot,
  Phone,
  Mail,
  Clock,
  Star
} from 'lucide-react';
import { ChatMessage, ChatSession } from '../../types/chat';
import { ChatBubble } from './ChatBubble';
import { FAQSection } from './FAQSection';
import { SupportTicketForm } from './SupportTicketForm';
import { generateId } from '../../utils/helpers';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onToggle }) => {
  const [currentView, setCurrentView] = useState<'chat' | 'faq' | 'ticket'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [hasUserInfo, setHasUserInfo] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcomeMessage: ChatMessage = {
        id: generateId(),
        content: "Hi! I'm here to help you with any questions about DFFRNT's services. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    if (!hasUserInfo) {
      // Show user info form first
      setCurrentView('chat');
      return;
    }

    const userMessage: ChatMessage = {
      id: generateId(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: ChatMessage = {
        id: generateId(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('price') || message.includes('cost') || message.includes('budget')) {
      return "Our pricing varies based on project scope and requirements. We offer competitive rates and flexible payment options. Would you like to schedule a free consultation to discuss your specific needs and get a custom quote?";
    }
    
    if (message.includes('service') || message.includes('what do you do')) {
      return "We offer comprehensive digital marketing services including graphic design, web development, digital marketing, brand strategy, video production, and UI/UX design. Which service are you most interested in?";
    }
    
    if (message.includes('time') || message.includes('how long')) {
      return "Project timelines depend on complexity. Simple websites take 2-4 weeks, while comprehensive branding projects can take 6-12 weeks. We'll provide a detailed timeline during our consultation.";
    }
    
    if (message.includes('contact') || message.includes('call') || message.includes('meet')) {
      return "I'd be happy to connect you with our team! You can reach us at +265 88 55 89 782 or hello@dffrnt.com. Would you like me to schedule a consultation call for you?";
    }
    
    return "That's a great question! For detailed information about your specific needs, I'd recommend speaking with one of our specialists. Would you like me to connect you with a team member, or would you prefer to browse our FAQ section?";
  };

  const handleUserInfoSubmit = (name: string, email: string) => {
    setUserInfo({ name, email });
    setHasUserInfo(true);
    
    const welcomeMessage: ChatMessage = {
      id: generateId(),
      content: `Thanks ${name}! I'm here to help you with any questions about our services. What would you like to know?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, welcomeMessage]);
  };

  const connectToAgent = () => {
    const agentMessage: ChatMessage = {
      id: generateId(),
      content: "I'm connecting you with one of our specialists. Please hold on for a moment...",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, agentMessage]);
    
    setTimeout(() => {
      const agentWelcome: ChatMessage = {
        id: generateId(),
        content: `Hi ${userInfo.name}! I'm Sarah from the DFFRNT team. I see you're interested in our services. How can I help you today?`,
        sender: 'agent',
        timestamp: new Date(),
        type: 'text',
        agentName: 'Sarah Mitchell',
        agentAvatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150'
      };
      
      setMessages(prev => [...prev, agentWelcome]);
    }, 2000);
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <MessageCircle size={24} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          1
        </span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        height: isMinimized ? '60px' : '600px'
      }}
      exit={{ opacity: 0, y: 100, scale: 0.8 }}
      className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <MessageCircle className="text-primary" size={16} />
          </div>
          <div>
            <h3 className="font-semibold">DFFRNT Support</h3>
            <p className="text-xs opacity-90">We're here to help!</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-primary-700 p-1 rounded"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={onToggle}
            className="text-white hover:bg-primary-700 p-1 rounded"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { key: 'chat', label: 'Chat', icon: MessageCircle },
              { key: 'faq', label: 'FAQ', icon: Bot },
              { key: 'ticket', label: 'Support', icon: Mail }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentView(key as any)}
                className={`flex-1 p-3 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
                  currentView === key
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="h-96 overflow-hidden">
            {currentView === 'chat' && (
              <div className="h-full flex flex-col">
                {!hasUserInfo ? (
                  <div className="p-4 space-y-4">
                    <h4 className="font-semibold text-gray-800">Let's get started!</h4>
                    <p className="text-sm text-gray-600">Please provide your details so we can assist you better.</p>
                    
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                      />
                      <button
                        onClick={() => handleUserInfoSubmit(userInfo.name, userInfo.email)}
                        disabled={!userInfo.name || !userInfo.email}
                        className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Start Chat
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <ChatBubble key={message.id} message={message} />
                      ))}
                      
                      {isTyping && (
                        <div className="flex items-center space-x-2 text-gray-500">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm">Typing...</span>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="p-2 border-t border-gray-100">
                      <div className="flex space-x-2 mb-2">
                        <button
                          onClick={connectToAgent}
                          className="flex-1 bg-gray-100 text-gray-700 p-2 rounded text-xs hover:bg-gray-200 transition-colors"
                        >
                          Talk to Agent
                        </button>
                        <button
                          onClick={() => setCurrentView('faq')}
                          className="flex-1 bg-gray-100 text-gray-700 p-2 rounded text-xs hover:bg-gray-200 transition-colors"
                        >
                          Browse FAQ
                        </button>
                      </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim()}
                          className="bg-primary text-white p-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {currentView === 'faq' && <FAQSection />}
            {currentView === 'ticket' && <SupportTicketForm />}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={12} />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={12} />
                <Mail size={12} />
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};