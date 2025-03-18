import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Container } from '../Layout/Container';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';
import { typing } from '../../animations/keyframes';

const animations = {
  typing: css`
    animation: ${typing} 1s infinite ease-in-out;
  `,
};

// Индикатор загрузки с анимацией
const LoadingIndicator = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '16px 0',
  height: '20px'
});

const LoadingDot = styled('div')(
  {
    width: '8px',
    height: '8px',
    margin: '0 4px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    opacity: 0.6,
  },
  css`animation: ${typing} 1s infinite ease-in-out;`
);

export const Chat: React.FC = () => {
  const { messages, sendMessage, loading, isFirstMessage } = useChat();
  const [showLoading, setShowLoading] = useState(false);

  // Управление индикатором загрузки
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setShowLoading(true);
    } else {
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <Container>
      <MessagesList messages={messages} />
      
      {showLoading && (
        <LoadingIndicator>
          <LoadingDot style={{ animationDelay: '0s' }} />
          <LoadingDot style={{ animationDelay: '0.2s' }} />
          <LoadingDot style={{ animationDelay: '0.4s' }} />
        </LoadingIndicator>
      )}
      
      <ChatInput 
        onSendMessage={sendMessage} 
        loading={loading} 
        isFirstMessage={isFirstMessage} 
      />
    </Container>
  );
};