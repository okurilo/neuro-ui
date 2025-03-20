import React, { useState, useEffect, useRef } from 'react';
import { InputWrapper, InputContainer, Input, SendButton, ContinueButton } from './styled';

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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M12 8v4l3 3" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.05 11a9 9 0 1 1 .5 4" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 16V8h8" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
        <InputWrapper $isExpanded={isExpanded} $isFirstMessage={isFirstMessage} >
            <InputContainer $isExpanded={isExpanded} $isFirstMessage={isFirstMessage} >
                {isFirstMessage && hasPreviousSession && (
                    <ContinueButton
                        title="Продолжить предыдущий диалог"
                        onClick={handleContinueChat}
                        disabled={loading}
                    >
                        <HistoryIcon />
                    </ContinueButton>
                )}
                <Input
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Задайте вопрос..."
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