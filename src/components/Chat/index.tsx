import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Container } from '../../components/Layout/Container';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';
import { typing, fadeIn } from '../../animations/chatAnimations';
import { Card } from '../../design-system';

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
  maxWidth: '900px',
  margin: '0 auto',
  padding: '0 16px',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  height: '100vh',
  '@media (max-width: 768px)': {
    padding: '0 8px'
  }
});

// Контейнер для вступительного текста
const InitialAssistantMessage = styled('div')({
  position: 'fixed',
  top: '30%',
  left: '50%',
  transform: 'translateX(-50%)',
  opacity: 1,
  transition: 'all 0.5s ease-out',
  maxWidth: '70%',
  textAlign: 'center',
  width: '100%',

  '&.hidden': {
    opacity: 0,
    transform: 'translateX(-50%) translateY(30px)'
  }
});

const AssistantText = styled('p')({
  fontSize: '24px',
  fontWeight: 500,
  color: '#333',
  textAlign: 'center',
  margin: '0 0 16px 0'
});

const AssistantSubtext = styled('p')({
  fontSize: '16px',
  color: '#666',
  textAlign: 'center',
  marginBottom: '16px'
});

// Новый индикатор печати с более элегантной анимацией
const LoadingIndicator = styled('div')({
  display: 'inline-flex',
  alignItems: 'center',
  position: 'fixed',
  left: '50%',
  bottom: '82px',
  transform: 'translateX(-50%)',
  zIndex: 5,
});

// Эффект печатающегося сообщения
const TypingIndicator = styled('div')({
  display: 'inline-block',
  padding: '8px 12px',
  background: '#f0f0f0',
  borderRadius: '16px',
  maxWidth: '100px',
  minWidth: '40px',
  position: 'relative',
});

// Три точки внутри индикатора печати
const TypingDots = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '4px',
});

const TypingDot = styled('span')(
  {
    width: '6px',
    height: '6px',
    backgroundColor: '#666',
    borderRadius: '50%',
    display: 'inline-block',
  },
  css`
    animation: ${typing} 1.4s infinite;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  `
);

// Компонент подсказки для первого сообщения
const SuggestionsContainer = styled('div')({
  marginTop: '8px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  bottom: '130px',
  width: '90%',
  maxWidth: '600px',
  zIndex: 90
});

const SuggestionButton = styled('button')({
  padding: '10px 16px',
  borderRadius: '20px',
  border: '1px solid #e0e0e0',
  background: 'rgba(255, 255, 255, 0.9)',
  color: '#4a7dff',
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  backdropFilter: 'blur(4px)',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '#f8f9ff',
    borderColor: '#4a7dff',
    boxShadow: '0 2px 6px rgba(74, 125, 255, 0.2)',
  }
});

export const Chat: React.FC = () => {
  const { messages, sendMessage, loading, isFirstMessage } = useChat();
  const [showLoading, setShowLoading] = useState(false);

  // Варианты предложений для быстрого начала общения
  const suggestions = [
    'Что ты умеешь делать?',
    'Как получить справку с места работы?',
    'Какая сегодня погода?',
    'Какие справки можно заказать?',
    'Сколько человек в моей команде?',
    'Сколько дней отпуска мне доступно?'
  ];

  // Управление индикатором загрузки
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setShowLoading(true);
    } else {
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 500); // Увеличиваем время задержки для более плавного исчезновения
    }
    return () => clearTimeout(timer);
  }, [loading]);

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <Container>
      <ContentContainer>
        <InitialAssistantMessage className={!isFirstMessage ? 'hidden' : ''}>
          <AssistantText>Чем могу помочь?</AssistantText>
          <AssistantSubtext>Готов ответить на любой ваш вопрос</AssistantSubtext>
        </InitialAssistantMessage>

        {!isFirstMessage && <MessagesList messages={messages} />}

        {isFirstMessage && (
          <SuggestionsContainer>
            {suggestions.map((suggestion, index) => (
              <SuggestionButton
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </SuggestionButton>
            ))}
          </SuggestionsContainer>
        )}

        {showLoading && (
          <LoadingIndicator>
            <TypingIndicator>
              <TypingDots>
                <TypingDot />
                <TypingDot />
                <TypingDot />
              </TypingDots>
            </TypingIndicator>
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