// src/api/chatApi.ts

import { ChatSession, ChatResponse, Message } from '../types/chat';

// Константа для переключения между мок и сервером
const USE_MOCK_API = true; // Просто поменяйте на false чтобы использовать сервер

/**
 * Получение истории чата
 */
export async function getHistory(): Promise<ChatSession | null> {
    if (USE_MOCK_API) {
        return getMockHistory();
    } else {
        return getServerHistory();
    }
}

/**
 * Отправка сообщения в чат
 */
export async function sendMessage(text: string, sessionId?: string): Promise<ChatResponse> {
    if (USE_MOCK_API) {
        return sendMockMessage(text, sessionId);
    } else {
        return sendServerMessage(text, sessionId);
    }
}

// ==================== Реализация серверного API ====================

async function getServerHistory(): Promise<ChatSession | null> {
    try {
        const response = await fetch('/configurator/api/v4/chat/history');
        if (!response.ok) return null;

        const result = await response.json();
        if (!result.success) return null;

        return result.data;
    } catch (error) {
        console.error('Ошибка при получении истории чата:', error);
        return null;
    }
}

async function sendServerMessage(text: string, sessionId?: string): Promise<ChatResponse> {
    try {
        const requestBody: Record<string, any> = { value: text };
        if (sessionId) {
            requestBody.chatId = sessionId;
        }

        const response = await fetch('/configurator/api/v4/chat/say', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }

        const result = await response.json();
        if (!result.success) {
            throw new Error('Ошибка в ответе API');
        }

        // Преобразование формата API к внутреннему формату приложения
        return {
            sessionId: result.data.chatId,
            message: {
                id: Date.now().toString(),
                text: result.data.value,
                sender: result.data.role.toLowerCase(),
                timestamp: Date.now()
            }
        };
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
        throw error;
    }
}

// ==================== Реализация мок API ====================

async function getMockHistory(): Promise<ChatSession | null> {
    // Имитация задержки
    await new Promise(resolve => setTimeout(resolve, 800));

    // Возвращаем пустую историю, чтобы ассистент не отвечал сразу
    return {
        id: 'mock-session-123',
        messages: [] // Пустой массив сообщений
    };
}

async function sendMockMessage(text: string, sessionId?: string): Promise<ChatResponse> {
    // Имитация задержки
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        sessionId: sessionId || 'mock-session-123',
        message: {
            id: Date.now().toString(),
            text: getMockResponse(text),
            sender: 'assistant',
            timestamp: Date.now()
        }
    };
}

function getMockResponse(text: string): string {
    const normalizedText = text.toLowerCase();

    if (normalizedText.includes('привет') || normalizedText.includes('здравствуй')) {
        return 'Здравствуйте! Чем я могу вам помочь сегодня?';
    }

    if (normalizedText.includes('справк') && normalizedText.includes('посольств')) {
        return 'Чаще всего мне заказывают вот такие справки с места работы. Если выберете «другая справка», то я подскажу, какие ещё справки можно заказать.';
    }

    if (normalizedText.includes('дат') && normalizedText.includes('прием') && normalizedText.includes('должност')) {
        return 'Справка с указанием даты приема и должности на русском языке будет готова в течение 3 рабочих дней. Вы можете получить ее в отделе кадров в кабинете 207.';
    }

    if (normalizedText.includes('как') && normalizedText.includes('заказать')) {
        return 'Чтобы заказать справку, нужно оформить заявку в личном кабинете сотрудника или обратиться напрямую в отдел кадров. Срок изготовления большинства справок - 3 рабочих дня.';
    }

    if (normalizedText.includes('другая справка')) {
        return 'Кроме стандартных справок, вы можете заказать: справку о стаже работы, справку для визы, справку 2-НДФЛ, справку о неполучении пособия, архивную справку. Какая из них вас интересует?';
    }

    return 'Я могу рассказать подробнее о видах справок для посольства и процедуре их получения. Какая информация вас интересует?';
}