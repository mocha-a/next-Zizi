import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getRecentViews } from '@/lib/api/recent';
import { CategoryType } from '@/types/deezer/search';
import { RecentView } from '@/types/recent';
import { RecentAlbums, RecentTracks, RecentArtists, RecentPlaylists } from '@/components/myPage/recent';

interface Props{
  type: CategoryType;
}

const RecentContent = ({ type }: Props) => {
  const { data = [], isLoading } = useQuery<RecentView[]>({
    queryKey: ['recent', type],
    queryFn: () => getRecentViews(type),
    staleTime: 1000 * 60,
  });

  if (isLoading) return <div>로딩중...</div>;

  switch (type) {
    case 'track':
      return <RecentTracks items={data} />;

    case 'album':
      return <RecentAlbums items={data} />;

    case 'artist':
      return <RecentArtists items={data} />;

    case 'playlist':
      return <RecentPlaylists items={data} />;

    default:
      return null;
  }
};
export default RecentContent