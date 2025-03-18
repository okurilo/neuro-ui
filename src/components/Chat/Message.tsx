import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Text } from '../../design-system/Text';
import { Message as MessageType } from '../../types/chat';
import { messageAppear } from '../../animations/chatAnimations';

interface MessageProps {
  message: MessageType;
  isLast?: boolean;
}

const animation = css`animation: ${messageAppear} 0.3s ease-out forwards`;

const MessageContainer = styled('div')<{ $isUser: boolean }>(
  ({ $isUser }) => ({
    display: 'flex',
    justifyContent: $isUser ? 'flex-end' : 'flex-start',
    marginBottom: '16px',
    opacity: 0,
  }), animation
);

const MessageBubble = styled('div')<{ $isUser: boolean }>(
  ({ $isUser }) => ({
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '24px',
    backgroundColor: $isUser ? '#fff' : '#f0f0f0',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease'
  })
);

const MessageTextWrapper = styled('div')({
  lineHeight: '1.5',
  color: '#333',
  opacity: 0,
  // animation: `${messageAppear} 0.3s ease-out 0.1s forwards`
});

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

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <MessageContainer $isUser={isUser}>
      <MessageBubble $isUser={isUser}>
        {isVisible && (
          <MessageTextWrapper>
            <Text variant="bodyRegular">
              {message.text}
            </Text>
          </MessageTextWrapper>
        )}
      </MessageBubble>
      {isUser && <UserAvatar />}
    </MessageContainer>
  );
};
