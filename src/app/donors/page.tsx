'use client';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common/Card';
import { useDonationStats } from '@/hooks/useApi';
import { Loading } from '@/components/common/Loading';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const StatCard = styled(Card).attrs({ $elevated: true })`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textLight};
`;

const DonorTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const TableHeader = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textDark};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

export default function DonorsPage() {
  const { t } = useTranslation();
  const { data: stats, isLoading, error } = useDonationStats();

  if (isLoading) {
    return (
      <Container>
        <Card>
          <Loading text={t('common.loading')} />
        </Card>
      </Container>
    );
  }

  if (error || !stats) {
    return (
      <Container>
        <Card>
          <CardContent>
            <p style={{ textAlign: 'center', color: '#dc3545' }}>
              {t('common.error')}
            </p>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <StatsGrid>
        <StatCard>
          <StatValue>{(stats.totalAmount || 0).toFixed(2)} €</StatValue>
          <StatLabel>{t('donors.totalAmount')}</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.donorCount || 0}</StatValue>
          <StatLabel>{t('donors.donorCount')}</StatLabel>
        </StatCard>
      </StatsGrid>

      <Card $elevated>
        <CardHeader>
          <CardTitle>{t('donors.donorList')}</CardTitle>
        </CardHeader>
        <CardContent>
          {!stats.donors || stats.donors.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6c757d' }}>
              {t('donors.noDonors')}
            </p>
          ) : (
            <DonorTable>
              <thead>
                <tr>
                  <TableHeader>{t('donors.name')}</TableHeader>
                  <TableHeader>{t('donors.amount')}</TableHeader>
                  <TableHeader>{t('donors.date')}</TableHeader>
                </tr>
              </thead>
              <tbody>
                {stats.donors.map((donor, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {donor.firstName 
                        ? `${donor.firstName} ${donor.lastName}`
                        : donor.lastName || t('donors.anonymous')}
                    </TableCell>
                    <TableCell>{(donor.amount || 0).toFixed(2)} €</TableCell>
                    <TableCell>
                      {donor.donatedAt 
                        ? new Date(donor.donatedAt).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </DonorTable>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
