'use client';

import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textDark};
`;

interface InputProps {
  $hasError?: boolean;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: 2px solid ${({ $hasError, theme }) => 
    $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  background-color: ${({ theme }) => theme.colors.background};

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) => 
      $hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ $hasError, theme }) => 
      $hasError ? `${theme.colors.error}20` : `${theme.colors.primary}20`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDark};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const TextArea = styled.textarea<InputProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: 2px solid ${({ $hasError, theme }) => 
    $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  background-color: ${({ theme }) => theme.colors.background};
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) => 
      $hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ $hasError, theme }) => 
      $hasError ? `${theme.colors.error}20` : `${theme.colors.primary}20`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDark};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

export const Select = styled.select<InputProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: 2px solid ${({ $hasError, theme }) => 
    $hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) => 
      $hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ $hasError, theme }) => 
      $hasError ? `${theme.colors.error}20` : `${theme.colors.primary}20`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDark};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const HelperText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  user-select: none;
`;
