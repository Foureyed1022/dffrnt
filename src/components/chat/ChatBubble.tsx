import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '../../types/chat';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isBot = message.sender === 'bot';
  const isAgent = message.sender === 'agent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'ml-2' : 'mr-2'}`}>
          {isUser ? (
            <div className="bg-primary text-white w-full h-full rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
          ) : isBot ? (
            <div className="bg-gray-600 text-white w-full h-full rounded-full flex items-center justify-center">
              <Bot size={16} />
            </div>
          ) : (
            <img
              src={message.agentAvatar || 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150'}
              alt={message.agentName || 'Agent'}
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          {/* Agent Name */}
          {isAgent && message.agentName && (
            <span className="text-xs text-gray-500 mb-1">{message.agentName}</span>
          )}
          
          {/* Message Bubble */}
          <div
            className={`px-4 py-2 rounded-2xl max-w-xs break-words ${
              isUser
                ? 'bg-primary text-white rounded-br-sm'
                : isBot
                ? 'bg-gray-100 text-gray-800 rounded-bl-sm'
                : 'bg-blue-100 text-blue-900 rounded-bl-sm'
            }`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>

          {/* Timestamp */}
          <span className="text-xs text-gray-400 mt-1">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
};