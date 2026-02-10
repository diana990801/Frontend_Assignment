'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@/components/common/Button';

const Hero = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.95;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const HeroDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  opacity: 0.9;
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.lg};
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textDark};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`;

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle>{t('home.title')}</HeroTitle>
          <HeroSubtitle>{t('home.subtitle')}</HeroSubtitle>
          <HeroDescription>{t('home.description')}</HeroDescription>
          <HeroActions>
            <Link href="/donate">
              <Button $size="lg" $variant="secondary">
                {t('home.startDonation')}
              </Button>
            </Link>
            <Link href="/donors">
              <Button $size="lg" $variant="outline" style={{ color: 'white', borderColor: 'white' }}>
                {t('home.learnMore')}
              </Button>
            </Link>
          </HeroActions>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>{t('home.howItHelps')}</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🏥</FeatureIcon>
            <FeatureTitle>{t('home.medicalCare')}</FeatureTitle>
            <FeatureDescription>
              {t('home.medicalCareDesc')}
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🍖</FeatureIcon>
            <FeatureTitle>{t('home.foodNutrition')}</FeatureTitle>
            <FeatureDescription>
              {t('home.foodNutritionDesc')}
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🏠</FeatureIcon>
            <FeatureTitle>{t('home.safeShelter')}</FeatureTitle>
            <FeatureDescription>
              {t('home.safeShelterDesc')}
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </Section>
    </>
  );
}
