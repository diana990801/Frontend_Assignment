'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const NavLink = styled(Link)`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  }
`;

const LanguageSwitcher = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-left: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: ${({ theme }) => theme.spacing.md};
  }
`;

const LanguageButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: ${({ $active, theme }) => 
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) => 
    $active ? 'white' : theme.colors.textLight};
  
  &:hover {
    background-color: ${({ $active, theme }) => 
      $active ? theme.colors.primaryDark : theme.colors.backgroundLight};
  }
`;

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Nav>
      <NavContainer>
        <Link href="/">
          <Logo>GoodBoy</Logo>
        </Link>
        <NavLinks>
          <NavLink href="/">{t('navigation.home')}</NavLink>
          <NavLink href="/donate">{t('navigation.donate')}</NavLink>
          <NavLink href="/donors">{t('navigation.donors')}</NavLink>
          <NavLink href="/contact">{t('navigation.contact')}</NavLink>
          <LanguageSwitcher>
            <LanguageButton 
              $active={i18n.language === 'sk'}
              onClick={() => changeLanguage('sk')}
              aria-label="Switch to Slovak"
            >
              SK
            </LanguageButton>
            <LanguageButton 
              $active={i18n.language === 'en'}
              onClick={() => changeLanguage('en')}
              aria-label="Switch to English"
            >
              EN
            </LanguageButton>
          </LanguageSwitcher>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};
