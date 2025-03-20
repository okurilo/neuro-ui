import styled from 'styled-components';

export const MessagesContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    padding: '80px 10px 90px 10px', // Увеличенный отступ сверху для заголовка и снизу для инпута
    overflow: 'auto',
    maxHeight: 'calc(100vh - 80px)', // Учитываем отступ для инпута
    height: '100vh',
    scrollBehavior: 'smooth',
    position: 'relative',
    backdropFilter: "blur(5px)",
    maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",

    // Улучшенный стиль скроллбара - показывается только при наведении
    '&::-webkit-scrollbar': {
        width: '4px'
    },

    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },

    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        transition: 'background 0.3s ease'
    },

    '&:hover::-webkit-scrollbar-thumb': {
        background: 'rgba(0, 0, 0, 0.2)'
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