import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../../../src/design-system/Button';
import { pulseEffect, popIn } from '../../animations/keyframes';

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
    padding: '12px 16px',
    marginBottom: $isFirstMessage ? 0 : '16px',
    backgroundColor: '#fff',
    borderRadius: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:focus-within': {
      boxShadow: '0 4px 16px rgba(0, 123, 255, 0.2)'
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
  padding: '8px 12px',
  background: 'transparent',
  transition: 'transform 0.3s ease',
  borderRadius: '24px',
  '&:focus': {
    transform: 'scale(1.01)'
  }
});

// Стилизованная кнопка отправки
const SendButtonWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '8px',
  transition: 'transform 0.2s ease',
  transform: 'scale(1)',
  '&:active': {
    transform: 'scale(0.95)'
  }
});

// Анимированная кнопка
const AnimatedButton = styled(Button)<{ $hasText: boolean }>(
  ({ $hasText }) => ({
    transform: 'scale(1)',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
    borderRadius: '50%',
    '&:hover': {
      transform: 'scale(1.05)'
    },
    '&:active': {
      transform: 'scale(0.95)'
    }
  }),
  ({ $hasText }) => $hasText && css`animation: ${popIn} 0.3s forwards;`
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
        placeholder={isFirstMessage ? "Задайте вопрос AI-ассистенту..." : "Введите сообщение..."}
        disabled={loading}
        autoFocus={isFirstMessage}
      />
      <SendButtonWrapper>
        <AnimatedButton
          $type="primary"
          $size="m"
          $hasText={!!message.trim()}
          onClick={handleSend}
          disabled={loading || !message.trim()}
          $containsOnlyIcon={true}
        >
          Отправить
        </AnimatedButton>
      </SendButtonWrapper>
    </InputContainer>
  );
};