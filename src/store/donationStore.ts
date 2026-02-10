import { create } from 'zustand';
import { DonationFormData, DonationType } from '@/types';

interface DonationStore {
  formData: Partial<DonationFormData>;
  currentStep: number;
  setFormData: (data: Partial<DonationFormData>) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}

const initialFormData: Partial<DonationFormData> = {
  donationType: DonationType.GENERAL,
  gdprConsent: false,
};

export const useDonationStore = create<DonationStore>((set) => ({
  formData: initialFormData,
  currentStep: 0,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setCurrentStep: (step) => set({ currentStep: step }),
  resetForm: () => set({ formData: initialFormData, currentStep: 0 }),
}));
