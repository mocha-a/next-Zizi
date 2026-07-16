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
    <div>
      {topTracks.length === 0 &&
        <p>인기곡 정보를 제공하지 않아, 우리 아티스트의 곡을 만나봐! ( ^_- ) ☆</p>
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