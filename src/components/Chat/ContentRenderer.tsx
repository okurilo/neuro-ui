// src/components/Chat/ContentRenderer.tsx
import React from 'react';
import { Message } from '../../types/chat';
import { Text } from '@pulse/ui/components/Text';
import styled from 'styled-components';
import { fadeIn } from '../../animations/chatAnimations';
import { css } from 'styled-components';
import { Visualizer } from "../../../wivis/Visualizer";

interface ContentRendererProps {
    message: Message;
}

const animations = {
    fadeIn: css`
        animation: ${fadeIn} 0.5s ease-out forwards;
    `,
};

const MediaContainer = styled('div')(
    {
        width: '100%',
        borderRadius: '8px',
        margin: '8px 0',
        overflow: 'hidden',
        position: 'relative',
    },
    animations.fadeIn
);

const ImageContent = styled('div')({
    width: '100%',
    height: '200px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});

const VideoContent = styled('div')({
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    position: 'relative',
});

const PlayIcon = styled('div')({
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        transform: 'translate(-50%, -50%) scale(1.1)',
    }
});

// SVG иконка для воспроизведения видео
const VideoPlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5L19 12L8 19V5Z" fill="white" />
    </svg>
);

// Иконка для изображения
const ImageIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#666" strokeWidth="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="#666" />
        <path d="M6 16L8 13L10 14L14 10L18 16H6Z" fill="#666" />
    </svg>
);

export const ContentRenderer: React.FC<ContentRendererProps> = ({ message }) => {
    // Проверяем только тип сообщения, не вдаваясь в структуру
    switch (message.type) {
        case 'widget':
            return <Visualizer scheme={message.widget} />;
        case 'image':
            return (
                <>
                    {message.text && <Text variant="body1Regular">{message.text}</Text>}
                    <MediaContainer>
                        <ImageContent style={{ backgroundImage: message.imageUrl ? `url(${message.imageUrl})` : 'none' }}>
                            {!message.imageUrl && (
                                <>
                                    <ImageIcon />
                                    <Text variant="caption1Regular" style={{ marginLeft: '8px' }}>Изображение не доступно</Text>
                                </>
                            )}
                        </ImageContent>
                    </MediaContainer>
                </>
            );
        case 'video':
            return (
                <>
                    {message.text && <Text variant="body1Regular">{message.text}</Text>}
                    <MediaContainer>
                        <VideoContent>
                            {message.videoUrl ? (
                                <PlayIcon>
                                    <VideoPlayIcon />
                                </PlayIcon>
                            ) : (
                                <Text variant="bodySmall">Видео не доступно</Text>
                            )}
                        </VideoContent>
                    </MediaContainer>
                </>
            );
        case 'text':
        default:
            return <Text variant="body1Regular">{message.text}</Text>;
    }
};