import { ChatSession, ChatResponse } from '../types/chat';

export const chatService = {
  // Получение истории чата
  getHistory: async (): Promise<ChatSession | null> => {
    try {
      // const response = await fetch('configurator/api/v4/chat');
      // Временно используем mocky.io как общедоступное API для демонстрации
      const response = await fetch('https://run.mocky.io/v3/a5a67c68-a44e-48c1-abe8-e0abe32ad890');
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
      // const response = await fetch('configurator/api/v4/chat', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     text,
      //     sessionId
      //   })
      // });
      
      // Временное решение для демонстрации работы
      // Эмулируем ответ от сервера
      await new Promise(resolve => setTimeout(resolve, 1000)); // эмуляция запроса
      
      // Создаем фиктивный ответ на основе вопроса
      const fakeResponse: ChatResponse = {
        sessionId: sessionId || 'demo-session-123',
        message: {
          id: Date.now().toString(),
          text: getResponseForMessage(text),
          sender: 'assistant',
          timestamp: Date.now()
        }
      };
      
      return fakeResponse;
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      throw error;
    }
  }
};

// Функция для генерации ответов на часто задаваемые вопросы
function getResponseForMessage(text: string): string {
  const normalizedText = text.toLowerCase();
  
  if (normalizedText.includes('привет') || normalizedText.includes('здравствуй')) {
    return 'Здравствуйте! Чем я могу вам помочь сегодня?';
  }
  
  if (normalizedText.includes('справк') && normalizedText.includes('посольств')) {
    return 'Для посольства доступны следующие виды справок: справка с указанием даты приема и должности на русском, справка о доходах, справка о стаже работы. Какая именно вас интересует?';
  }
  
  if (normalizedText.includes('дат') && normalizedText.includes('прием') && normalizedText.includes('должност')) {
    return 'Справка с указанием даты приема и должности на русском языке будет готова в течение 3 рабочих дней. Вы можете получить ее в отделе кадров в кабинете 207.';
  }
  
  if (normalizedText.includes('как') && normalizedText.includes('заказать')) {
    return 'Чтобы заказать справку, нужно оформить заявку в личном кабинете сотрудника или обратиться напрямую в отдел кадров. Срок изготовления большинства справок - 3 рабочих дня.';
  }
  
  return 'Я могу рассказать подробнее о видах справок для посольства и процедуре их получения. Какая информация вас интересует?';
}