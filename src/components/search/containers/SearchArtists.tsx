'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { typeSearch } from '@/lib/search';
import { useSearchStore } from '@/store/searchStore';
import { sortBy } from '@/lib/sortBy';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import ArtistList from '@/components/entities/artist/ui/ArtistList';

import { ArtistSortType, ArtistSortOptions } from '@/types/sort';
import { Artist } from '@/types/spotify';

const LIMIT = 50;

const SearchArtists = () => {
  const { searchQuery } = useSearchStore(); // 검색어만 전역에서 사용
  const router = useRouter();

  const [ artists, setArtists ] = useState<Artist[]>([]); // 아티스트 목록
  const [ offset, setOffset ] = useState(0); // 페이지네이션 offset
  const [ hasMore, setHasMore ] = useState(true); // 더 불러올 데이터 여부
  const [ loading, setLoading ] = useState(false); // 로딩 상태

  const [ sortType, setSortType ] = useState<ArtistSortType>(null); // 정렬 타입
  const [ openSort, setOpenSort ] = useState(false); // 정렬 다이얼로그 상태

  useEffect(() => {
    if (!searchQuery) return;

    const fetchInitial = async () => {
      setLoading(true);
      const data = await typeSearch(searchQuery, 'artist', LIMIT, 0);
      const items = data.artists?.items ?? [];

      setArtists(items);
      setOffset(items.length);
      setHasMore(items.length === LIMIT);
      setLoading(false);
    };

    fetchInitial();
  }, [searchQuery]);

  const loadMore = async () => {
    if (!searchQuery || loading || !hasMore) return;

    setLoading(true);
    const data = await typeSearch(searchQuery, 'artist', LIMIT, offset);
    const items = data.artists?.items ?? [];

    setArtists((prev) => [...prev, ...items]);
    setOffset((prev) => prev + items.length);
    setHasMore(items.length === LIMIT);
    setLoading(false);
  };

  const sortedArtists = sortType
    ? sortBy(
        artists,
        (artist) =>
          sortType === 'name'
            ? artist.name
            : artist.popularity,
        sortType === 'popularity' ? 'desc' : 'asc'
      )
    : artists;

  const label =
    ArtistSortOptions.find((opt) => opt.value === sortType)?.label || '추천순';

  return (
    <>
      <SortBtn label={label} setOpenSort={setOpenSort} />

      <BottomDialog open={openSort} onClose={() => setOpenSort(false)}>
        <SortSelect
          value={sortType}
          options={ArtistSortOptions}
          onChange={(v) => {
            setSortType(v);
            setOpenSort(false);
          }}
        />
      </BottomDialog>

      <ArtistList
        artists={sortedArtists}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onClick={(id) => router.push(`/search/artist/${id}`)}
      />
    </>
  );
};

export default SearchArtists;