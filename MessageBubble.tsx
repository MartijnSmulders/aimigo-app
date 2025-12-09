import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Format the time
  const timeString = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-none'
            : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
        } ${message.isError ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
      >
        {message.content}
        <div className={`text-[10px] mt-1 text-right opacity-70 ${isUser ? 'text-blue-100' : 'text-slate-400'}`}>
          {timeString}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;