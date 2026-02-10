// API Types
export interface Shelter {
  id: number;
  name: string;
  address: string;
  city: string;
  region: string;
  contact: {
    email: string;
    phone?: string;
  };
}

export interface Donor {
  firstName?: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface DonationStats {
  totalAmount: number;
  donorCount: number;
  donors: Array<{
    firstName?: string;
    lastName: string;
    amount: number;
    donatedAt: string;
  }>;
}

export enum DonationType {
  GENERAL = 'general',
  SHELTER = 'shelter',
}

export interface DonationFormData {
  donationType: DonationType;
  shelterId?: number;
  amount: number;
  customAmount?: number;
  firstName?: string;
  lastName: string;
  email: string;
  phone: string;
  gdprConsent: boolean;
}

export interface DonationPayload {
  shelterId?: number;
  amount: number;
  firstName?: string;
  lastName: string;
  email: string;
  phone: string;
}

// UI Types
export enum PhonePrefix {
  SK = '+421',
  CZ = '+420',
}

export interface FormStepProps {
  onNext?: () => void;
  onBack?: () => void;
}
