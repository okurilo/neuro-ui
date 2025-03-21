// src/api/chatApi.ts
import { ChatSession, ChatResponse, Message, ContentType } from '../types/chat';

export async function getHistory(sessionId?: string): Promise<ChatSession | null> {
    try {
        // Запрос истории: без sessionId - получаем последнюю сессию
        // с sessionId - получаем конкретную сессию
        const url = sessionId
            ? `/api-web/configurator/api/v4/chat/history/${sessionId}`
            : '/api-web/configurator/api/v4/chat/history';

        const response = await fetch(url);
        if (!response.ok) return null;

        const result = await response.json();
        if (!result.success) return null;

        return parseServerMessages(result.data);
    } catch (error) {
        console.error('Ошибка при получении истории чата:', error);
        return null;
    }
}

export async function sendMessage(text: string, sessionId?: string): Promise<ChatResponse> {
    try {
        const requestBody: Record<string, any> = { value: text };
        if (sessionId) {
            requestBody.chatId = sessionId;
        }

        const response = await fetch('/api-web/configurator/api/v4/chat/say', {
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

        // Определяем тип контента
        const contentType = getContentType(result.data.type);

        return {
            sessionId: result.data.chatId,
            message: {
                id: Date.now().toString(),
                text: result.data.value || "",
                sender: result.data.role.toLowerCase(),
                timestamp: Date.now(),
                type: contentType,
                // Сохраняем оригинальную структуру
                widget: contentType === 'widget' ? result.data.value : undefined,
                imageUrl: contentType === 'image' ? result.data.imageUrl : undefined,
                videoUrl: contentType === 'video' ? result.data.videoUrl : undefined
            }
        };
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
        throw error;
    }
}

function parseServerMessages(data: any): ChatSession {
    // Преобразуем сообщения, сохраняя оригинальную структуру
    return {
        id: data.id,
        messages: data.messages.map((msg: any) => ({
            id: msg.chatId || Date.now().toString(),
            text: msg.value || "",
            sender: msg.role.toLowerCase(),
            timestamp: new Date(msg.timestamp || Date.now()).getTime(),
            type: getContentType(msg.type),
            // Просто передаем всю структуру как есть, не делая предположений
            widget: msg.type === 'widget' ? msg.value : undefined,
            imageUrl: msg.type === 'image' ? msg.imageUrl : undefined,
            videoUrl: msg.type === 'video' ? msg.videoUrl : undefined
        }))
    };
}

function getContentType(serverType: string): ContentType {
    switch (serverType) {
        case 'widget': return 'widget';
        case 'image': return 'image';
        case 'video': return 'video';
        default: return 'text';
    }
}