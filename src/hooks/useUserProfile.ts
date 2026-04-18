import axios from 'axios';
import { Session } from 'next-auth'; // 내부 타입
import { useQuery } from '@tanstack/react-query';
import { UserProfile } from '@/types/user/profile';

const getUserProfile = async () => {
  const { data } = await axios.get<UserProfile>('/api/user/profile');
  return data;
};

export const useUserProfile = (session?: Session | null) => {
  return useQuery({
    queryKey: ['userProfile', session?.user?.id],
    queryFn: getUserProfile,
    enabled: !!session?.user?.id,
  });
};