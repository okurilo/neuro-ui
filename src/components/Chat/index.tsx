import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Container } from '../Layout/Container';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';
import { typing, fadeIn, moveInputToBottom } from '../../animations/chatAnimations';

const animations = {
  typing: css`
    animation: ${typing} 1s infinite ease-in-out;
  `,
  fadeIn: css`
    animation: ${fadeIn} 0.5s ease-out forwards;
  `,
  moveInputToBottom: css`
    animation: ${moveInputToBottom} 0.5s ease-out forwards;
  `
};

// Основной контейнер страницы
const ContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '900px',
  margin: '0 auto',
  padding: '16px',
  boxSizing: 'border-box',
  height: '100vh',
  '@media (max-width: 768px)': {
    padding: '8px'
  }
});

// Контейнер для чата с сообщениями
const ChatContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
  position: 'relative',
  overflow: 'hidden'
});

// Начальный экран - занимает всю высоту
const InitialScreen = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  position: 'relative',
});

// Верхний блок с заголовком
const HeaderContainer = styled('div')({
  width: '100%',
  textAlign: 'center',
  marginTop: '15vh', // Отступ сверху примерно 15% высоты экрана
  opacity: 1,
  transition: 'opacity 0.3s ease-out'
});

// Центральный блок с полем ввода
const InputContainer = styled('div')<{ $isAnimating: boolean }>(
  ({ $isAnimating }) => ({
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    position: $isAnimating ? 'absolute' : 'relative',
    top: $isAnimating ? '50%' : 'auto',
    left: $isAnimating ? '50%' : 'auto',
    transform: $isAnimating ? 'translate(-50%, -50%)' : 'none',
    zIndex: 10
  }),
  ({ $isAnimating }) => $isAnimating && animations.moveInputToBottom
);

// Нижний блок с подсказками
const SuggestionsContainer = styled('div')({
  width: '100%',
  marginBottom: '15vh', // Отступ снизу примерно 15% высоты экрана
  opacity: 1,
  transition: 'opacity 0.3s ease-out'
});

// Контейнер с подсказками
const SuggestionsWrapper = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '8px',
  maxWidth: '700px',
  margin: '0 auto',
});

// Стили для заголовка
const AssistantText = styled('h1')({
  fontSize: '28px',
  fontWeight: 600,
  color: '#333',
  margin: '0 0 16px 0',
});

// Стили для подзаголовка
const AssistantSubtext = styled('p')({
  fontSize: '16px',
  color: '#666',
  margin: '0',
});

// Индикатор загрузки
const LoadingIndicator = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '12px',
  position: 'relative',
  zIndex: 5
});

// Индикатор печати
const TypingIndicator = styled('div')({
  display: 'inline-flex',
  padding: '8px 16px',
  background: '#f0f0f0',
  borderRadius: '16px',
  maxWidth: '100px',
});

// Анимированные точки
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

// Кнопки-подсказки 
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

// Кнопка закрытия чата
const CloseButton = styled('button')({
  position: 'absolute',
  top: '0',
  right: '0',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  background: '#fff',
  border: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 1000,
  transition: 'all 0.2s ease',
  '&:hover': {
    background: '#f0f0f0',
    transform: 'scale(1.1)'
  }
});

// Иконка закрытия
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4L12 12" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Chat: React.FC = () => {
  const {
    messages,
    sendMessage,
    loading,
    isFirstMessage,
    resetChat,
    continueChat,
    sessionId
  } = useChat();

  const [showLoading, setShowLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showChatScreen, setShowChatScreen] = useState(false);

  // Обновленные варианты предложений
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
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  // Управление анимацией и переключением экранов
  useEffect(() => {
    if (!isFirstMessage && !showChatScreen) {
      setIsAnimating(true);

      // Небольшая задержка, чтобы анимация успела отработать
      const timer = setTimeout(() => {
        setShowChatScreen(true);
        setIsAnimating(false);
      }, 500); // Время должно совпадать с продолжительностью анимации

      return () => clearTimeout(timer);
    }
  }, [isFirstMessage, showChatScreen]);

  const handleSuggestionClick = (suggestion: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      sendMessage(suggestion);
    }, 300); // Немного задержки для лучшего визуального эффекта
  };

  const handleContinueChat = () => {
    setIsAnimating(true);
    setTimeout(() => {
      continueChat('demo-session-with-history');
    }, 300);
  };

  const handleCloseChat = () => {
    setShowChatScreen(false);
    resetChat();
  };

  return (
    <Container>
      <ContentContainer>
        {isFirstMessage && !isAnimating && !showChatScreen ? (
          // Начальный экран с заголовком посередине и подсказками внизу
          <InitialScreen>
            {/* Заголовок вверху */}
            <HeaderContainer>
              <AssistantText>Чем я могу помочь?</AssistantText>
              <AssistantSubtext>Готов ответить на любой ваш вопрос</AssistantSubtext>
            </HeaderContainer>

            {/* Поле ввода посередине */}
            <InputContainer $isAnimating={isAnimating}>
              <ChatInput
                onSendMessage={sendMessage}
                onContinueChat={handleContinueChat}
                loading={loading}
                isFirstMessage={true}
                showContinueButton={true}
              />
            </InputContainer>

            {/* Подсказки внизу */}
            <SuggestionsContainer>
              <SuggestionsWrapper>
                {suggestions.map((suggestion, index) => (
                  <SuggestionButton
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </SuggestionButton>
                ))}
              </SuggestionsWrapper>
            </SuggestionsContainer>
          </InitialScreen>
        ) : (
          // Экран чата с сообщениями или анимация перехода
          <>
            {!showChatScreen && isAnimating && (
              <InitialScreen>
                <HeaderContainer style={{ opacity: 0 }}>
                  <AssistantText>Чем я могу помочь?</AssistantText>
                </HeaderContainer>

                <InputContainer $isAnimating={isAnimating}>
                  <ChatInput
                    onSendMessage={sendMessage}
                    loading={loading}
                    isFirstMessage={true}
                    showContinueButton={false}
                  />
                </InputContainer>

                <SuggestionsContainer style={{ opacity: 0 }}>
                  <SuggestionsWrapper>
                    {suggestions.map((suggestion, index) => (
                      <SuggestionButton key={index}>{suggestion}</SuggestionButton>
                    ))}
                  </SuggestionsWrapper>
                </SuggestionsContainer>
              </InitialScreen>
            )}

            {showChatScreen && (
              <ChatContainer>
                <CloseButton onClick={handleCloseChat} title="Закрыть чат">
                  <CloseIcon />
                </CloseButton>

                <MessagesList messages={messages} />

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
                  isFirstMessage={false}
                />
              </ChatContainer>
            )}
          </>
        )}
      </ContentContainer>
    </Container>
  );
};