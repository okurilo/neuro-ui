// src/components/Chat/Message.tsx
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Message as MessageType } from '../../types/chat';
import { messageAppear } from '../../animations/chatAnimations';
import { ContentRenderer } from './ContentRenderer';
import { Avatar } from '@pulse/ui/components/Avatar';
import { useUser, useUserPBasicPhoto } from '@sber-hrp-core/api-user/hooks';
import { getAvatar } from './getAvatar';
import pulseNeuroui from "../../assets/pulse-neuroui-avatar.svg";

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

const MessageBubble = styled('div')<{ $isUser: boolean; $contentType: string }>(
  ({ $isUser, $contentType }) => ({
    maxWidth: $contentType !== 'text' ? '85%' : '70%',
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

const AvatarWrapper = styled('div')({
  display: 'flex',
  alignItems: 'end',
  flexShrink: 0,

  marginLeft: '12px',
  marginRight: '12px',
});

export const Message: React.FC<MessageProps> = ({ message, isLast }) => {
  const isUser = message.sender === 'user';
  const [isVisible, setIsVisible] = useState(false);
  const contentType = message.type || 'text';

  // Получаем только данные для аватара
  const { user } = useUser();
  const basicPhoto = useUserPBasicPhoto();

  // Получаем URL аватара пользователя с помощью функции getAvatar
  const avatarSrc = getAvatar(basicPhoto, user?.personUuid);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <MessageContainer $isUser={isUser}>
      {!isUser && (
        <AvatarWrapper>
          <Avatar
            $size="m"
            $initials="PN"
            $src={pulseNeuroui}
          />
        </AvatarWrapper>
      )}
      <MessageBubble $isUser={isUser} $contentType={contentType}>
        {isVisible && (
          <MessageTextWrapper>
            <ContentRenderer message={message} />
          </MessageTextWrapper>
        )}
      </MessageBubble>
      {isUser && (
        <AvatarWrapper>
          <Avatar
            $size="m"
            $src={avatarSrc}
            $initials="U"
          />
        </AvatarWrapper>
      )}
    </MessageContainer>
  );
};