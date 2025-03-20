import styled from 'styled-components';

export const MessagesContainerWrapper = styled('div')({
    position: 'relative',
    height: 'calc(100vh - 120px)',
    overflow: 'hidden', // Скрываем внешний скролл
    paddingTop: '80px',
    paddingBottom: '80px'
});

export const MessagesContainer = styled('div')({
    height: '100%',
    overflow: 'auto',
    paddingRight: '10px',
    paddingLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    scrollBehavior: 'smooth',

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
// export const DatePill = styled('div')({
//     background: 'rgba(255, 255, 255, 0.9)',
//     backdropFilter: 'blur(4px)',
//     border: '1px solid rgba(0, 0, 0, 0.05)',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
//     borderRadius: '20px',
//     padding: '6px 16px',
//     fontSize: '13px',
//     fontWeight: 500,
//     color: '#555',
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '6px',
//     zIndex: 1
// });