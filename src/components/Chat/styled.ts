import styled, { css } from 'styled-components';
import { typing, fadeIn } from '../../animations/chatAnimations';
import backgroundSrc from "../../assets/background.svg?react";

export const animations = {
    typing: css`
    animation: ${typing} 1s infinite ease-in-out;
  `,
    fadeIn: css`
    animation: ${fadeIn} 0.5s ease-out forwards;
  `,
};

// Оверлей, который будет закрывать основное содержимое страницы
export const ChatOverlay = styled('div')<{ $isExpanded: boolean }>(
    ({ $isExpanded }) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(5px)',
        zIndex: 999,
        opacity: $isExpanded ? 1 : 0,
        pointerEvents: $isExpanded ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        backgroundImage: $isExpanded ? `url(${backgroundSrc})` : 'none',
        backgroundSize: 'cover',
    })
);

// Контейнер для содержимого чата
export const ChatContainer = styled('div')<{ $isExpanded: boolean }>(
    ({ $isExpanded }) => ({
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: $isExpanded ? '100vh' : '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        zIndex: 1000,
        transition: 'height 0.3s ease',
        overflow: 'hidden',
    })
);

// Основной контейнер для содержимого
export const ContentContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 16px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    '@media (max-width: 768px)': {
        padding: '0 8px'
    }
});

// Индикатор загрузки
export const LoadingIndicator = styled('div')({
    display: 'inline-flex',
    alignItems: 'center',
    position: 'fixed',
    left: '50%',
    bottom: '82px',
    transform: 'translateX(-50%)',
    zIndex: 1005,
});

// Эффект печатающегося сообщения
export const TypingIndicator = styled('div')({
    display: 'inline-block',
    padding: '8px 12px',
    background: '#f0f0f0',
    borderRadius: '16px',
    maxWidth: '100px',
    minWidth: '40px',
    position: 'relative',
});

// Три точки внутри индикатора печати
export const TypingDots = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    gap: '4px',
});

export const TypingDot = styled('span')(
    {
        width: '6px',
        height: '6px',
        backgroundColor: '#666',
        borderRadius: '50%',
        display: 'inline-block',
    },
    css`
    animation: ${typing} 1.4s infinite;
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  `
);

// Кнопка закрытия чата
export const CloseButton = styled('button')({
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#fff',
    border: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1003,
    transition: 'all 0.2s ease',
    '&:hover': {
        background: '#f0f0f0',
        transform: 'scale(1.1)'
    }
}, animations.fadeIn);