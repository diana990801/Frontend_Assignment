import { Shelter, DonationStats, DonationPayload } from '@/types';

const API_BASE_URL = 'https://frontend-assignment-api.goodrequest.dev/api/v1';

export const api = {
  getShelters: async (): Promise<Shelter[]> => {
    const response = await fetch(`${API_BASE_URL}/shelters`);
    if (!response.ok) {
      throw new Error('Failed to fetch shelters');
    }
    const data = await response.json();
    // Handle both array and object responses
    return Array.isArray(data) ? data : (data.shelters || []);
  },

  getDonationStats: async (): Promise<DonationStats> => {
    const response = await fetch(`${API_BASE_URL}/shelters/results`);
    if (!response.ok) {
      throw new Error('Failed to fetch donation stats');
    }
    const data = await response.json();
    // Normalize the response to match our DonationStats interface
    return {
      totalAmount: data.totalAmount || data.total_amount || 0,
      donorCount: data.donorCount || data.donor_count || data.count || 0,
      donors: Array.isArray(data.donors) ? data.donors : [],
    };
  },

  submitDonation: async (data: DonationPayload): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/shelters/contribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to submit donation');
    }
  },
};
