import { useState, useEffect } from 'react';
import { Message } from '../types/chat';
import { chatService } from '../api/chatService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  // Загрузка истории при первом рендере
  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      const history = await chatService.getHistory();
      if (history) {
        setMessages(history.messages);
        setSessionId(history.id);
        setIsFirstMessage(false);
      }
      setLoading(false);
    };

    loadHistory();
  }, []);

  // Отправка сообщения
  const sendMessage = async (text: string) => {
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
      const response = await chatService.sendMessage(text, sessionId);
      
      // Обновляем ID сессии и добавляем ответ ассистента
      setSessionId(response.sessionId);
      
      // Небольшая задержка перед добавлением ответа для более естественного ощущения
      setTimeout(() => {
        setMessages(prev => [...prev, response.message]);
        setLoading(false);
      }, 500);
      
      setIsFirstMessage(false);
    } catch (error) {
      console.error('Ошибка при получении ответа:', error);
      setLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    loading,
    isFirstMessage
  };
};