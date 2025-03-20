
// src/components/Chat/MessagesList/index.tsx
import React, { useEffect, useRef } from 'react';
import { Message } from '../Message';
import { Message as MessageType } from '../../../types/chat';
import { MessagesContainer, DateSeparator, DatePill, MessagesContainerWrapper } from './styled';

// Иконка календаря
const CalendarIcon = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3.5" width="12" height="10" rx="1.5" stroke="#666" />
        <path d="M2 6h12" stroke="#666" />
        <path d="M5.5 1.5v3M10.5 1.5v3" stroke="#666" strokeLinecap="round" />
        <path d="M4.5 8.5h1M7.5 8.5h1M10.5 8.5h1M4.5 11h1M7.5 11h1M10.5 11h1" stroke="#666" strokeLinecap="round" />
    </svg>
);

interface MessagesListProps {
    messages: MessageType[];
}

// Функция для форматирования даты
function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Функция для проверки, нужно ли отображать разделитель даты
function shouldShowDateSeparator(currentMsg: MessageType, prevMsg?: MessageType): boolean {
    if (!prevMsg) return true;

    const currentDate = new Date(currentMsg.timestamp);
    const prevDate = new Date(prevMsg.timestamp);

    return currentDate.toDateString() !== prevDate.toDateString();
}

export const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Добавляем задержку для корректного скролла виджетов
        const timer = setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            }
        }, 100); // Небольшая задержка для рендеринга виджетов

        return () => clearTimeout(timer);
    }, [messages]);

    return (
        <MessagesContainerWrapper>
            <MessagesContainer ref={containerRef}>
                {messages.map((message, index) => (
                    <React.Fragment key={message.id || index}>
                        {shouldShowDateSeparator(message, messages[index - 1]) && (
                            <DateSeparator>
                                <DatePill>
                                    <CalendarIcon />
                                    {formatDate(message.timestamp)}
                                </DatePill>
                            </DateSeparator>
                        )}

                        <Message
                            message={message}
                            isLast={index === messages.length - 1}
                        />
                    </React.Fragment>
                ))}
            </MessagesContainer>
        </MessagesContainerWrapper>
    );
};