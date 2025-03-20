// src/types/chat.ts
// Типы данных для чата

export type ContentType = 'text' | 'widget' | 'image' | 'video';

// Тип сообщения
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: number;
  type?: ContentType;
  widget?: any;
  imageUrl?: string;
  videoUrl?: string;
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