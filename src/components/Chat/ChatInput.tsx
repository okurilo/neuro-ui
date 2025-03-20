import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { pulseEffect, buttonHover } from '../../animations/keyframes';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onContinueChat?: () => void;
  onStartChat?: () => void;
  loading: boolean;
  isFirstMessage: boolean;
  hasPreviousSession: boolean;
  isExpanded: boolean;
}

const animations = {
  pulseEffect: css`
    animation: ${pulseEffect} 2s infinite alternate;
  `,
  buttonHover: css`
    animation: ${buttonHover} 0.6s ease infinite;
  `,
};

const InputWrapper = styled('div')<{ $isExpanded: boolean; $isFirstMessage: boolean }>(
  ({ $isExpanded, $isFirstMessage }) => ({
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: $isExpanded ? '16px' : '8px',
    paddingBottom: $isExpanded ? '16px' : '12px',
    marginTop: 'auto',
    transition: 'all 0.3s ease-in-out',
    zIndex: 1002,
    backgroundColor: $isExpanded ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
    boxShadow: $isExpanded ? 'none' : '0 -2px 10px rgba(0, 0, 0, 0.05)',
  })
);

const InputContainer = styled('div')<{ $isExpanded: boolean; $isFirstMessage: boolean }>(
  ({ $isExpanded, $isFirstMessage }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: $isExpanded ? '800px' : '60%',
    padding: '6px 12px',
    backgroundColor: '#fff',
    borderRadius: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:focus-within': {
      boxShadow: '0 4px 12px rgba(106, 113, 235, 0.3)'
    },
    '@media (max-width: 768px)': {
      maxWidth: $isExpanded ? '95%' : '85%'
    }
  }),
  ({ $isExpanded, $isFirstMessage }) => !$isExpanded && animations.pulseEffect
);

const Input = styled('input')({
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: '16px',
  padding: '10px 12px',
  background: 'transparent',
  borderRadius: '24px',
  color: '#333',
  transition: 'transform 0.2s ease',
  '&:focus': {
    transform: 'scale(1.01)'
  }
});

const SendButton = styled('button')<{ $hasText: boolean }>(
  ({ $hasText }) => ({
    width: '42px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: $hasText ? '#4a7dff' : '#e0e0e0',
    borderRadius: '50%',
    cursor: $hasText ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    padding: 0,
    marginLeft: '8px',
    opacity: $hasText ? 1 : 0.6,
    transform: 'scale(1)',
    '&:hover': {
      transform: $hasText ? 'scale(1.05)' : 'scale(1)',
      background: $hasText ? '#5a8aff' : '#e0e0e0',
    },
    '&:active': {
      transform: $hasText ? 'scale(0.95)' : 'scale(1)'
    }
  }),
  ({ $hasText }) => $hasText && animations.buttonHover
);

// Кнопка продолжения диалога (слева от ввода)
const ContinueButton = styled('button')(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '38px',
    height: '38px',
    background: 'transparent',
    border: '1px solid #e0e0e0',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginRight: '6px',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.05)',
      transform: 'scale(1.05)'
    },
    '&:active': {
      transform: 'scale(0.95)'
    }
  }
);

// SVG иконка для кнопки отправки
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12.5L3 21L21 12L3 3L5 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// SVG иконка для кнопки продолжения диалога
const HistoryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8v4l3 3" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.05 11a9 9 0 1 1 .5 4" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 16V8h8" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onContinueChat,
  onStartChat,
  loading,
  isFirstMessage,
  hasPreviousSession,
  isExpanded
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Автофокус на инпуте при первом рендере и после отправки
  useEffect(() => {
    if (inputRef.current && isExpanded) {
      inputRef.current.focus();
    }
  }, [isFirstMessage, loading, isExpanded]);

  const handleSend = () => {
    if (message.trim() && !loading) {
      // Если это первое взаимодействие, вызываем функцию раскрытия чата
      if (isFirstMessage && !isExpanded && onStartChat) {
        onStartChat();
      }

      onSendMessage(message);
      setMessage('');

      // После отправки сообщения, снова фокусируемся на инпуте
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else if (!isExpanded && onStartChat) {
      // Если поле пустое и чат не раскрыт, просто раскрываем чат
      onStartChat();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleContinueChat = () => {
    if (onContinueChat && hasPreviousSession && !loading) {
      onContinueChat();
    }
  };

  const handleInputFocus = () => {
    if (!isExpanded && onStartChat) {
      onStartChat();
    }
  };

  return (
    <InputWrapper $isExpanded={isExpanded} $isFirstMessage={isFirstMessage}>
      <InputContainer $isExpanded={isExpanded} $isFirstMessage={isFirstMessage}>
        {isFirstMessage && hasPreviousSession && (
          <ContinueButton
            title="Продолжить предыдущий диалог"
            onClick={handleContinueChat}
            disabled={loading}
          >
            <HistoryIcon />
          </ContinueButton>
        )}
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          placeholder={isFirstMessage ? "Задайте вопрос..." : "Введите сообщение..."}
          disabled={loading}
        />
        <SendButton
          onClick={handleSend}
          disabled={loading}
          title="Отправить сообщение"
          $hasText={!!message.trim()}
        >
          <SendIcon />
        </SendButton>
      </InputContainer>
    </InputWrapper>
  );
};