import axios from 'axios';
import { AllResults } from '@/types/spotify';

export const fetchSearch = async (
  query: string,
  type?: string,
  limit?: number
): Promise<AllResults> => {
  const { data } = await axios.get('/api/spotify/search', {
    params: { query, type, limit },
  });
  return data;
};
