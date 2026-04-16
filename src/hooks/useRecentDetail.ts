import { useQuery } from '@tanstack/react-query';
import { getDetailByType } from '@/lib/api/recent';

type Type = 'album' | 'track' | 'artist' | 'playlist';

const normalizeType = (type: string): Type =>
  type.toLowerCase() as Type;

interface Props {
  type: string;
  targetId: string;
}

export const useRecentDetail = ({ type, targetId }: Props) => {
  console.log(targetId);
  return useQuery({
    queryKey: ['recent-detail', type, targetId],
    queryFn: () => getDetailByType(normalizeType(type), targetId),
    enabled: !!targetId,
  });
};