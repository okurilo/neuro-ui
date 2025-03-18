import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Text } from '../../../src/design-system/Text';
import { Message as MessageType } from '../../types/chat';
import { fadeInMessage, fadeInText, buttonHover } from '../../animations/keyframes';

interface MessageProps {
  message: MessageType;
  isLast?: boolean;
}

// Анимация печатающегося текста для сообщений ассистента
const typingAnimation = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const animations = {
  fadeInMessage: css`
    animation: ${fadeInMessage} 0.4s forwards;
    animation-delay: 0.1s;
  `,
  fadeInText: css`
    animation: ${fadeInText} 0.5s ease-out forwards;
    animation-delay: 0.2s;
  `,
  buttonHover: css`
    animation: ${buttonHover} 0.6s ease-in-out infinite;
  `,
  typeText: css`
    animation: ${typingAnimation} 1.5s steps(40, end) forwards;
  `,
};

const MessageContainer = styled('div')<{ $isUser: boolean }>(
  ({ $isUser }) => ({
    display: 'flex',
    justifyContent: $isUser ? 'flex-end' : 'flex-start',
    marginBottom: '16px',
    width: '100%',
    padding: '0 16px',
    opacity: 0,
    perspective: '1000px',
  }),
  animations.fadeInMessage
);

const MessageBubble = styled('div')<{ $isUser: boolean }>(
  ({ $isUser }) => ({
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '24px',
    backgroundColor: $isUser ? '#fff' : '#f0f0f0',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease, transform 0.2s ease',
    position: 'relative',
    minWidth: '50px',
    transform: 'rotateX(0deg)',
    transformOrigin: $isUser ? 'right center' : 'left center',
    '&:hover': {
      transform: 'rotateX(2deg) translateY(-2px)',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
    }
  })
);

const MessageTextWrapper = styled('div')<{ $isTyping: boolean }>(
  ({ $isTyping }) => ({
    lineHeight: '1.5',
    color: '#333',
    position: 'relative',
    overflow: $isTyping ? 'hidden' : 'visible',
    display: 'inline-block',
    width: $isTyping ? '100%' : 'auto',
    opacity: $isTyping ? 0 : 1,
  }),
  ({ $isTyping }) => $isTyping && animations.typeText,
  ({ $isTyping }) => !$isTyping && animations.fadeInText
);

const UserAvatar = styled('div')({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  marginLeft: '8px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url("https://i.pravatar.cc/100")',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)'
  }
});

// Компонент для вариантов справок
const OptionsContainer = styled('div')(
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    marginTop: '12px',
    opacity: 0,
  },
  animations.fadeInText
);

const OptionButton = styled('button')({
  padding: '16px',
  borderRadius: '16px',
  border: 'none',
  backgroundColor: '#fff',
  textAlign: 'left',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: '14px',
  color: '#333',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: '#f9f9f9',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.3) 30%, transparent 40%)',
    transform: 'translateX(-100%)',
    transition: 'transform 1s ease'
  },
  '&:hover::after': {
    transform: 'translateX(100%)'
  }
});

const OtherOptionButton = styled('button')({
  padding: '10px 0',
  marginTop: '5px',
  background: 'none',
  border: 'none',
  color: '#4285f4',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '14px',
  textAlign: 'left',
  transition: 'all 0.2s ease',
  position: 'relative',
  '&:hover': {
    color: '#3367d6',
    textDecoration: 'underline'
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '5px',
    left: 0,
    width: 0,
    height: '1px',
    background: '#4285f4',
    transition: 'width 0.3s ease'
  },
  '&:hover::before': {
    width: '100%'
  }
});

// Проверяем, нужно ли показать варианты справок
const shouldShowOptions = (text: string): boolean => {
  const normalizedText = text.toLowerCase();
  return normalizedText.includes('справк') && normalizedText.includes('заказ') && !normalizedText.includes('указанием даты');
};

export const Message: React.FC<MessageProps> = ({ message, isLast = false }) => {
  const isUser = message.sender === 'user';
  const showOptions = !isUser && shouldShowOptions(message.text);
  
  const [isTyping, setIsTyping] = useState(!isUser);
  
  // Завершаем анимацию печатания через какое-то время
  useEffect(() => {
    if (!isUser) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1500); // длительность анимации печатания
      return () => clearTimeout(timer);
    }
  }, [isUser]);

  return (
    <MessageContainer $isUser={isUser}>
      <MessageBubble $isUser={isUser}>
        <MessageTextWrapper $isTyping={isTyping}>
          <Text variant="bodyRegular">
            {message.text}
          </Text>
        </MessageTextWrapper>
        
        {showOptions && !isTyping && (
          <OptionsContainer>
            <OptionButton>
              С указанием даты приема и должности на русском
            </OptionButton>
            <OptionButton>
              С указанием даты приема, должности и оклада на русском
            </OptionButton>
            <OptionButton>
              С указанием даты приема, должности и среднемесячным заработком на русском
            </OptionButton>
            <OtherOptionButton>
              другая справка
            </OtherOptionButton>
          </OptionsContainer>
        )}
      </MessageBubble>
      {isUser && <UserAvatar />}
    </MessageContainer>
  );
};