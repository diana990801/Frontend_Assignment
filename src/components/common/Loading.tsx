'use client';

import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.backgroundDark};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 0.8s linear infinite;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing['2xl']};
`;

export const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
`;

interface LoadingProps {
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};
