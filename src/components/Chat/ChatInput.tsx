import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { pulseEffect, buttonHover } from '../../animations/keyframes';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  loading: boolean;
  isFirstMessage: boolean;
}

const animations = {
  pulseEffect: css`
    animation: ${pulseEffect} 2s infinite alternate;
  `,
  buttonHover: css`
    animation: ${buttonHover} 0.6s ease infinite;
  `,
};

// Контейнер для инпута с улучшенными анимациями
const InputWrapper = styled('div')({
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px 0',
  marginTop: 'auto'
});

const InputContainer = styled('div')<{ $isFirstMessage: boolean }>(
  ({ $isFirstMessage }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: $isFirstMessage ? '70%' : '100%',
    padding: '8px 16px',
    backgroundColor: '#fff',
    borderRadius: '28px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:focus-within': {
      boxShadow: '0 3px 10px rgba(106, 113, 235, 0.3)'
    },
    '@media (max-width: 768px)': {
      maxWidth: $isFirstMessage ? '90%' : '100%'
    }
  }),
  ({ $isFirstMessage }) => $isFirstMessage && animations.pulseEffect
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

// Стилизованная кнопка отправки с улучшенной анимацией
const SendButton = styled('button')<{ $hasText: boolean }>(
  ({ $hasText }) => ({
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'none',
    cursor: $hasText ? 'pointer' : 'default',
    transition: 'transform 0.2s ease, opacity 0.3s ease',
    padding: 0,
    marginLeft: '4px',
    opacity: $hasText ? 1 : 0.5,
    transform: 'scale(1)',
    '&:hover': {
      transform: $hasText ? 'scale(1.05)' : 'scale(1)'
    },
    '&:active': {
      transform: $hasText ? 'scale(0.95)' : 'scale(1)'
    }
  }),
  ({ $hasText }) => $hasText && animations.buttonHover
);

// SVG иконка для кнопки отправки
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#6F7AFF" />
    <path d="M16 12L10 16.5V7.5L16 12Z" fill="white" />
  </svg>
);

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  loading,
  isFirstMessage
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Фокус на поле ввода при первом рендере
  useEffect(() => {
    if (inputRef.current && isFirstMessage) {
      inputRef.current.focus();
    }
  }, [isFirstMessage]);

  // Обработка отправки сообщения
  const handleSend = () => {
    if (message.trim() && !loading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  // Обработка нажатия Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputWrapper>
      <InputContainer $isFirstMessage={isFirstMessage}>
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isFirstMessage ? "Задайте вопрос..." : "Введите сообщение..."}
          disabled={loading}
          autoFocus={isFirstMessage}
        />
        <SendButton 
          onClick={handleSend} 
          disabled={loading || !message.trim()}
          title="Отправить сообщение"
          $hasText={!!message.trim()}
        >
          <SendIcon />
        </SendButton>
      </InputContainer>
    </InputWrapper>
  );
};