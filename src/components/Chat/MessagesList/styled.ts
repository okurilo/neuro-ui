import styled from 'styled-components';

export const MessagesContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    padding: '80px 10px 90px 10px',
    overflow: 'auto',
    maxHeight: 'calc(100vh - 120px)', // Увеличиваем отступ сверху
    height: '100vh',
    scrollBehavior: 'smooth',
    position: 'relative',
    backdropFilter: "blur(5px)",
    maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)", // Плавное затухание скролла сверху и снизу

    // Стиль скроллбара в стиле macOS
    '&::-webkit-scrollbar': {
        width: '8px',
        backgroundColor: 'transparent',
    },

    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
        margin: '4px 0',
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        border: '2px solid transparent',
        backgroundClip: 'content-box',
        transition: 'background-color 0.3s ease',
    },

    '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }
});

// Стилизованный компонент для отображения даты
export const DateSeparator = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '24px 0 16px',
    position: 'relative'
});

export const DatePill = styled('div')({
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    borderRadius: '20px',
    padding: '6px 16px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#555',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    zIndex: 1
});