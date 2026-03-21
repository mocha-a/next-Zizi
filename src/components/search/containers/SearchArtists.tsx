'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { typeSearch } from '@/lib/search';
import { useSearchStore } from '@/store/searchStore';
import { sortBy } from '@/lib/sortBy';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import ArtistList from '@/components/entities/artist/ui/ArtistList';

import { useInfiniteList } from '@/hooks/useInfiniteList';
import { ArtistSortType, ArtistSortOptions } from '@/types/sort';
import { Artist } from '@/types/deezer/deezer';

const LIMIT = 50;

const SearchArtists = () => {
  const { searchQuery } = useSearchStore();
  const router = useRouter();

  // UI 상태 유지
  const [ sortType, setSortType ] = useState<ArtistSortType>(null);
  const [ openSort, setOpenSort ] = useState(false);

  // React Query로 데이터 관리
  const {
    list: artists,
    loadMore,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteList<Artist>({
    queryKey: ['searchArtist', searchQuery],
    queryFn: (page) =>
      typeSearch(searchQuery, 'artist', LIMIT, page),
    limit: LIMIT,
    enabled: !!searchQuery,
  });

  // 기존 정렬 로직 그대로 사용
  const sortedArtists = sortType
    ? sortBy(
        artists,
        (artist) =>
          sortType === 'name'
            ? artist.name
            : artist.nb_fan,
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
        loading={isLoading || isFetchingNextPage}
        hasMore={hasNextPage}
        onLoadMore={loadMore}
        onClick={(id) => router.push(`/search/artist/${id}`)}
      />
    </>
  );
};

export default SearchArtists;