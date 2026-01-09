'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/searchStore';
import { sortBy } from '@/lib/sortBy';
import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import AlbumList from '@/components/entities/album/ui/AlbumList';
import type { AlbumSortType } from '@/types/sort';

const sortOptions = [
  { label: '가나다 순', value: 'name' },
  { label: '최신 순', value: 'new' },
  { label: '오래된 순', value: 'old' },
] as const;

const SearchAlbums = () => {
  const { albumResults, loadMore, loading, hasMore } = useSearchStore();
  const [ sortType, setSortType ] = useState<AlbumSortType>(null);
  const [ openSort, setOpenSort ] = useState(false);
  const router = useRouter();

  const sortedAlbums = sortType
    ? sortBy(
        albumResults,
        (album) =>
          sortType === 'name'
            ? album.name
            : new Date(album.release_date).getTime(),
        sortType === 'old' ? 'asc' : 'desc'
      )
    : albumResults;

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

      <AlbumList
        albums={sortedAlbums}
        loading={loading}
        hasMore={hasMore.album}
        onLoadMore={() => loadMore('album', 50)}
        onClick={(id) => router.push(`/search/album/${id}`)}
      />
    </>
  );
};

export default SearchAlbums;
