'use client';

import { typeSearch } from '@/lib/search';
import { useSearchStore } from '@/store/searchStore';

import { SearchTrack } from '@/types/deezer/search';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import Tracks from '@/components/entities/track/ui/TrackList';

const LIMIT = 50;

const SearchTracks = () => {
  const { searchQuery } = useSearchStore(); // 검색어만 전역에서 사용

  const {
    list: tracks,
    loadMore,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteList<SearchTrack>({
    queryKey: ['search', 'track', searchQuery],
    queryFn: (page) =>
      typeSearch(searchQuery, 'track', LIMIT, page),
    limit: LIMIT,
    enabled: !!searchQuery,
  });

  return (
    <Tracks
      tracks={tracks}
      loading={isLoading || isFetchingNextPage}
      hasMore={hasNextPage}
      onLoadMore={loadMore}
    />
  );
};

export default SearchTracks;