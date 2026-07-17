'use client';

import { useQuery } from '@tanstack/react-query';
import TrackList from '@/components/entities/track/ui/TrackList';
import { getTop } from '@/lib/api/artist';
import { typeSearch } from '@/lib/api/serach';
import { SearchTrack } from '@/types/deezer/search';

interface Props {
  id: string;
  name: string;
}

const ArtistTracks = ({ id, name }: Props) => {
  const { data: topTracks = [], isLoading: topLoading } = useQuery({
    queryKey: ['artist', id, 'top'],
    queryFn: () => getTop(Number(id)),
    enabled: !!id,
  });

  const { data: searchResult, isLoading: searchLoading } = useQuery({
    queryKey: ['artist', name, 'track-search'],
    queryFn: () => typeSearch(name, 'track'),
    enabled: !!name && topTracks.length === 0,
  });

  const tracks =
    topTracks.length > 0
      ? topTracks
      : (searchResult?.items.filter(
          (track: SearchTrack) => track.artist.id === Number(id),
        ) ?? []);

  return (
    <div className="artistTrack-contauiner">
      {topTracks.length === 0 &&
        <div className='artistTrack-info'>
          <p className='quote'>어떤 곡이든 다 명곡이니까,</p>
          <p>{name}의 전체 트랙을 지금 바로 만나보자 ! (｡•̀ᴗ-)✧</p>
        </div>
      }
      <TrackList
        tracks={tracks}
        loading={topLoading || searchLoading}
        hasMore={false}
        onLoadMore={() => {}}
      />
    </div>
  );
};

export default ArtistTracks;