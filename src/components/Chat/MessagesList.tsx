import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Message } from './Message';
import { Message as MessageType } from '../../types/chat';

const MessagesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 0 100px 0', // Added bottom padding to prevent content from being hidden behind input
  overflow: 'auto',
  maxHeight: 'calc(100vh - 200px)',
  scrollbarWidth: 'thin',
  scrollbarColor: '#888 #f1f1f1',
  scrollBehavior: 'smooth',
  position: 'relative',
  
  '&::-webkit-scrollbar': {
    width: '8px'
  },
  
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px'
  },
  
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '10px',
    transition: 'background 0.3s ease'
  },
  
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555'
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
          key={index} 
          message={message} 
          isLast={index === messages.length - 1}
        />
      ))}
    </MessagesContainer>
  );
};
