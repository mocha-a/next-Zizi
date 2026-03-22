'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { typeSearch } from '@/lib/search';
import { sortBy } from '@/lib/sortBy';
import { useSearchStore } from '@/store/searchStore';
import { useInfiniteList } from '@/hooks/useInfiniteList';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import PlaylistList from '@/components/entities/playlist/ui/PlaylistList';


import type { PlaylistSortType } from '@/types/sort';
import { Playlist } from '@/types/deezer/deezer';

const LIMIT = 50;

const sortOptions = [
  { label: '가나다 순', value: 'name' },
  { label: '곡 많은 순', value: 'tracks' },
] as const;

const SearchPlaylists = () => {
  const { searchQuery } = useSearchStore(); // 검색어만 전역에서 사용
  const router = useRouter();

  const [ sortType, setSortType ] = useState<PlaylistSortType>(null); // 정렬 타입
  const [ openSort, setOpenSort ] = useState(false); // 정렬 다이얼로그 상태

  const {
    list: playlists,
    loadMore,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteList<Playlist>({
    queryKey: ['search', 'playlist', searchQuery],
    queryFn: (page) =>
      typeSearch(searchQuery, 'playlist', LIMIT, page),
    limit: LIMIT,
    enabled: !!searchQuery,
  });

  const sortedPlaylists = sortType
    ? sortBy(
        playlists,
        (playlist) =>
          sortType === 'name'
            ? playlist.title
            : playlist.nb_tracks,
        sortType === 'tracks' ? 'desc' : 'asc'
      )
    : playlists;

  const label =
    sortOptions.find((opt) => opt.value === sortType)?.label || '추천순';

  return (
    <>
      <SortBtn label={label} setOpenSort={setOpenSort} />

      <BottomDialog open={openSort} onClose={() => setOpenSort(false)}>
        <SortSelect
          value={sortType}
          options={sortOptions}
          onChange={(v) => {
            setSortType(v);
            setOpenSort(false);
          }}
        />
      </BottomDialog>

      <PlaylistList
        playlists={sortedPlaylists}
        loading={isLoading || isFetchingNextPage}
        hasMore={hasNextPage}
        onLoadMore={loadMore}
        onClick={(id) => router.push(`/search/playlist/${id}`)}
      />
    </>
  );
};

export default SearchPlaylists;