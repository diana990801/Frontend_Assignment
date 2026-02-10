'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { DonationPayload } from '@/types';

export const useShelters = () => {
  return useQuery({
    queryKey: ['shelters'],
    queryFn: api.getShelters,
  });
};

export const useDonationStats = () => {
  return useQuery({
    queryKey: ['donationStats'],
    queryFn: api.getDonationStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useDonation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DonationPayload) => api.submitDonation(data),
    onSuccess: () => {
      // Invalidate and refetch donation stats after successful donation
      queryClient.invalidateQueries({ queryKey: ['donationStats'] });
    },
  });
};
