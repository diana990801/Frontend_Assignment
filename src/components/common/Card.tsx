'use client';

import styled from 'styled-components';

interface CardProps {
  $elevated?: boolean;
}

export const Card = styled.div<CardProps>`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ $elevated, theme }) => 
    $elevated ? theme.shadows.lg : theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.normal};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  &:hover {
    box-shadow: ${({ $elevated, theme }) => 
      $elevated ? theme.shadows.xl : theme.shadows.lg};
  }
`;

export const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
`;

export const CardContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const CardFooter = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;
