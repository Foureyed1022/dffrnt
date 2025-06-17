export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent' | 'bot';
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  agentName?: string;
  agentAvatar?: string;
  isTyping?: boolean;
}

export interface ChatSession {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'active' | 'waiting' | 'closed';
  messages: ChatMessage[];
  startTime: Date;
  endTime?: Date;
  assignedAgent?: string;
  priority: 'low' | 'medium' | 'high';
  category: 'general' | 'technical' | 'billing' | 'sales';
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  userEmail: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  attachments?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  helpful: number;
  notHelpful: number;
}

export interface ChatAgent {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  specialties: string[];
  rating: number;
  activeChats: number;
  maxChats: number;
}