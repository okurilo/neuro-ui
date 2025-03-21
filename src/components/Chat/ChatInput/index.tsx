import React, { useState, useEffect, useRef } from 'react';
import { InputWrapper, InputContainer, Input, SendButton, ContinueButton, LoadingSpinner } from './styled';

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    onContinueChat?: () => void;
    onStartChat?: () => void;
    loading: boolean;
    isFirstMessage: boolean;
    hasPreviousSession: boolean;
    isExpanded: boolean;
}

// SVG иконка для кнопки отправки
const SendIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M5 12.5L3 21L21 12L3 3L5 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 12H13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// SVG иконка для кнопки продолжения диалога
const HistoryIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8c2.209 0 4.209.896 5.656 2.344" stroke="#666" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 4v4h-4" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 7v5l3 3" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ChatInput: React.FC<ChatInputProps> = ({
    onSendMessage,
    onContinueChat,
    onStartChat,
    loading,
    isFirstMessage,
    hasPreviousSession,
    isExpanded
}) => {
    const [message, setMessage] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Определяем текст плейсхолдера в зависимости от состояния
    const placeholderText = isFirstMessage
        ? "Задайте вопрос..."
        : "Введите сообщение...";

    // Автофокус на инпуте при первом рендере и после отправки
    useEffect(() => {
        if (inputRef.current && isExpanded) {
            inputRef.current.focus();
        }
    }, [isFirstMessage, loading, isExpanded]);

    const handleSend = () => {
        if (message.trim() && !loading) {
            // Если это первое взаимодействие и есть текст, вызываем функцию раскрытия чата
            if (!isExpanded && onStartChat) {
                onStartChat();
            }

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

    const handleContinueChat = () => {
        if (onContinueChat && hasPreviousSession && !loading) {
            onContinueChat();
        }
    };

    return (
        <InputWrapper $isExpanded={isExpanded} $isFirstMessage={isFirstMessage}>
            <InputContainer $isExpanded={isExpanded}>
                {/* Показываем кнопку истории только при первом сообщении */}
                {isFirstMessage && (
                    <ContinueButton
                        title={hasPreviousSession ? "Продолжить предыдущий диалог" : "Нет предыдущих диалогов"}
                        onClick={handleContinueChat}
                        disabled={!hasPreviousSession || loading}
                        $isActive={hasPreviousSession}
                        $isLoading={loading}
                    >
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <HistoryIcon />
                        )}
                    </ContinueButton>
                )}

                <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholderText}
                    disabled={loading}
                />

                <SendButton
                    onClick={handleSend}
                    disabled={loading}
                    title="Отправить сообщение"
                    $hasText={!!message.trim()}
                >
                    <SendIcon />
                </SendButton>
            </InputContainer>
        </InputWrapper>
    );
};