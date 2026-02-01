'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { typeSearch } from '@/lib/search';
import { useSearchStore } from '@/store/searchStore';
import { sortBy } from '@/lib/sortBy';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import PlaylistList from '@/components/entities/playlist/ui/PlaylistList';

import type { Playlist } from '@/types/spotify';
import type { PlaylistSortType } from '@/types/sort';

const LIMIT = 50;

const sortOptions = [
  { label: '가나다 순', value: 'name' },
  { label: '곡 많은 순', value: 'tracks' },
] as const;

const SearchPlaylists = () => {
  const { searchQuery } = useSearchStore(); // 검색어만 전역에서 사용
  const router = useRouter();

  const [ playlists, setPlaylists ] = useState<Playlist[]>([]); // 플레이리스트 목록
  const [ offset, setOffset ] = useState(0); // 페이지네이션 offset
  const [ hasMore, setHasMore ] = useState(true); // 더 불러올 데이터 여부
  const [ loading, setLoading ] = useState(false); // 로딩 상태

  const [ sortType, setSortType ] = useState<PlaylistSortType>(null); // 정렬 타입
  const [ openSort, setOpenSort ] = useState(false); // 정렬 다이얼로그 상태

  useEffect(() => {
    if (!searchQuery) return;

    const fetchInitial = async () => {
      setLoading(true);
      const data = await typeSearch(searchQuery, 'playlist', LIMIT, 0);
      const items = data.playlists?.items ?? [];

      setPlaylists(items);
      setOffset(items.length);
      setHasMore(items.length === LIMIT);
      setLoading(false);
    };

    fetchInitial();
  }, [searchQuery]);

  const loadMore = async () => {
    if (!searchQuery || loading || !hasMore) return;

    setLoading(true);
    const data = await typeSearch(searchQuery, 'playlist', LIMIT, offset);
    const items = data.playlists?.items ?? [];

    setPlaylists((prev) => [...prev, ...items]);
    setOffset((prev) => prev + items.length);
    setHasMore(items.length === LIMIT);
    setLoading(false);
  };

  const sortedPlaylists = sortType
    ? sortBy(
        playlists,
        (playlist) =>
          sortType === 'name'
            ? playlist.name
            : playlist.tracks.total,
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
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onClick={(id) => router.push(`/search/playlist/${id}`)}
      />
    </>
  );
};

export default SearchPlaylists;