'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { sortList } from '@/lib/sort';
import { typeSearch } from '@/lib/api/serach';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { SearchTrack } from '@/types/deezer/search';
import { TrackSortOptions, TrackSortType } from '@/constants/sort';

import TrackList from '@/components/entities/track/ui/TrackList';
import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';

const LIMIT = 50;

const SearchTracks = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';

  const [ sortType, setSortType ] = useState<TrackSortType>(null);
  const [ openSort, setOpenSort ] = useState(false);

  const {
    list: tracks,
    loadMore,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteList<SearchTrack>({
    queryKey: ['search', 'track', query],
    queryFn: (page) =>
      typeSearch(query, 'track', LIMIT, page),
    limit: LIMIT,
    enabled: !!query,
  }); 

  console.log(tracks);
  const sortedTracks = (() => {
    if (!sortType) return tracks;

    switch (sortType) {
      case 'rank':
        return sortList(tracks, (t) => t.rank, 'desc');

      case 'title':
        return sortList(tracks, (t) => t.title);

      case 'artist':
        return sortList(tracks, (t) => t.artist.name);

      case 'duration_asc':
        return sortList(tracks, (t) => t.duration);

      case 'duration_desc':
        return sortList(tracks, (t) => t.duration, 'desc');

      default:
        return tracks;
    }
  })();

  const label =
      TrackSortOptions.find((opt) => opt.value === sortType)?.label || '추천순';

  return (
    <>
      <SortBtn label={label} setOpenSort={setOpenSort} />
      
      <BottomDialog open={openSort} onClose={() => setOpenSort(false)}>
        <SortSelect
          value={sortType}
          options={TrackSortOptions}
          onChange={(v) => {
            setSortType(v);
            setOpenSort(false);
          }}
        />
      </BottomDialog>

      <TrackList
        tracks={sortedTracks}
        loading={isLoading || isFetchingNextPage}
        hasMore={hasNextPage}
        onLoadMore={loadMore}
      />
    </>
  );
};

export default SearchTracks;