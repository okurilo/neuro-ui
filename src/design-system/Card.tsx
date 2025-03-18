
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import ProjectTypes from '../ds-types';

// Используем типы из предоставленного ds-types.d.ts
interface CardProps extends ProjectTypes.components_Card.CardProps {
  children?: ReactNode;
  style?: React.CSSProperties;
}

// Базовый стилизованный компонент
const CardContainer = styled('div')<CardProps>(({ $shadow = true, $type = 'default', theme }) => ({
  backgroundColor: $type === 'default' ? '#ffffff' : '#f8f9fa',
  borderRadius: '8px',
  boxShadow: $shadow ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  border: $type === 'contrast' ? '1px solid #eaeaea' : 'none'
}));

export const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return <CardContainer {...rest}>{children}</CardContainer>;
};