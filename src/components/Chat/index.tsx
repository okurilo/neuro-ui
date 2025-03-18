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
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 1,
  transition: 'all 0.5s ease-out',
  maxWidth: '70%',
  textAlign: 'center',
  
  '&.hidden': {
    opacity: 0,
    transform: 'translate(-50%, 100%)'
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
  bottom: '90px',
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
    backgroundColor: '#4a7dff',
    opacity: 0.6,
  },
  animations.typing
);

// Компонент подсказки для первого сообщения
const SuggestionsContainer = styled(Card)({
  marginTop: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const SuggestionButton = styled('button')({
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  background: '#fff',
  color: '#333',
  fontSize: '14px',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
    borderColor: '#d0d0d0',
  }
});

export const Chat: React.FC = () => {
  const { messages, sendMessage, loading, isFirstMessage } = useChat();
  const [showLoading, setShowLoading] = useState(false);

  // Варианты предложений для быстрого начала общения
  const suggestions = [
    'Расскажи про справки для посольства',
    'Как заказать справку?',
    'Какие справки можно заказать?',
    'Сколько делается справка с датой приема?'
  ];

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

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <Container>
      <ContentContainer>
        <InitialAssistantMessage className={!isFirstMessage ? 'hidden' : ''}>
          <AssistantText>Чем могу помочь?</AssistantText>
          <AssistantSubtext>Спросите меня о заказе справок или других документов</AssistantSubtext>
          
          <SuggestionsContainer $shadow={false} $type="default">
            {suggestions.map((suggestion, index) => (
              <SuggestionButton 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </SuggestionButton>
            ))}
          </SuggestionsContainer>
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