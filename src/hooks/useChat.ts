// src/hooks/useChat.ts
import { useState, useEffect, useCallback } from 'react';
import { Message, ContentType } from '../types/chat';
import { getHistory, sendMessage } from '../api/chatApi';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [hasPreviousSession, setHasPreviousSession] = useState(false);

  // Загрузка истории при первом рендере
  const loadHistory = useCallback(async (sessionId?: string) => {
    setLoading(true);
    try {
      const history = await getHistory(sessionId);
      if (history) {
        // Если это продолжение диалога, загружаем сообщения
        if (sessionId) {
          setMessages(history.messages);
          setIsFirstMessage(false);
        } else {
          // Если у нас есть ID сессии, но нет сообщений, то установим флаг наличия предыдущей сессии
          setHasPreviousSession(!!history.id && history.messages.length === 0);
        }
        setSessionId(history.id);
      }
    } catch (error) {
      console.error('Ошибка при загрузке истории чата:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Отправка сообщения
  const sendChatMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Добавляем сообщение пользователя в список
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      type: 'text',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Отправляем сообщение на сервер
      const response = await sendMessage(text, sessionId);

      // Обновляем ID сессии
      setSessionId(response.sessionId);

      // Небольшая задержка перед добавлением ответа
      setTimeout(() => {
        setMessages(prev => [...prev, response.message]);
        setLoading(false);
      }, 500);

      setIsFirstMessage(false);
      setHasPreviousSession(false);
    } catch (error) {
      console.error('Ошибка при получении ответа:', error);
      setLoading(false);
    }
  }, [sessionId]);

  // Сброс чата
  const resetChat = useCallback(() => {
    setMessages([]);
    setSessionId(undefined);
    setIsFirstMessage(true);
    setHasPreviousSession(false);
  }, []);

  // Продолжение предыдущего чата
  const continueChat = useCallback(async () => {
    if (sessionId) {
      await loadHistory(sessionId);
    }
  }, [loadHistory, sessionId]);

  return {
    messages,
    sendMessage: sendChatMessage,
    loading,
    isFirstMessage,
    hasPreviousSession,
    resetChat,
    continueChat,
    sessionId
  };
};