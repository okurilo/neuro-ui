import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Message } from './Message';
import { Message as MessageType } from '../../types/chat';

const MessagesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '20px 10px',
  overflow: 'auto',
  scrollBehavior: 'smooth',

  // Улучшенный стиль скроллбара
  '&::-webkit-scrollbar': {
    width: '4px'
  },

  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },

  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    transition: 'background 0.3s ease'
  },

  '&:hover::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 0, 0, 0.2)'
  }
});

// Стилизованный компонент для отображения даты
const DateSeparator = styled('div')({
  alignSelf: 'center',
  margin: '16px 0',
  padding: '6px 16px',
  background: 'rgba(240, 240, 240, 0.8)',
  backdropFilter: 'blur(4px)',
  borderRadius: '16px',
  fontSize: '13px',
  fontWeight: 500,
  color: '#666',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
});

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3.5" width="12" height="10" rx="1.5" stroke="#666" />
    <path d="M2 6h12" stroke="#666" />
    <path d="M5.5 1.5v3M10.5 1.5v3" stroke="#666" strokeLinecap="round" />
    <path d="M4.5 8.5h1M7.5 8.5h1M10.5 8.5h1M4.5 11h1M7.5 11h1M10.5 11h1" stroke="#666" strokeLinecap="round" />
  </svg>
);

interface MessagesListProps {
  messages: MessageType[];
}

// Функция для форматирования даты
function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Функция для проверки, нужно ли отображать разделитель даты
function shouldShowDateSeparator(currentMsg: MessageType, prevMsg?: MessageType): boolean {
  if (!prevMsg) return true;

  const currentDate = new Date(currentMsg.timestamp);
  const prevDate = new Date(prevMsg.timestamp);

  return currentDate.toDateString() !== prevDate.toDateString();
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
        <React.Fragment key={message.id || index}>
          {/* Отображаем разделитель даты, если нужно */}
          {shouldShowDateSeparator(message, messages[index - 1]) && (
            <DateSeparator>
              <CalendarIcon />
              {formatDate(message.timestamp)}
            </DateSeparator>
          )}

          <Message
            message={message}
            isLast={index === messages.length - 1}
          />
        </React.Fragment>
      ))}
    </MessagesContainer>
  );
};