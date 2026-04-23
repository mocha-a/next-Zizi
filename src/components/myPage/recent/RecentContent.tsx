import React from 'react'
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useUserProfile } from '@/hooks/useUserProfile';
import { getRecentViews } from '@/lib/api/recent';
import { CategoryType } from '@/types/deezer/search';
import { RecentView } from '@/types/recent';
import { RecentAlbums, RecentTracks, RecentArtists, RecentPlaylists } from '@/components/myPage/recent';

interface Props{
  type: CategoryType;
}

const RecentContent = ({ type }: Props) => {
  const { data: session } = useSession();
  const { data: user } = useUserProfile(session);

  const { data = [] } = useQuery<RecentView[]>({
    queryKey: ['recent', user?.id, type],
    queryFn: () => getRecentViews(type),
    enabled: !!user?.id,
    staleTime: 1000 * 60,
  });
  
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

export default RecentContent;