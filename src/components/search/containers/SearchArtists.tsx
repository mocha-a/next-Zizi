'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/searchStore';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { typeSearch } from '@/lib/search';
import { sortBy } from '@/lib/sortBy';
import { ArtistSortType, ArtistSortOptions } from '@/types/sort';
import { Artist } from '@/types/deezer/deezer';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import ArtistList from '@/components/entities/artist/ui/ArtistList';

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
    queryKey: ['search', 'artist', searchQuery],
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

  const getArtistLevel = (fans: number) => {
    if (fans > 500000)
      return { 
              label: 'World Star👑', 
              src: '/imgs/wolrd-star.gif',
              className: 'world' 
            };
    if (fans > 100000)
      return { label: 'Top Star', className: 'top' };
    if (fans > 10000)
      return { label: 'Popular Star', className: 'popular' };

    return null;
  };

  const artistsWithLevel = sortedArtists.map(artist => ({
    ...artist,
    level: getArtistLevel(artist.nb_fan),
  }));

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
        artists={artistsWithLevel}
        loading={isLoading || isFetchingNextPage}
        hasMore={hasNextPage}
        onLoadMore={loadMore}
        onClick={(id) => router.push(`/search/artist/${id}`)}
      />
    </>
  );
};

export default SearchArtists;