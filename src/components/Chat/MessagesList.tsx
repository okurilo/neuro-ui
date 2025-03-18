import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Message } from './Message';
import { Message as MessageType } from '../../types/chat';

const MessagesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 10px 120px 10px', // Увеличенный отступ снизу
  overflow: 'auto',
  maxHeight: 'calc(100vh - 180px)',
  scrollBehavior: 'smooth',
  position: 'relative',
  
  // Улучшенный стиль скроллбара
  '&::-webkit-scrollbar': {
    width: '6px'
  },
  
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    margin: '4px 0',
  },
  
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '6px',
    transition: 'background 0.3s ease'
  },
  
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(0, 0, 0, 0.3)'
  }
});

interface MessagesListProps {
  messages: MessageType[];
}

export const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <MessagesContainer ref={containerRef}>
      {messages.map((message, index) => (
        <Message 
          key={message.id || index} 
          message={message} 
          isLast={index === messages.length - 1}
        />
      ))}
    </MessagesContainer>
  );
};