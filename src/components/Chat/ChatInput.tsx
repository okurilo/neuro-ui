import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { pulseEffect } from '../../animations/keyframes';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  loading: boolean;
  isFirstMessage: boolean;
}

const animations = {
  pulseEffect: css`
    animation: ${pulseEffect} 2s infinite alternate;
  `,
};

// Контейнер для инпута с анимациями
const InputContainer = styled('div')<{ $isFirstMessage: boolean }>(
  ({ $isFirstMessage }) => ({
    position: $isFirstMessage ? 'absolute' : 'relative',
    top: $isFirstMessage ? '50%' : 'auto',
    left: $isFirstMessage ? '50%' : 'auto',
    transform: $isFirstMessage ? 'translate(-50%, -50%)' : 'none',
    display: 'flex',
    width: $isFirstMessage ? '70%' : '100%',
    padding: '8px 16px',
    marginBottom: $isFirstMessage ? 0 : '16px',
    backgroundColor: '#fff',
    borderRadius: '28px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:focus-within': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
    },
    '@media (max-width: 768px)': {
      width: $isFirstMessage ? '90%' : '100%'
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
  color: '#333'
});

// Стилизованная кнопка отправки
const SendButton = styled('button')({
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  padding: 0,
  marginLeft: '4px',
  '&:active': {
    transform: 'scale(0.95)'
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
});

// SVG иконка для кнопки отправки (как на скриншоте)
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

  const handleSend = () => {
    if (message.trim() && !loading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputContainer $isFirstMessage={isFirstMessage}>
      <Input
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
      >
        <SendIcon />
      </SendButton>
    </InputContainer>
  );
};