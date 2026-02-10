'use client';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ContactItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const ContactLabel = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ContactValue = styled.div`
  color: ${({ theme }) => theme.colors.textDark};
`;

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <Container>
      <Card $elevated>
        <CardHeader>
          <CardTitle>{t('contact.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactGrid>
            <ContactItem>
              <ContactLabel>{t('contact.organization')}</ContactLabel>
              <ContactValue>GoodBoy Foundation</ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>{t('contact.address')}</ContactLabel>
              <ContactValue>
                Hlavná 123<br />
                811 01 Bratislava<br />
                Slovakia
              </ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>{t('contact.email')}</ContactLabel>
              <ContactValue>
                <a href="mailto:info@goodboy.sk">info@goodboy.sk</a>
              </ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>{t('contact.phone')}</ContactLabel>
              <ContactValue>
                <a href="tel:+421123456789">+421 123 456 789</a>
              </ContactValue>
            </ContactItem>
            <ContactItem>
              <ContactLabel>{t('contact.openingHours')}</ContactLabel>
              <ContactValue>
                {t('contact.openingHoursWeekdays')}<br />
                {t('contact.openingHoursWeekend')}
              </ContactValue>
            </ContactItem>
          </ContactGrid>
        </CardContent>
      </Card>
    </Container>
  );
}
