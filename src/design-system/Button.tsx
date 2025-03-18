import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import ProjectTypes from '../ds-types';

// Используем типы из предоставленного ds-types.d.ts
interface ButtonProps extends 
  ProjectTypes.components_Button.ButtonProps, 
  ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

// Стили для разных типов кнопок
const typeStyles = {
  primary: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    '&:hover': {
      backgroundColor: '#0069d9',
    },
    '&:active': {
      backgroundColor: '#0062cc',
    },
    '&:disabled': {
      backgroundColor: '#80bdff',
      cursor: 'not-allowed',
    }
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    '&:hover': {
      backgroundColor: '#5a6268',
    },
    '&:active': {
      backgroundColor: '#545b62',
    },
    '&:disabled': {
      backgroundColor: '#a5adb5',
      cursor: 'not-allowed',
    }
  },
  tertiary: {
    backgroundColor: 'transparent',
    color: '#007bff',
    border: '1px solid #007bff',
    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 0.1)',
    },
    '&:active': {
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
    },
    '&:disabled': {
      color: '#80bdff',
      borderColor: '#80bdff',
      cursor: 'not-allowed',
    }
  },
  mono: {
    backgroundColor: '#f8f9fa',
    color: '#212529',
    border: '1px solid #f8f9fa',
    '&:hover': {
      backgroundColor: '#e2e6ea',
      borderColor: '#dae0e5',
    },
    '&:active': {
      backgroundColor: '#dae0e5',
      borderColor: '#d3d9df',
    },
    '&:disabled': {
      backgroundColor: '#f8f9fa',
      color: '#6c757d',
      cursor: 'not-allowed',
    }
  },
  monoSecondary: {
    backgroundColor: 'transparent',
    color: '#6c757d',
    border: '1px solid #6c757d',
    '&:hover': {
      backgroundColor: 'rgba(108, 117, 125, 0.1)',
    },
    '&:active': {
      backgroundColor: 'rgba(108, 117, 125, 0.2)',
    },
    '&:disabled': {
      color: '#a5adb5',
      borderColor: '#a5adb5',
      cursor: 'not-allowed',
    }
  }
};

// Стили для разных размеров кнопок
const sizeStyles = {
  l: {
    padding: '0.75rem 1.5rem',
    fontSize: '1.25rem',
    borderRadius: '0.3rem',
  },
  m: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '0.25rem',
  },
  s: {
    padding: '0.375rem 0.75rem',
    fontSize: '0.875rem',
    borderRadius: '0.2rem',
  },
  xs: {
    padding: '0.25rem 0.5rem',
    fontSize: '0.75rem',
    borderRadius: '0.15rem',
  }
};

// Стилизованная кнопка
const ButtonComponent = styled('button')<ButtonProps>(({ 
  $type = 'primary', 
  $size = 'm', 
  $containsOnlyIcon = false,
  $fullWidth = false,
  $state,
  disabled
}) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 500,
  textAlign: 'center',
  userSelect: 'none',
  transition: 'all 0.15s ease-in-out',
  cursor: disabled ? 'not-allowed' : 'pointer',
  width: $fullWidth ? '100%' : 'auto',
  
  // Применяем стили по типу
  ...typeStyles[$type],
  
  // Применяем стили по размеру
  ...sizeStyles[$size],
  
  // Специальные стили для кнопок с иконками
  ...$containsOnlyIcon && {
    padding: $size === 'l' ? '0.75rem' : $size === 'm' ? '0.5rem' : $size === 's' ? '0.375rem' : '0.25rem',
    aspectRatio: '1 / 1',
    borderRadius: '50%'
  },
  
  // Применяем стили состояния
  ...($state === 'hover' && {
    boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
  }),
  ...($state === 'focus' && {
    boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.5)',
  }),
  ...($state === 'pressed' && {
    transform: 'translateY(1px)',
  })
}));

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <ButtonComponent {...rest}>{children}</ButtonComponent>;
};