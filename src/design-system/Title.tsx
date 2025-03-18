import React, { JSX, ReactNode } from 'react';
import styled from 'styled-components';
import ProjectTypes from '../ds-types';

// Используем типы из предоставленного ds-types.d.ts
interface TitleProps extends ProjectTypes.components_Title.TitleProps {
  children?: ReactNode;
  style?: React.CSSProperties;
}

// Маппинг размеров на CSS свойства
const sizeStyles = {
  H1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    margin: '0 0 0.5rem 0'
  },
  H2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.2,
    margin: '0 0 0.5rem 0'
  },
  H3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.2,
    margin: '0 0 0.5rem 0'
  },
  subheadline: {
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.3,
    margin: '0 0 0.4rem 0'
  },
  footnote: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.4,
    margin: '0'
  }
};

// Функция для определения HTML тега на основе размера
const getTagForSize = (size: ProjectTypes.components_Title.Size): keyof JSX.IntrinsicElements => {
  switch (size) {
    case 'H1': return 'h1';
    case 'H2': return 'h2';
    case 'H3': return 'h3';
    case 'subheadline': return 'h4';
    case 'footnote': return 'p';
    default: return 'h1';
  }
};

const TitleComponent = styled('div')<TitleProps>(({ $size = 'H1', $isActive, $isTab }) => ({
  ...sizeStyles[$size],
  color: $isActive ? '#007bff' : '#000',
  cursor: $isTab ? 'pointer' : 'inherit',
  transition: 'color 0.3s ease'
}));

export const Title: React.FC<TitleProps> = ({ children, $size = 'H1', ...rest }) => {
  // Определяем тег на основе размера
  const Tag = getTagForSize($size);
  
  return (
    <TitleComponent as={Tag} $size={$size} {...rest}>
      {children}
    </TitleComponent>
  );
};