import styled from 'styled-components';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  padding: '0 16px',
  boxSizing: 'border-box',
  background: 'linear-gradient(135deg, #a5c7e9 0%, #b99ad6 100%)',
  position: 'relative',
  overflow: 'hidden',
  '@media (max-width: 768px)': {
    padding: '0 8px'
  }
});