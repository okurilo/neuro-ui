import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Container } from '../Layout/Container';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';
import { Title } from '../../../src/design-system/Title';
import { fadeIn, typing } from '../../animations/keyframes';

const animations = {
  fadeIn: css`
    animation: ${fadeIn} 1s forwards;
  `,
  fadeInDelayed: css`
    animation: ${fadeIn} 1s forwards 0.5s;
  `,
  typing: css`
    animation: ${typing} 1s infinite ease-in-out;
  `,
};

// Анимированный заголовок
const AnimatedTitle = styled(Title)(
  {
    textAlign: 'center',
    marginBottom: '24px',
    marginTop: '32px',
    opacity: 0,
    fontSize: '2.5rem'
  },
  animations.fadeIn
);

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

// Анимированный субтитр
const Subtitle = styled('p')(
  {
    textAlign: 'center',
    color: '#666',
    opacity: 0,
    marginTop: '0',
    fontSize: '1.1rem'
  },
  animations.fadeInDelayed
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
      {isFirstMessage ? (
        <>
          <AnimatedTitle $size="H1">
            AI-ассистент
          </AnimatedTitle>
          <Subtitle>
            Задайте вопрос и получите мгновенный ответ
          </Subtitle>
        </>
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
    </Container>
  );
};