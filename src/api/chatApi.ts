// src/api/chatApi.ts
import { ChatSession, ChatResponse, Message, ContentType } from '../types/chat';

// Константа для переключения между мок и сервером
const USE_MOCK_API = true;

export async function getHistory(sessionId?: string): Promise<ChatSession | null> {
    if (USE_MOCK_API) {
        return getMockHistory(sessionId);
    } else {
        return getServerHistory(sessionId);
    }
}

export async function sendMessage(text: string, sessionId?: string): Promise<ChatResponse> {
    if (USE_MOCK_API) {
        return sendMockMessage(text, sessionId);
    } else {
        return sendServerMessage(text, sessionId);
    }
}

// Серверное API
async function getServerHistory(sessionId?: string): Promise<ChatSession | null> {
    try {
        const url = sessionId
            ? `/configurator/api/v4/chat/history/${sessionId}`
            : '/configurator/api/v4/chat/history';

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
                timestamp: Date.now(),
                type: getContentType(result.data.type),
                widget: result.data.type === 'widget' ? result.data.widget : undefined,
                imageUrl: result.data.type === 'image' ? result.data.imageUrl : undefined,
                videoUrl: result.data.type === 'video' ? result.data.videoUrl : undefined
            }
        };
    } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
        throw error;
    }
}

// Мок API
async function getMockHistory(sessionId?: string): Promise<ChatSession | null> {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (sessionId === 'demo-session-with-history') {
        return {
            id: 'demo-session-with-history',
            messages: [
                {
                    id: '1',
                    text: 'Привет!',
                    sender: 'user',
                    timestamp: Date.now() - 60000,
                    type: 'text'
                },
                {
                    id: '2',
                    text: 'Здравствуйте! Чем я могу вам помочь сегодня?',
                    sender: 'assistant',
                    timestamp: Date.now() - 55000,
                    type: 'text'
                }
            ]
        };
    }

    return {
        id: sessionId || 'mock-session-123',
        messages: []
    };
}

async function sendMockMessage(text: string, sessionId?: string): Promise<ChatResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = getMockResponse(text);

    return {
        sessionId: sessionId || 'mock-session-123',
        message: {
            id: Date.now().toString(),
            text: response.text,
            sender: 'assistant',
            timestamp: Date.now(),
            type: response.type,
            widget: response.type === 'widget' ? response.widget : undefined,
            imageUrl: response.type === 'image' ? response.imageUrl : undefined,
            videoUrl: response.type === 'video' ? response.videoUrl : undefined
        }
    };
}

interface MockResponse {
    text: string;
    type: ContentType;
    widget?: any;
    imageUrl?: string;
    videoUrl?: string;
}

function getMockResponse(text: string): MockResponse {
    const normalizedText = text.toLowerCase();

    if (normalizedText.includes('виджет') || normalizedText.includes('форма')) {
        return {
            text: 'Вот форма для заказа справки:',
            type: 'widget',
            widget: {
                id: "contact-form-widget",
                type: "Container",
                props: {
                    direction: "column",
                    position: "default",
                },
                children: [
                    {
                        id: "form-title",
                        type: "Text",
                        props: {
                            text: "Заказ справки",
                            type: "h2Semibold",
                        }
                    },
                    {
                        id: "name-input",
                        type: "Input",
                        props: {
                            placeholder: "Ваше имя",
                        }
                    },
                    {
                        id: "email-input",
                        type: "Input",
                        props: {
                            placeholder: "Ваш Email",
                        }
                    },
                    {
                        id: "submit-button",
                        type: "Button",
                        props: {
                            text: "Отправить",
                            size: "m",
                        }
                    }
                ]
            }
        };
    }

    if (normalizedText.includes('картинк') || normalizedText.includes('фото') || normalizedText.includes('изображ')) {
        return {
            text: 'Вот пример справки:',
            type: 'image',
            imageUrl: 'https://example.com/example-image.jpg'
        };
    }

    if (normalizedText.includes('видео') || normalizedText.includes('ролик')) {
        return {
            text: 'Вот обучающее видео:',
            type: 'video',
            videoUrl: 'https://example.com/example-video.mp4'
        };
    }

    if (normalizedText.includes('привет') || normalizedText.includes('здравствуй')) {
        return {
            text: 'Здравствуйте! Чем я могу вам помочь сегодня?',
            type: 'text'
        };
    }

    if (normalizedText.includes('справк') && normalizedText.includes('место')) {
        return {
            text: 'Чтобы получить справку с места работы, нужно оформить заявку в личном кабинете сотрудника или обратиться напрямую в отдел кадров. Справка будет готова в течение 3 рабочих дней.',
            type: 'text'
        };
    }

    if (normalizedText.includes('погода')) {
        return {
            text: 'Я не имею доступа к текущим данным о погоде. Для получения информации о погоде рекомендую обратиться к специализированным сервисам.',
            type: 'text'
        };
    }

    if (normalizedText.includes('справк') && normalizedText.includes('заказ')) {
        return {
            text: 'Вы можете заказать следующие виды справок: справка с места работы, справка о стаже работы, справка для визы, справка 2-НДФЛ, справка о неполучении пособия, архивная справка. Какая из них вас интересует?',
            type: 'text'
        };
    }

    if (normalizedText.includes('команд')) {
        return {
            text: 'Для получения информации о составе вашей команды вам необходимо обратиться к своему руководителю или в отдел кадров, так как я не имею доступа к таким данным.',
            type: 'text'
        };
    }

    if (normalizedText.includes('отпуск')) {
        return {
            text: 'Для получения информации о количестве дней отпуска обратитесь в отдел кадров или проверьте в личном кабинете сотрудника.',
            type: 'text'
        };
    }

    return {
        text: 'Я готов ответить на ваши вопросы о справках и других документах. Как я могу помочь?',
        type: 'text'
    };
}