import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { pulseEffect, buttonHover } from '../../animations/keyframes';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onContinueChat?: () => void;
  loading: boolean;
  isFirstMessage: boolean;
  showContinueButton?: boolean;
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
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
    // marginTop: 'auto',
    transition: 'all 0.3s ease',
  })
);

const InputContainer = styled('div')<{ $isFirstMessage: boolean }>(
  ({ $isFirstMessage }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: $isFirstMessage ? '600px' : '800px',
    padding: '6px 12px',
    backgroundColor: '#fff',
    borderRadius: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.3s ease',
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

const ButtonsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});

const IconButton = styled('button')<{ $color?: string; $hasText?: boolean }>(
  ({ $color = '#4a7dff', $hasText = true }) => ({
    width: '42px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: $hasText ? $color : '#e0e0e0',
    borderRadius: '50%',
    cursor: $hasText ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    padding: 0,
    opacity: $hasText ? 1 : 0.6,
    transform: 'scale(1)',
    '&:hover': {
      transform: $hasText ? 'scale(1.05)' : 'scale(1)',
      background: $hasText ? $color : '#e0e0e0',
      filter: $hasText ? 'brightness(1.1)' : 'none',
    },
    '&:active': {
      transform: $hasText ? 'scale(0.95)' : 'scale(1)'
    }
  }),
  ({ $hasText }) => $hasText && animations.buttonHover
);

// Кнопка продолжения диалога (слева от ввода)
const ContinueButton = styled('button')({
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
});

// SVG иконка для кнопки отправки
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12.5L3 21L21 12L3 3L5 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// SVG иконка для кнопки продолжения диалога (белая)
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
  loading,
  isFirstMessage,
  showContinueButton = false
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
        {/* Кнопка продолжения диалога теперь слева */}
        {showContinueButton && onContinueChat && (
          <ContinueButton
            onClick={onContinueChat}
            title="Продолжить предыдущий диалог"
          >
            <HistoryIcon />
          </ContinueButton>
        )}

        <Input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isFirstMessage ? "Задайте вопрос..." : "Введите сообщение..."}
          disabled={loading}
          autoFocus
        />

        {/* Кнопка отправки справа */}
        <IconButton
          onClick={handleSend}
          disabled={loading || !message.trim()}
          title="Отправить сообщение"
          $hasText={!!message.trim()}
        >
          <SendIcon />
        </IconButton>
      </InputContainer>
    </InputWrapper>
  );
};