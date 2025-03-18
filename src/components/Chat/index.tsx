import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Container } from '../Layout/Container';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';
import { typing, fadeIn } from '../../animations/keyframes';

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
const WelcomeContainer = styled('div')(
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '24px',
    opacity: 0
  },
  animations.fadeIn
);

const WelcomeTitle = styled('h3')({
  margin: '0 0 8px 0',
  fontSize: '20px',
  fontWeight: '500',
  color: '#333'
});

const WelcomeSubtitle = styled('p')({
  margin: 0,
  fontSize: '16px',
  color: '#666'
});

// Индикатор загрузки с анимацией
const LoadingIndicator = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px 0',
  height: '20px',
  marginBottom: '16px'
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
        {isFirstMessage ? (
          <WelcomeContainer>
            <WelcomeTitle>Начните общение с ассистентом</WelcomeTitle>
            <WelcomeSubtitle>Задайте вопрос в поле выше</WelcomeSubtitle>
          </WelcomeContainer>
        ) : (
          <MessagesList messages={messages} />
        )}
        
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