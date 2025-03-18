import React, { ReactNode } from 'react';
import styled from 'styled-components';
import ProjectTypes from '../ds-types';

// Используем типы из предоставленного ds-types.d.ts
interface TextProps extends ProjectTypes.components_Text.TextProps {
  children?: ReactNode;
  style?: React.CSSProperties;
}

// Маппинг вариантов текста на CSS свойства
const variantStyles = {
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.2
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.2
  },
  bodyLarge: {
    fontSize: '1.125rem',
    fontWeight: 400,
    lineHeight: 1.5
  },
  bodyRegular: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5
  },
  bodySmall: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.5
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.5
  }
};

const TextComponent = styled('span')<TextProps>(({ variant = 'bodyRegular', theme, ...rest }) => ({
  ...variantStyles[variant as keyof typeof variantStyles],
  display: 'inline-block'
}));

export const Text: React.FC<TextProps> = ({ children, variant = 'bodyRegular', ...rest }) => {
  return (
    <TextComponent variant={variant} {...rest}>
      {children}
    </TextComponent>
  );
};