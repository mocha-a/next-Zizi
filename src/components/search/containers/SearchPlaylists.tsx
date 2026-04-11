'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { typeSearch } from '@/lib/search';
import { useSearchStore } from '@/store/searchStore';
import { useInfiniteList } from '@/hooks/useInfiniteList';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import PlaylistList from '@/components/entities/playlist/ui/PlaylistList';


import { PlaylistSortOptions, type PlaylistSortType } from '@/types/sort';
import { Playlist } from '@/types/deezer/deezer';
import { sortList } from '@/lib/sortList';

const LIMIT = 50;

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

  console.log(playlists);

  const sortedPlaylists = (() => {
    if (!sortType) return playlists;

    switch (sortType) {
      case 'title':
        return sortList(playlists, (p) => p.title);

      case 'tracks_desc':
        return sortList(playlists, (p) => p.nb_tracks, 'desc');

      case 'tracks_asc':
        return sortList(playlists, (p) => p.nb_tracks);

      case 'updated':
        return sortList(
          playlists,
          (p) => new Date(p.mod_date).getTime(),
          'desc'
        );

      case 'oldest':
        return sortList(
          playlists,
          (p) => new Date(p.creation_date).getTime()
        );

      default:
        return playlists;
    }
  })();

  const label =
    PlaylistSortOptions.find((opt) => opt.value === sortType)?.label || '추천순';

  return (
    <>
      <SortBtn label={label} setOpenSort={setOpenSort} />

      <BottomDialog open={openSort} onClose={() => setOpenSort(false)}>
        <SortSelect
          value={sortType}
          options={PlaylistSortOptions}
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