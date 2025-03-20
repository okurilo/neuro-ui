// src/hooks/useChat.ts
import { useState, useEffect, useCallback } from 'react';
import { Message, ContentType } from '../types/chat';
import { getHistory, sendMessage } from '../api/chatApi';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [historyMessages, setHistoryMessages] = useState<Message[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>();
  const [previousSessionId, setPreviousSessionId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [hasPreviousSession, setHasPreviousSession] = useState(false);

  // Загрузка истории при первом рендере
  const loadHistory = useCallback(async () => {
    setLoading(true);
    try {
      const history = await getHistory();
      if (history && history.id) {
        setPreviousSessionId(history.id);
        setHistoryMessages(history.messages);
        setHasPreviousSession(history.messages.length > 0);
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

  // Продолжение предыдущего диалога
  const continueChat = useCallback(() => {
    if (!previousSessionId || historyMessages.length === 0) return;

    // Используем сохраненные сообщения из истории
    setMessages(historyMessages);
    setCurrentSessionId(previousSessionId);
    setIsFirstMessage(false);
  }, [previousSessionId, historyMessages]);

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
      // Отправляем сообщение на сервер, используя текущий sessionId (если есть)
      const response = await sendMessage(text, currentSessionId);

      // Обновляем ID сессии из ответа
      setCurrentSessionId(response.sessionId);

      // Небольшая задержка перед добавлением ответа
      setTimeout(() => {
        setMessages(prev => [...prev, response.message]);
        setLoading(false);
      }, 500);

      setIsFirstMessage(false);
    } catch (error) {
      console.error('Ошибка при получении ответа:', error);
      setLoading(false);
    }
  }, [currentSessionId]);

  // Сброс чата
  const resetChat = useCallback(() => {
    // Сохраняем текущий ID как предыдущий
    if (currentSessionId) {
      setPreviousSessionId(currentSessionId);
      // При следующем входе нужно будет запросить свежие данные
      setHasPreviousSession(true);
    }

    // Очищаем текущие данные
    setMessages([]);
    setCurrentSessionId(undefined);
    setIsFirstMessage(true);

    // Делаем новый запрос на историю, чтобы обновить данные
    loadHistory();
  }, [currentSessionId, loadHistory]);

  return {
    messages,
    sendMessage: sendChatMessage,
    loading,
    isFirstMessage,
    hasPreviousSession,
    resetChat,
    continueChat,
    sessionId: currentSessionId
  };
};