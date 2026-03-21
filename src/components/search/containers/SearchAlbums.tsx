'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { typeSearch } from '@/lib/search';
import { useSearchStore } from '@/store/searchStore';
import { sortBy } from '@/lib/sortBy';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import AlbumList from '@/components/entities/album/ui/AlbumList';

import { AlbumSortType, AlbumSortOptions } from '@/types/sort';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { Album } from '@/types/deezer/deezer';

const LIMIT = 50;

const SearchAlbums = () => {
  const { searchQuery } = useSearchStore();
  const router = useRouter();

  const [ sortType, setSortType ] = useState<AlbumSortType>(null);
  const [ openSort, setOpenSort ] = useState(false);

  // React Query로 데이터 관리
  const {
    list: albums,
    loadMore,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteList<Album>({
    queryKey: ['SearchAlbum', searchQuery],
    queryFn: (page) =>
      typeSearch(searchQuery, 'album', LIMIT, page),
    limit: LIMIT,
    enabled: !!searchQuery,
  });
  
  const sortedAlbums = sortType
    ? sortBy(
        albums,
        (album) =>
          sortType === 'name'
            ? album.title
            : new Date(album.release_date).getTime(),
        sortType === 'old' ? 'asc' : 'desc'
      )
    : albums;

  const label =
    AlbumSortOptions.find((opt) => opt.value === sortType)?.label || '추천순';

  return (
    <>
      <SortBtn label={label} setOpenSort={setOpenSort} />

      <BottomDialog open={openSort} onClose={() => setOpenSort(false)}>
        <SortSelect
          value={sortType}
          options={AlbumSortOptions}
          onChange={(v) => {
            setSortType(v);
            setOpenSort(false);
          }}
        />
      </BottomDialog>

      <AlbumList
        albums={sortedAlbums}
        loading={isLoading || isFetchingNextPage}
        hasMore={hasNextPage}
        onLoadMore={loadMore}
        onClick={(id) => router.push(`/search/album/${id}`)}
      />
    </>
  );
};

export default SearchAlbums;
