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

// Simple typing animation for loading dots
export const typing = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
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
