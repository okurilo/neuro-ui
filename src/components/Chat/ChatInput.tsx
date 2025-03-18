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

const InputWrapper = styled('div')<{ $isFirstMessage: boolean }>(
  ({ $isFirstMessage }) => ({
    position: $isFirstMessage ? 'fixed' : 'fixed', // Всегда фиксированное позиционирование
    top: $isFirstMessage ? '50%' : 'auto',
    left: $isFirstMessage ? '50%' : '0',
    width: '100%',
    transform: $isFirstMessage ? 'translate(-50%, -50%)' : 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    marginTop: 'auto',
    transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
    zIndex: 100,
    bottom: $isFirstMessage ? 'auto' : 0,
    background: $isFirstMessage ? 'transparent' : 'linear-gradient(to top, rgb(223 223 223) 60%, rgba(255, 255, 255, 0))',
    // background: $isFirstMessage ? 'transparent' : 'linear-gradient(to top, rgba(255,255,255,1) 60%, rgba(255,255,255,0))',
  })
);

const InputContainer = styled('div')<{ $isFirstMessage: boolean }>(
  ({ $isFirstMessage }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: $isFirstMessage ? '70%' : '800px',
    padding: '10px 16px',
    backgroundColor: '#fff',
    borderRadius: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:focus-within': {
      boxShadow: '0 4px 12px rgba(106, 113, 235, 0.3)'
    },
    '@media (max-width: 768px)': {
      maxWidth: $isFirstMessage ? '90%' : '95%'
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

// Современная SVG иконка для кнопки отправки
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12.5L3 21L21 12L3 3L5 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  loading,
  isFirstMessage
}) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Автофокус на инпуте при первом рендере и после отправки
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFirstMessage, loading]);

  const handleSend = () => {
    if (message.trim() && !loading) {
      onSendMessage(message);
      setMessage('');
      // После отправки сообщения, снова фокусируемся на инпуте
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputWrapper $isFirstMessage={isFirstMessage}>
      <InputContainer $isFirstMessage={isFirstMessage}>
        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isFirstMessage ? "Задайте вопрос..." : "Введите сообщение..."}
          disabled={loading}
          autoFocus
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