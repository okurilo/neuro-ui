import { ChatSession, ChatResponse } from '../types/chat';

export const chatService = {
  // Получение истории чата
  getHistory: async (): Promise<ChatSession | null> => {
    try {
      const response = await fetch('configurator/api/v4/chat');
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Ошибка при получении истории чата:', error);
      return null;
    }
  },
  
  // Отправка сообщения
  sendMessage: async (text: string, sessionId?: string): Promise<ChatResponse> => {
    try {
      const response = await fetch('configurator/api/v4/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          sessionId
        })
      });
      
      if (!response.ok) throw new Error('Ошибка при отправке сообщения');
      return await response.json();
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      throw error;
    }
  }
};
