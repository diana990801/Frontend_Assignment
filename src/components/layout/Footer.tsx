'use client';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FooterText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;

const Copyright = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>{t('contact.organization')}</FooterTitle>
          <FooterText>
            {t('footer.description')}
          </FooterText>
        </FooterSection>
        <FooterSection>
          <FooterTitle>{t('footer.contactTitle')}</FooterTitle>
          <FooterText>{t('contact.email')}: info@goodboy.sk</FooterText>
          <FooterText>{t('contact.phone')}: +421 123 456 789</FooterText>
        </FooterSection>
        <FooterSection>
          <FooterTitle>{t('footer.legalTitle')}</FooterTitle>
          <FooterText>{t('footer.privacyPolicy')}</FooterText>
          <FooterText>{t('footer.termsOfService')}</FooterText>
        </FooterSection>
      </FooterContent>
      <Copyright>
        {t('footer.copyright', { year: currentYear })}
      </Copyright>
    </FooterContainer>
  );
};
