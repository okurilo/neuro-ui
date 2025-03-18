import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Text } from '../../design-system/Text';
import { Message as MessageType } from '../../types/chat';
import { messageAppear } from '../../animations/chatAnimations';

interface MessageProps {
  message: MessageType;
  isLast?: boolean;
}

const animations = {
  messageAppear: css`
    animation: ${messageAppear} 0.3s ease-out forwards;
  `,
};

const MessageContainer = styled('div')<{ $isUser: boolean }>(
  ({ $isUser }) => ({
    display: 'flex',
    justifyContent: $isUser ? 'flex-end' : 'flex-start',
    marginBottom: '16px',
    opacity: 0,
    position: 'relative',
    marginRight: $isUser ? '8px' : '0',
  }),
  animations.messageAppear
);

const MessageBubble = styled('div')<{ $isUser: boolean }>(
  ({ $isUser }) => ({
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: $isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    backgroundColor: $isUser ? '#e9f2ff' : '#f0f0f0',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    position: 'relative',
  })
);

const MessageTextWrapper = styled('div')({
  lineHeight: '1.5',
  color: '#333',
  opacity: 0,
  wordBreak: 'break-word',
}, css`animation: ${messageAppear} 0.3s ease-out 0.1s forwards`);

const UserAvatar = styled('div')({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  marginLeft: '12px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url("https://i.pravatar.cc/150")',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  flexShrink: 0,
  '&:hover': {
    transform: 'scale(1.05)'
  }
});

const AssistantAvatar = styled('div')({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: '#f0f0f0',
  marginRight: '12px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url("https://i.pravatar.cc/150?img=8")',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  flexShrink: 0,
});

export const Message: React.FC<MessageProps> = ({ message, isLast }) => {
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
      {!isUser && <AssistantAvatar />}
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