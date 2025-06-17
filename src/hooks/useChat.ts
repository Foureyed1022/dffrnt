import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, ChatSession } from '../types/chat';
import { generateId } from '../utils/helpers';

export const useChat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Initialize chat session
  const initializeSession = useCallback((userInfo: { name: string; email: string }) => {
    const session: ChatSession = {
      id: generateId(),
      userId: generateId(),
      userName: userInfo.name,
      userEmail: userInfo.email,
      status: 'active',
      messages: [],
      startTime: new Date(),
      priority: 'medium',
      category: 'general'
    };

    setCurrentSession(session);
    setIsConnected(true);

    // Welcome message
    const welcomeMessage: ChatMessage = {
      id: generateId(),
      content: `Hi ${userInfo.name}! I'm here to help you with any questions about DFFRNT's services. How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([welcomeMessage]);
  }, []);

  // Send message
  const sendMessage = useCallback((content: string) => {
    if (!currentSession) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
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
  }, [currentSession]);

  // Generate bot response (simple keyword matching)
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

  // Connect to human agent
  const connectToAgent = useCallback(() => {
    if (!currentSession) return;

    const agentMessage: ChatMessage = {
      id: generateId(),
      content: "I'm connecting you with one of our specialists. Please hold on for a moment...",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, agentMessage]);

    // Simulate agent connection
    setTimeout(() => {
      const agentWelcome: ChatMessage = {
        id: generateId(),
        content: `Hi ${currentSession.userName}! I'm Sarah from the DFFRNT team. I see you're interested in our services. How can I help you today?`,
        sender: 'agent',
        timestamp: new Date(),
        type: 'text',
        agentName: 'Sarah Mitchell',
        agentAvatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150'
      };

      setMessages(prev => [...prev, agentWelcome]);
    }, 2000);
  }, [currentSession]);

  // End session
  const endSession = useCallback(() => {
    if (currentSession) {
      setCurrentSession(prev => prev ? { ...prev, status: 'closed', endTime: new Date() } : null);
    }
    setIsConnected(false);
    setMessages([]);
    setUnreadCount(0);
  }, [currentSession]);

  // Mark messages as read
  const markAsRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  return {
    isConnected,
    currentSession,
    messages,
    isTyping,
    unreadCount,
    initializeSession,
    sendMessage,
    connectToAgent,
    endSession,
    markAsRead
  };
};