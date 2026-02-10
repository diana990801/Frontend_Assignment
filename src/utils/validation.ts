import { z } from 'zod';
import { DonationType, PhonePrefix } from '@/types';
import { TFunction } from 'i18next';

export const getDonationSchema = (t: TFunction) => {
  return z.object({
    donationType: z.nativeEnum(DonationType),
    shelterId: z.number().optional().or(z.undefined()),
    amount: z.number().positive({ message: t('validation.positiveNumber') }).optional().or(z.undefined()),
    customAmount: z.number().positive({ message: t('validation.positiveNumber') }).optional().or(z.undefined()),
    firstName: z
      .string()
      .min(2, { message: t('validation.minLength', { min: 2 }) })
      .max(20, { message: t('validation.maxLength', { max: 20 }) })
      .optional()
      .or(z.literal('')),
    lastName: z
      .string()
      .min(2, { message: t('validation.minLength', { min: 2 }) })
      .max(30, { message: t('validation.maxLength', { max: 30 }) }),
    email: z.string().email({ message: t('validation.email') }),
    phone: z
      .string()
      .regex(
        /^(\+421|\+420)[0-9]{9}$/,
        { message: t('validation.phone') }
      ),
    gdprConsent: z.boolean().refine((val) => val === true, {
      message: t('validation.gdprConsent'),
    }),
  }).refine(
    (data) => {
      // Check if amount is provided and valid
      if (!data.amount || data.amount <= 0 || isNaN(data.amount)) {
        return false;
      }
      return true;
    },
    {
      message: t('validation.amountRequired'),
      path: ['amount'],
    }
  ).refine(
    (data) => {
      if (data.donationType === DonationType.SHELTER && !data.shelterId) {
        return false;
      }
      return true;
    },
    {
      message: t('validation.shelterRequired'),
      path: ['shelterId'],
    }
  );
};

export type DonationFormSchema = z.infer<ReturnType<typeof getDonationSchema>>;

export const getPhonePrefixFromNumber = (phone: string): PhonePrefix | null => {
  if (phone.startsWith('+421')) return PhonePrefix.SK;
  if (phone.startsWith('+420')) return PhonePrefix.CZ;
  return null;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 12) {
    const prefix = cleaned.slice(0, 3);
    const part1 = cleaned.slice(3, 6);
    const part2 = cleaned.slice(6, 9);
    const part3 = cleaned.slice(9, 12);
    return `+${prefix} ${part1} ${part2} ${part3}`;
  }
  return phone;
};
