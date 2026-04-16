import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { CategoryType } from '@/types/deezer/search';
import { getRecentViews } from '@/lib/api/recent';
import { RecentAlbums, RecentTracks, RecentArtists, RecentPlaylists } from '@/components/myPage/recent';

import { TAG_LIST } from '@/constants/metadata'
import TagSwiper from './TagSwiper';


const RecentSection = () => {
  const [type, setType] = React.useState<CategoryType>('track');

  const { data, isLoading } = useQuery({
    queryKey: ['recent', type],
    queryFn: () => getRecentViews(type),
  });

  console.log(data)

  if (isLoading) return <div>로딩중...</div>;

  return (
    <>
      <TagSwiper tagList={TAG_LIST} onChange={setType}/>

      {type === 'track' && <RecentTracks items={data} />}
      {type === 'album' && <RecentAlbums items={data} />}
      {type === 'artist' && <RecentArtists />}
      {type === 'playlist' && <RecentPlaylists />}
    </>
  )
}

export default RecentSection