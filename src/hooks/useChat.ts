import { useState, useEffect, useCallback } from 'react';
import { Message } from '../types/chat';
import { getHistory, sendMessage } from '../api/chatApi';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  // Загрузка истории при первом рендере
  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      try {
        const history = await getHistory();
        if (history) {
          setMessages(history.messages);
          setSessionId(history.id);
          setIsFirstMessage(history.messages.length === 0);
        }
      } catch (error) {
        console.error('Ошибка при загрузке истории чата:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  // Отправка сообщения
  const sendChatMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Добавляем сообщение пользователя в список
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
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
    } catch (error) {
      console.error('Ошибка при получении ответа:', error);
      setLoading(false);
    }
  }, [sessionId]);

  return {
    messages,
    sendMessage: sendChatMessage,
    loading,
    isFirstMessage
  };
};