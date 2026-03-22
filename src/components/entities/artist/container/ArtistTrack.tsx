'use client';

import { useRouter } from 'next/navigation';
import TrackList from '@/components/entities/track/ui/TrackList';
import { useQuery } from '@tanstack/react-query';
import { getTop } from '@/lib/api/artist';

interface Props {
  id: string;
}

const ArtistTracks = ({ id }: Props) => {
  const router = useRouter();

  const { data: track, isLoading } = useQuery({
    queryKey: ['artist', id, 'top'],
    queryFn: () => getTop(Number(id)),
    enabled: !!id,
  });

  console.log(track);

  return (
    <TrackList
      tracks={track}
      loading={isLoading}
      hasMore={false}
      onLoadMore={() => {}} // Top Tracks는 추가 로딩 없음
    />
  );
};

export default ArtistTracks;
