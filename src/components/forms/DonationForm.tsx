'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input, InputWrapper, Label, ErrorMessage, Select, Checkbox, CheckboxWrapper, CheckboxLabel } from '@/components/common/Input';
import { useShelters, useDonation } from '@/hooks/useApi';
import { useDonationStore } from '@/store/donationStore';
import { getDonationSchema, DonationFormSchema, getPhonePrefixFromNumber } from '@/utils/validation';
import { DonationType, PhonePrefix } from '@/types';
import { Loading } from '@/components/common/Loading';
import { useState, useMemo, useEffect, useRef } from 'react';

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const FormContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const DogImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

const FormSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textDark};
`;

const MainTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 0.5rem;
  justify-self: center;
`;

const DonationTypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const DonationTypeButton = styled.button<{ $selected?: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : theme.colors.background};
  color: ${({ $selected, theme }) => 
    $selected ? 'white' : theme.colors.textDark};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const AmountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const AmountButton = styled.button<{ $selected?: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background-color: ${({ $selected, theme }) => 
    $selected ? theme.colors.primary : theme.colors.backgroundLight};
  color: ${({ $selected, theme }) => 
    $selected ? 'white' : theme.colors.textDark};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ $selected, theme }) => 
      $selected ? theme.colors.primaryDark : theme.colors.backgroundDark};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const PhoneInputWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FlagSelect = styled.select`
  width: 80px;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  
  h2 {
    color: ${({ theme }) => theme.colors.success};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const ErrorAlert = styled.div`
  background-color: ${({ theme }) => `${theme.colors.error}10`};
  border: 1px solid ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.border};
    z-index: 0;
  }
`;

const StepItem = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  z-index: 1;

  .step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $active, $completed, theme }) =>
      $completed || $active ? theme.colors.primary : theme.colors.background};
    border: 2px solid ${({ $active, $completed, theme }) =>
      $completed || $active ? theme.colors.primary : theme.colors.border};
    color: ${({ $active, $completed }) => ($completed || $active ? 'white' : '#999')};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  .step-label {
    margin-top: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textLight)};
    font-weight: ${({ $active, theme }) => ($active ? theme.fontWeights.semibold : theme.fontWeights.normal)};
    text-align: center;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.xs};
    }
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column-reverse;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SummaryItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  .label {
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.textLight};
  }
  
  .value {
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.textDark};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    text-align: right;
  }
`;

const AmountDisplay = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  .amount-value {
    font-size: 64px;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.textLight};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    
    input {
      border: none;
      border-bottom: 3px solid ${({ theme }) => theme.colors.border};
      font-size: 64px;
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      color: ${({ theme }) => theme.colors.textDark};
      width: 200px;
      text-align: right;
      background: transparent;
      outline: none;
      
      &:focus {
        border-bottom-color: ${({ theme }) => theme.colors.primary};
      }
    }
    
    .currency {
      color: ${({ theme }) => theme.colors.textDark};
    }
  }
`;

const predefinedAmounts = [5, 10, 20, 50, 100];

export const DonationForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { formData, setFormData, resetForm } = useDonationStore();
  const { data: shelters, isLoading: sheltersLoading } = useShelters();
  const { mutate: submitDonation, isPending, isSuccess, isError, error } = useDonation();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(formData.amount || null);
  const [phonePrefix, setPhonePrefix] = useState<PhonePrefix>(PhonePrefix.SK);
  const [currentStep, setCurrentStep] = useState(1);
  const previousLanguage = useRef(i18n.language);

  const donationSchema = useMemo(() => getDonationSchema(t), [t, i18n.language]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<DonationFormSchema>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      ...formData,
      donationType: formData.donationType || DonationType.GENERAL,
    },
  });

  // Re-validate when language changes to update error messages
  useEffect(() => {
    if (previousLanguage.current !== i18n.language) {
      previousLanguage.current = i18n.language;
      const hasErrors = Object.keys(errors).length > 0;
      if (hasErrors) {
        // Use setTimeout to avoid blocking the main thread
        setTimeout(() => trigger(), 0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language, trigger]);

  const donationType = watch('donationType');
  const customAmountValue = watch('customAmount');
  const amount = watch('amount');
  const shelterId = watch('shelterId');
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const phone = watch('phone');

  const onSubmit = (data: DonationFormSchema) => {
    // Amount is validated by Zod schema, so it's guaranteed to be a positive number here
    const finalAmount = data.amount!;
    
    submitDonation({
      shelterId: data.donationType === DonationType.SHELTER ? data.shelterId : undefined,
      amount: finalAmount,
      firstName: data.firstName || undefined,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    });
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setValue('amount', amount);
    setValue('customAmount', undefined);
  };

  const handleCustomAmount = (value: string) => {
    setSelectedAmount(null);
    if (value === '' || value === null || value === undefined) {
      setValue('customAmount', undefined);
      setValue('amount', undefined);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > 0) {
        setValue('customAmount', numValue);
        setValue('amount', numValue);
      } else {
        setValue('customAmount', undefined);
        setValue('amount', undefined);
      }
    }
  };

  const handlePhoneChange = (value: string) => {
    // Ensure the value starts with the selected prefix
    let cleanValue = value.replace(/\D/g, '');
    const prefixNumber = phonePrefix.replace('+', '');
    
    if (!cleanValue.startsWith(prefixNumber)) {
      cleanValue = prefixNumber + cleanValue.replace(prefixNumber, '');
    }
    
    // Limit to 12 digits (prefix + 9 digits)
    cleanValue = cleanValue.slice(0, 12);
    
    return phonePrefix + cleanValue.slice(prefixNumber.length);
  };

  const handlePrefixChange = (prefix: PhonePrefix) => {
    setPhonePrefix(prefix);
    const currentPhone = watch('phone') || '';
    const digits = currentPhone.replace(/\D/g, '').slice(3); // Remove old prefix
    setValue('phone', prefix + digits);
  };

  const handleNextStep = async () => {
    let fieldsToValidate: any[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['donationType', 'shelterId', 'amount'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'phone'];
    }

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return t('donation.step1Title');
      case 2:
        return t('donation.step2Title');
      case 3:
        return t('donation.step3Title');
      default:
        return t('donation.title');
    }
  };

  if (sheltersLoading) {
    return (
      <PageWrapper>
        <FormContainer>
          <Card>
            <Loading text={t('common.loading')} />
          </Card>
        </FormContainer>
        <DogImageContainer>
          <img src="/images/dog-beach.jpg" alt="Dog" />
        </DogImageContainer>
      </PageWrapper>
    );
  }

  if (isSuccess) {
    return (
      <PageWrapper>
        <FormContainer>
          <Card>
            <SuccessMessage>
              <h2>✓ {t('donation.success.title')}</h2>
              <p>{t('donation.success.message')}</p>
              <Button onClick={resetForm} $size="lg">
                {t('donation.success.newDonation')}
              </Button>
            </SuccessMessage>
          </Card>
        </FormContainer>
        <DogImageContainer>
          <img src="/images/dog-sunset.jpg" alt="Dog" />
        </DogImageContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <FormContainer>
        {/* Main Title */}
        <MainTitle>{getStepTitle()}</MainTitle>
        
        {/* Stepper */}
        <StepperContainer>
            <StepItem $active={currentStep === 1} $completed={currentStep > 1}>
              <div className="step-circle">{currentStep > 1 ? '✓' : '1'}</div>
              <div className="step-label">{t('donation.step1Label')}</div>
            </StepItem>
            <StepItem $active={currentStep === 2} $completed={currentStep > 2}>
              <div className="step-circle">{currentStep > 2 ? '✓' : '2'}</div>
              <div className="step-label">{t('donation.step2Label')}</div>
            </StepItem>
            <StepItem $active={currentStep === 3} $completed={false}>
              <div className="step-circle">3</div>
              <div className="step-label">{t('donation.step3Label')}</div>
            </StepItem>
          </StepperContainer>

          <form onSubmit={handleSubmit(onSubmit)}>
            {isError && (
              <ErrorAlert>
                {t('donation.error.message')}
              </ErrorAlert>
            )}

            {/* Step 1: Donation Type, Shelter, Amount */}
            {currentStep === 1 && (
              <>
                <DonationTypeGrid>
                  <DonationTypeButton
                    type="button"
                    $selected={donationType === DonationType.SHELTER}
                    onClick={() => setValue('donationType', DonationType.SHELTER)}
                  >
                    {t('donation.type.shelter')}
                  </DonationTypeButton>
                  <DonationTypeButton
                    type="button"
                    $selected={donationType === DonationType.GENERAL}
                    onClick={() => setValue('donationType', DonationType.GENERAL)}
                  >
                    {t('donation.type.general')}
                  </DonationTypeButton>
                </DonationTypeGrid>

                <FormSection>
                  <SectionTitle>O projekte</SectionTitle>
                  <Label>Útulok {t('donation.shelter.optional')}</Label>
                  <Select 
                    {...register('shelterId')}
                    disabled={donationType !== DonationType.SHELTER}
                  >
                    <option value="">{t('donation.shelter.placeholder')}</option>
                    {shelters?.map((shelter) => (
                      <option key={shelter.id} value={shelter.id}>
                        {shelter.name}
                      </option>
                    ))}
                  </Select>
                  {errors.shelterId && (
                    <ErrorMessage>{errors.shelterId.message}</ErrorMessage>
                  )}
                </FormSection>

                <FormSection>
                  <SectionTitle>{t('donation.amount.title')}</SectionTitle>
                  
                  <AmountDisplay>
                    <div className="amount-value">
                      {amount || customAmountValue || 0} | €
                    </div>
                  </AmountDisplay>

                  <AmountGrid>
                    {[5, 10, 20, 30, 50, 100].map((amt) => (
                      <AmountButton
                        key={amt}
                        type="button"
                        $selected={amount === amt}
                        onClick={() => {
                          setValue('amount', amt);
                          setValue('customAmount', undefined);
                        }}
                      >
                        {amt} €
                      </AmountButton>
                    ))}
                  </AmountGrid>
                </FormSection>

                <NavigationButtons>
                  <Button 
                    type="button" 
                    $variant="outline"
                    disabled
                    style={{ visibility: 'hidden' }}
                  >
                    {t('common.back')}
                  </Button>
                  <Button type="button" onClick={handleNextStep}>
                    {t('common.next')} →
                  </Button>
                </NavigationButtons>
              </>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <>
                <FormSection>
                  <SectionTitle>{t('donation.personal.title')}</SectionTitle>
                  
                  <InputWrapper>
                    <Label>{t('donation.personal.firstName')}</Label>
                    <Input
                      type="text"
                      placeholder={t('donation.personal.firstNamePlaceholder')}
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <ErrorMessage>{errors.firstName.message}</ErrorMessage>
                    )}
                  </InputWrapper>

                  <InputWrapper>
                    <Label>{t('donation.personal.lastName')}</Label>
                    <Input
                      type="text"
                      placeholder={t('donation.personal.lastNamePlaceholder')}
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <ErrorMessage>{errors.lastName.message}</ErrorMessage>
                    )}
                  </InputWrapper>

                  <InputWrapper>
                    <Label>{t('donation.personal.email')}</Label>
                    <Input
                      type="email"
                      placeholder={t('donation.personal.emailPlaceholder')}
                      {...register('email')}
                    />
                    {errors.email && (
                      <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                  </InputWrapper>

                  <InputWrapper>
                    <Label>{t('donation.personal.phone')}</Label>
                    <PhoneInputWrapper>
                      <FlagSelect 
                        value={phonePrefix}
                        onChange={(e) => {
                          const newPrefix = e.target.value as PhonePrefix;
                          setPhonePrefix(newPrefix);
                          const currentNumber = phone ? phone.replace(/^\+\d{3}/, '') : '';
                          setValue('phone', newPrefix + currentNumber);
                        }}
                      >
                        <option value={PhonePrefix.SK}>🇸🇰 +421</option>
                        <option value={PhonePrefix.CZ}>🇨🇿 +420</option>
                      </FlagSelect>
                      <Input
                        type="tel"
                        placeholder={t('donation.personal.phonePlaceholder')}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setValue('phone', phonePrefix + value.slice(0, 9));
                        }}
                        value={phone ? phone.replace(/^\+\d{3}/, '') : ''}
                      />
                    </PhoneInputWrapper>
                    {errors.phone && (
                      <ErrorMessage>{errors.phone.message}</ErrorMessage>
                    )}
                  </InputWrapper>
                </FormSection>

                <NavigationButtons>
                  <Button
                    type="button"
                    $variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    {t('common.back')}
                  </Button>
                  <Button type="button" onClick={handleNextStep}>
                    {t('common.next')}
                  </Button>
                </NavigationButtons>
              </>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <>
                <FormSection>
                  <SectionTitle>{t('donation.step3Title')}</SectionTitle>
                  <SummaryGrid>
                    <SummaryItem>
                      <div className="label">{t('donation.type.title')}</div>
                      <div className="value">
                        {donationType === DonationType.GENERAL 
                          ? t('donation.type.general')
                          : t('donation.type.shelter')}
                      </div>
                    </SummaryItem>

                    {donationType === DonationType.SHELTER && shelterId && (
                      <SummaryItem>
                        <div className="label">{t('donation.shelter.title')}</div>
                        <div className="value">
                          {shelters?.find(s => s.id === parseInt(String(shelterId)))?.name || '-'}
                        </div>
                      </SummaryItem>
                    )}

                    <SummaryItem>
                      <div className="label">{t('donation.amount.title')}</div>
                      <div className="value">{amount || customAmountValue || 0}€</div>
                    </SummaryItem>

                    {firstName && (
                      <SummaryItem>
                        <div className="label">{t('donation.personal.firstName')}</div>
                        <div className="value">{firstName}</div>
                      </SummaryItem>
                    )}

                    <SummaryItem>
                      <div className="label">{t('donation.personal.lastName')}</div>
                      <div className="value">{lastName || '-'}</div>
                    </SummaryItem>

                    <SummaryItem>
                      <div className="label">{t('donation.personal.email')}</div>
                      <div className="value">{email || '-'}</div>
                    </SummaryItem>

                    <SummaryItem>
                      <div className="label">{t('donation.personal.phone')}</div>
                      <div className="value">{phone || '-'}</div>
                    </SummaryItem>
                  </SummaryGrid>
                </FormSection>

                <FormSection>
                  <CheckboxWrapper>
                    <Checkbox
                      type="checkbox"
                      id="gdprConsent"
                      {...register('gdprConsent')}
                    />
                    <CheckboxLabel htmlFor="gdprConsent">
                      {t('donation.personal.gdprConsent')}
                    </CheckboxLabel>
                  </CheckboxWrapper>
                  {errors.gdprConsent && (
                    <ErrorMessage>{errors.gdprConsent.message}</ErrorMessage>
                  )}
                </FormSection>

                <NavigationButtons>
                  <Button
                    type="button"
                    $variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    {t('common.back')}
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? t('common.loading') : t('donation.confirmAndSubmit')}
                  </Button>
                </NavigationButtons>
              </>
            )}
          </form>
      </FormContainer>
      <DogImageContainer>
        <img src="/images/dog-beach.jpg" alt="Dog on beach" />
      </DogImageContainer>
    </PageWrapper>
  );
};
