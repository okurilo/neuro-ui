import { keyframes } from 'styled-components';

// Simplified fade-in animation
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Enhanced typing animation for loading dots
export const typing = keyframes`
  0%, 20% { 
    opacity: 0.3;
    transform: scale(1);
  }
  40% { 
    opacity: 1;
    transform: scale(1.3);
  }
  70%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
`;

// Smooth message appearance animation
export const messageAppear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Pulse animation for loading indicator
export const pulseBorder = keyframes`
  0% { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }
  50% { box-shadow: 0 2px 12px rgba(74, 125, 255, 0.15); }
  100% { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); }
`;