import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Chat } from './components/Chat';
import { createGlobalStyle } from 'styled-components';

// Предполагаемая тема для приложения
const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
  },
  fontSizes: {
    small: '0.875rem',
    normal: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '3rem',
  }
};

// Глобальные стили с анимациями
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    color: #333;
    overflow-x: hidden;
  }

  ::selection {
    background-color: rgba(0, 123, 255, 0.2);
  }

  a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: #0056b3;
  }
  
  /* Плавные переходы для элементов */
  button, input, a, textarea {
    transition: all 0.2s ease-in-out;
  }
`;

export const App: React.FC = () => {
  console.log('Inside app');
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Chat />
    </ThemeProvider>
  );
};

export default App;
