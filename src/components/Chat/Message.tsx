import React from 'react';
import styled, { css } from 'styled-components';
import { Card } from '../../../src/design-system/Card';
import { Text } from '../../../src/design-system/Text';
import { Message as MessageType } from '../../types/chat';
import { fadeInMessage, glowEffect } from '../../animations/keyframes';

interface MessageProps {
  message: MessageType;
  isLast?: boolean;
}

const animations = {
  fadeInMessage: css`
    animation: ${fadeInMessage} 0.4s forwards;
    animation-delay: 0.1s;
  `,
  glowEffect: css`
    animation: ${glowEffect} 1.5s infinite alternate;
  `,
};

const MessageContainer = styled('div')<{ $isUser: boolean }>(
  ({ $isUser }) => ({
    display: 'flex',
    justifyContent: $isUser ? 'flex-end' : 'flex-start',
    marginBottom: '16px',
    width: '100%',
    opacity: 0,
  }),
  animations.fadeInMessage
);

const MessageBubble = styled(Card)<{ $isUser: boolean; $isLast: boolean }>(
  ({ $isUser, $isLast }) => ({
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '18px',
    backgroundColor: $isUser ? '#007bff' : '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    transform: 'scale(1)',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-2px) scale(1.005)'
    }
  }),
  ({ $isLast, $isUser }) => $isLast && !$isUser && animations.glowEffect
);

const MessageText = styled(Text)({
  lineHeight: '1.5',
  wordBreak: 'break-word'
});

export const Message: React.FC<MessageProps> = ({ message, isLast = false }) => {
  const isUser = message.sender === 'user';

  return (
    <MessageContainer $isUser={isUser}>
      <MessageBubble 
        $isUser={isUser} 
        $isLast={isLast}
        $shadow={false} 
        $type={isUser ? 'contrast' : 'default'}
      >
        <MessageText 
          variant="bodyRegular" 
          style={{ color: isUser ? '#fff' : '#000' }}
        >
          {message.text}
        </MessageText>
      </MessageBubble>
    </MessageContainer>
  );
};