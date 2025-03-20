import styled, { css } from 'styled-components';
import { pulseEffect, buttonHover } from '../../../animations/keyframes';

export const animations = {
    pulseEffect: css`
    animation: ${pulseEffect} 2s infinite alternate;
  `,
    buttonHover: css`
    animation: ${buttonHover} 0.6s ease infinite;
  `,
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
        backgroundColor: $isExpanded ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
        boxShadow: $isExpanded ? 'none' : '0 -2px 10px rgba(0, 0, 0, 0.05)',
    })
);

export const InputContainer = styled('div')<{ $isExpanded: boolean; $isFirstMessage: boolean }>(
    ({ $isExpanded, $isFirstMessage }) => ({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: $isExpanded ? '800px' : '60%',
        padding: '6px 12px',
        backgroundColor: '#fff',
        borderRadius: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        '&:focus-within': {
            boxShadow: '0 4px 12px rgba(106, 113, 235, 0.3)'
        },
        '@media (max-width: 768px)': {
            maxWidth: $isExpanded ? '95%' : '85%'
        }
    }),
    ({ $isExpanded, $isFirstMessage }) => !$isExpanded && animations.pulseEffect
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
    transition: 'transform 0.2s ease',
    '&:focus': {
        transform: 'scale(1.01)'
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
export const ContinueButton = styled('button')(
    {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        background: 'transparent',
        border: '1px solid #e0e0e0',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginRight: '6px',
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.05)',
            transform: 'scale(1.05)'
        },
        '&:active': {
            transform: 'scale(0.95)'
        }
    }
);