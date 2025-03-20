import styled, { css, keyframes } from 'styled-components';
import { pulseEffect, buttonHover } from '../../../animations/keyframes

// Анимация подсветки бордера
const borderGlow = keyframes`
  0% {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: rgba(230, 230, 230, 1);
  }
  50% {
    box-shadow: 0 2px 12px rgba(74, 125, 255, 0.12);
    border-color: rgba(74, 125, 255, 0.5);
  }
  100% {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: rgba(230, 230, 230, 1);
  }
`;

export const animations = {
    pulseEffect: css`
        animation: ${pulseEffect} 2s infinite alternate;
    `,
    buttonHover: css`
        animation: ${buttonHover} 0.6s ease infinite;
    `,
    borderGlow: css`
        animation: ${borderGlow} 2s infinite ease-in-out;
    `
};


export const InputWrapper = styled('div')<{ $isExpanded: boolean; $isFirstMessage: boolean }>(
    ({ $isExpanded, $isFirstMessage }) => ({
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: $isExpanded ? '16px' : '8px',
        paddingBottom: $isExpanded ? '16px' : '12px',
        marginTop: 'auto',
        transition: 'all 0.3s ease-in-out',
        zIndex: 1002,
        backgroundColor: 'transparent', // Убираем фон
        boxShadow: $isExpanded ? 'none' : 'none', // Убираем тень
    })
);

export const InputContainer = styled('div')<{ $isExpanded: boolean }>(
    ({ $isExpanded }) => ({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: $isExpanded ? '800px' : '60%',
        padding: '6px 12px',
        backgroundColor: '#fff',
        borderRadius: '24px',
        border: '1px solid #e6e6e6',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        '&:focus-within': {
            borderColor: 'rgba(74, 125, 255, 0.7)',
            boxShadow: '0 3px 10px rgba(74, 125, 255, 0.15)',
            transform: 'translateY(-1px)'
        },
        '@media (max-width: 768px)': {
            maxWidth: $isExpanded ? '95%' : '85%'
        }
    }),
    ({ $isExpanded }) => !$isExpanded && animations.pulseEffect,
    ({ $isExpanded }) => $isExpanded && css`
        &:focus-within {
            ${animations.borderGlow}
        }
    `
);

export const Input = styled('input')({
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    padding: '10px 12px',
    background: 'transparent',
    borderRadius: '24px',
    color: '#333',
    transition: 'all 0.2s ease',
    '&::placeholder': {
        color: '#999',
        transition: 'color 0.2s ease'
    },
    '&:focus::placeholder': {
        color: '#bbb'
    }
});

export const SendButton = styled('button')<{ $hasText: boolean }>(
    ({ $hasText }) => ({
        width: '42px',
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        background: $hasText ? '#4a7dff' : '#e0e0e0',
        borderRadius: '50%',
        cursor: $hasText ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        padding: 0,
        marginLeft: '8px',
        opacity: $hasText ? 1 : 0.6,
        transform: 'scale(1)',
        '&:hover': {
            transform: $hasText ? 'scale(1.05)' : 'scale(1)',
            background: $hasText ? '#5a8aff' : '#e0e0e0',
        },
        '&:active': {
            transform: $hasText ? 'scale(0.95)' : 'scale(1)'
        }
    }),
    ({ $hasText }) => $hasText && animations.buttonHover
);

// Кнопка продолжения диалога (слева от ввода)
export const ContinueButton = styled('button')<{ $isActive: boolean; $isLoading: boolean }>(
    ({ $isActive, $isLoading }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        background: 'transparent',
        border: '1px solid #e0e0e0',
        borderRadius: '50%',
        cursor: $isActive ? 'pointer' : 'default',
        opacity: $isActive ? 1 : 0.5,
        transition: 'all 0.2s ease',
        marginRight: '6px',
        color: $isActive ? '#666' : '#aaa',
        '&:hover': {
            background: $isActive ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
            transform: $isActive ? 'scale(1.05)' : 'none'
        },
        '&:active': {
            transform: $isActive ? 'scale(0.95)' : 'none'
        },
        '&:disabled': {
            opacity: $isLoading ? 0.8 : 0.5,
            cursor: 'default'
        }
    })
);

// Спиннер загрузки для кнопки истории
export const LoadingSpinner = styled('div')({
    width: '16px',
    height: '16px',
    border: '2px solid rgba(0, 0, 0, 0.1)',
    borderTopColor: '#666',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
        to: { transform: 'rotate(360deg)' }
    }
});