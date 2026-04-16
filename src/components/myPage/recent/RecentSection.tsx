import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { TAG_LIST } from '@/constants/metadata'
import { CategoryType } from '@/types/deezer/search';
import { getRecentViews } from '@/lib/api/recent';

import TagSwiper from './TagSwiper';
import { RecentAlbums, RecentTracks, RecentArtists, RecentPlaylists } from '@/components/myPage/recent';


const RecentSection = () => {
  const [type, setType] = React.useState<CategoryType>('track');

  const { data, isLoading } = useQuery({
    queryKey: ['recent', type],
    queryFn: () => getRecentViews(type),
  });

  if (isLoading) return <div>로딩중...</div>;

  return (
    <>
      <TagSwiper tagList={TAG_LIST} onChange={setType}/>

      {type === 'track' && <RecentTracks items={data} />}
      {type === 'album' && <RecentAlbums items={data} />}
      {type === 'artist' && <RecentArtists items={data} />}
      {type === 'playlist' && <RecentPlaylists items={data} />}
    </>
  )
}

export default RecentSection