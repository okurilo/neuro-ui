// src/components/Chat/MessagesList.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Message } from './Message';
import { Message as MessageType } from '../../types/chat';

const MessagesContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 10px 70px 10px', // Уменьшенный отступ снизу
  overflow: 'auto',
  maxHeight: 'calc(100vh - 120px)',
  scrollBehavior: 'smooth',
  position: 'relative',

  backdropFilter: "blur(5px)",
  maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",

  // Улучшенный стиль скроллбара - показывается только при наведении
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '24px 0 16px',
  position: 'relative'
});

const DatePill = styled('div')({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(4px)',
  border: '1px solid rgba(0, 0, 0, 0.05)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  borderRadius: '20px',
  padding: '6px 16px',
  fontSize: '13px',
  fontWeight: 500,
  color: '#555',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  zIndex: 1
});

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <DatePill>
                <CalendarIcon />
                {formatDate(message.timestamp)}
              </DatePill>
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