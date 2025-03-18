import React from 'react';
import styled, { css } from 'styled-components';
import { Text } from '../../../src/design-system/Text';
import { Message as MessageType } from '../../types/chat';
import { fadeInMessage } from '../../animations/keyframes';

interface MessageProps {
  message: MessageType;
  isLast?: boolean;
}

const animations = {
  fadeInMessage: css`
    animation: ${fadeInMessage} 0.4s forwards;
    animation-delay: 0.1s;
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

const MessageBubble = styled('div')<{ $isUser: boolean }>(
  ({ $isUser }) => ({
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '24px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    position: 'relative',
    minWidth: '50px'
  })
);

const MessageText = styled(Text)({
  lineHeight: '1.5',
  wordBreak: 'break-word',
  color: '#333'
});

const UserAvatar = styled('div')({
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  marginLeft: '8px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url("https://i.pravatar.cc/100")'
});

export const Message: React.FC<MessageProps> = ({ message, isLast = false }) => {
  const isUser = message.sender === 'user';

  return (
    <MessageContainer $isUser={isUser}>
      <MessageBubble $isUser={isUser}>
        <MessageText variant="bodyRegular">
          {message.text}
        </MessageText>
      </MessageBubble>
      {isUser && <UserAvatar />}
    </MessageContainer>
  );
};