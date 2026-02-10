'use client';

import styled from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  $size?: 'sm' | 'md' | 'lg';
  $fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  border: 2px solid transparent;

  ${({ $size = 'md', theme }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSizes.sm};
        `;
      case 'lg':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.fontSizes.lg};
        `;
      default:
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSizes.md};
        `;
    }
  }}

  ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: white;

          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondaryDark};
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.md};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primary};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            color: white;
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.backgroundDark};
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: white;

          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryDark};
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.md};
          }
        `;
    }
  }}

  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
