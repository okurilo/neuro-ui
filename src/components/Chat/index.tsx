import React, { useEffect, useState } from 'react';
import { MessagesList } from './MessagesList';
import { ChatInput } from './ChatInput';
import { useChat } from '../../hooks/useChat';
import {
  ChatOverlay,
  ChatContainer,
  ContentContainer,
  LoadingIndicator,
  TypingIndicator,
  TypingDots,
  TypingDot,
  CloseButton
} from './styled';

// Иконка закрытия
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4L12 12" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Chat: React.FC = () => {
  const {
    messages,
    sendMessage,
    loading,
    isFirstMessage,
    hasPreviousSession,
    resetChat,
    continueChat
  } = useChat();
  const [showLoading, setShowLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Управление индикатором загрузки
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading) {
      setShowLoading(true);
    } else {
      timer = setTimeout(() => {
        setShowLoading(false);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  // Расширяем чат при отправке первого сообщения
  useEffect(() => {
    setIsExpanded(!isFirstMessage);
  }, [isFirstMessage]);

  const handleStartChat = () => {
    setIsExpanded(true);
  };

  const handleContinueChat = () => {
    setIsExpanded(true);
    continueChat();
  };

  const handleCloseChat = () => {
    setIsExpanded(false);
    resetChat();
  };

  return (
    <>
      <ChatOverlay $isExpanded={isExpanded} />

      <ChatContainer $isExpanded={isExpanded}>
        {isExpanded && (
          <CloseButton onClick={handleCloseChat} title="Закрыть чат">
            <CloseIcon />
          </CloseButton>
        )}

        <ContentContainer>
          {isExpanded && !isFirstMessage && <MessagesList messages={messages} />}

          {showLoading && isExpanded && (
            <LoadingIndicator>
              <TypingIndicator>
                <TypingDots>
                  <TypingDot />
                  <TypingDot />
                  <TypingDot />
                </TypingDots>
              </TypingIndicator>
            </LoadingIndicator>
          )}

          <ChatInput
            onSendMessage={sendMessage}
            onContinueChat={handleContinueChat}
            onStartChat={handleStartChat}
            loading={loading}
            isFirstMessage={isFirstMessage}
            hasPreviousSession={hasPreviousSession}
            isExpanded={isExpanded}
          />
        </ContentContainer>
      </ChatContainer>
    </>
  );
};