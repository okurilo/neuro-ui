import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Message } from './Message';
import { Message as MessageType } from '../../types/chat';
import { fadeIn } from '../../animations/keyframes';

interface MessagesListProps {
  messages: MessageType[];
}

const animations = {
  fadeIn: css`
    animation: ${fadeIn} 0.5s forwards;
  `,
};

const MessagesContainer = styled('div')(
  {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: 'auto',
    padding: '16px 0',
    opacity: 0,

    // Стилизация скроллбара
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '3px'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '3px',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }
    }
  },
  animations.fadeIn
);

const animations2 = {
  fadeInSlow: css`
    animation: ${fadeIn} 0.8s forwards;
  `,
};

const EmptyStateContainer = styled('div')(
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
    opacity: 0,
    padding: '32px 16px'
  },
  animations2.fadeInSlow
);

export const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоскролл к последнему сообщению
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <EmptyStateContainer>
        <h3>Начните общение с AI-ассистентом</h3>
        <p>Задайте вопрос в поле ниже</p>
      </EmptyStateContainer>
    );
  }

  return (
    <MessagesContainer>
      {messages.map((message, index) => (
        <Message 
          key={message.id} 
          message={message} 
          isLast={index === messages.length - 1} 
        />
      ))}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
};