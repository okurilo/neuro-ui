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

// Обновленная часть в chatApi.ts
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

        // Обрабатываем разные типы ответов
        let messageContent: any = {
            type: 'text',
            text: result.data.value || ''
        };

        // Если пришел виджет, сохраняем его структуру
        if (result.data.type === 'widget') {
            messageContent = {
                type: 'widget',
                text: '', // Можно задать текстовое описание виджета, если нужно
                widget: result.data.value // Предполагаем, что в value содержится объект виджета
            };
        }
        // Для изображений
        else if (result.data.type === 'image') {
            messageContent = {
                type: 'image',
                text: result.data.value || '', // Описание изображения
                imageUrl: result.data.imageUrl || null
            };
        }
        // Для видео
        else if (result.data.type === 'video') {
            messageContent = {
                type: 'video',
                text: result.data.value || '', // Описание видео
                videoUrl: result.data.videoUrl || null
            };
        }

        return {
            sessionId: result.data.chatId,
            message: {
                id: Date.now().toString(),
                text: messageContent.text,
                sender: result.data.role.toLowerCase(),
                timestamp: Date.now(),
                type: messageContent.type,
                widget: messageContent.widget,
                imageUrl: messageContent.imageUrl,
                videoUrl: messageContent.videoUrl
            }
        };
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
        throw error;
    }
}

function parseServerMessages(data: any): ChatSession {
    // Преобразование ответа сервера в формат приложения
    return {
        id: data.id,
        messages: data.messages.map((msg: any) => ({
            id: msg.chatId || Date.now().toString(),
            text: msg.value,
            sender: msg.role.toLowerCase(),
            timestamp: new Date(msg.timestamp || Date.now()).getTime(),
            type: getContentType(msg.type),
            widget: msg.type === 'widget' ? msg.widget : undefined,
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