'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { sortList } from '@/lib/sort';
import { typeSearch } from '@/lib/api/serach';
import { Playlist } from '@/types/deezer/deezer';
import { PlaylistSortOptions, type PlaylistSortType } from '@/constants/sort';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import PlaylistList from '@/components/entities/playlist/ui/PlaylistList';


const LIMIT = 50;

const SearchPlaylists = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';

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
    queryKey: ['search', 'playlist', query],
    queryFn: (page) =>
      typeSearch(query, 'playlist', LIMIT, page),
    limit: LIMIT,
    enabled: !!query,
  });

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
        onClick={(id) => router.push(`/playlist/${id}`)}
      />
    </>
  );
};

export default SearchPlaylists;