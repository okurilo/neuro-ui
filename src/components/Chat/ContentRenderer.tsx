import React from 'react';
import { Message } from '../../types/chat';
import { Text } from '../../design-system/Text';
import { WidgetRenderer } from './WidgetRenderer';
import styled from 'styled-components';

interface ContentRendererProps {
    message: Message;
}

const ImagePlaceholder = styled('div')({
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    margin: '8px 0',
});

const VideoPlaceholder = styled('div')({
    width: '100%',
    height: '200px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    margin: '8px 0',
});

export const ContentRenderer: React.FC<ContentRendererProps> = ({ message }) => {
    switch (message.type) {
        case 'widget':
            return <WidgetRenderer widget={message.widget} />;
        case 'image':
            return (
                <>
                    <Text variant="bodyRegular">{message.text}</Text>
                    <ImagePlaceholder>Изображение: {message.imageUrl}</ImagePlaceholder>
                </>
            );
        case 'video':
            return (
                <>
                    <Text variant="bodyRegular">{message.text}</Text>
                    <VideoPlaceholder>Видео: {message.videoUrl}</VideoPlaceholder>
                </>
            );
        case 'text':
        default:
            return <Text variant="bodyRegular">{message.text}</Text>;
    }
};