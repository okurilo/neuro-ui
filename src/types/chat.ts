// Типы данных для чата

// Тип сообщения
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: number;
}

// Тип сессии чата
export interface ChatSession {
  id: string;
  messages: Message[];
}

// Тип ответа от API
export interface ChatResponse {
  sessionId: string;
  message: Message;
}
