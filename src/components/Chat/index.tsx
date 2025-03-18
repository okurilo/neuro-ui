import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Container } from '../Layout/Container';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';
import { typing, fadeIn } from '../../animations/chatAnimations';

const animations = {
  typing: css`
    animation: ${typing} 1s infinite ease-in-out;
  `,
  fadeIn: css`
    animation: ${fadeIn} 0.5s ease-out forwards;
  `,
};

// Основной контейнер для содержимого
const ContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 16px',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    padding: '0 8px'
  }
});

// Контейнер для вступительного текста
const InitialAssistantMessage = styled('div')({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 1,
  transition: 'all 0.5s ease-out',
  
  '&.hidden': {
    opacity: 0,
    transform: 'translate(-50%, 100%)'
  }
});

const AssistantText = styled('p')({
  fontSize: '18px',
  color: '#666',
  textAlign: 'center'
});

// Индикатор загрузки с анимацией
const LoadingIndicator = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px 0',
  height: '20px',
  marginBottom: '16px',
  position: 'fixed',
  bottom: '80px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 5
});

const LoadingDot = styled('div')(
  {
    width: '8px',
    height: '8px',
    margin: '0 4px',
    borderRadius: '50%',
    backgroundColor: '#666',
    opacity: 0.6,
  },
  animations.typing
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
      <ContentContainer>
        <InitialAssistantMessage className={!isFirstMessage ? 'hidden' : ''}>
          <AssistantText>Чем могу помочь?</AssistantText>
        </InitialAssistantMessage>
        
        {!isFirstMessage && <MessagesList messages={messages} />}
        
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
      </ContentContainer>
    </Container>
  );
};
