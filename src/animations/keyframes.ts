import { keyframes } from 'styled-components';

// Анимация появления сообщений
export const fadeInMessage = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Анимация пульсации для поискового поля
export const pulseEffect = keyframes`
  0% {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  100% {
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.3);
  }
`;

// Анимация для точек загрузки
export const loadingDots = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

// Анимация для плавного появления заголовка
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Анимация для кнопки отправки
export const popIn = keyframes`
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Анимация для печатающихся индикаторов
export const typing = keyframes`
  0% {
    transform: translateY(0px);
  }
  28% {
    transform: translateY(-5px);
  }
  44% {
    transform: translateY(0px);
  }
`;

// Анимация для подсветки при фокусе
export const glowEffect = keyframes`
  0% {
    box-shadow: 0 0 0 rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  }
`;