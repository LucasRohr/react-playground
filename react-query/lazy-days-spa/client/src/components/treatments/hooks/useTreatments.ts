import { useQuery } from '@tanstack/react-query';

import { Treatment } from '@shared/types';

import type { UseTreatmentsType } from './types';

import { axiosInstance } from '@/axiosInstance';
import { queryKeys } from '@/react-query/constants';

// Get treatments from the server
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export const useTreatments = (): UseTreatmentsType => {
  const { data = [] } = useQuery({
    queryKey: [queryKeys.getTreatments],
    queryFn: getTreatments,
  });

  return {
    treatments: data,
  };
};
