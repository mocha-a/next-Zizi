'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/searchStore';
import { sortBy } from '@/lib/sortBy';
import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import ArtistList from '@/components/entities/artist/ui/ArtistList';
import { ArtistSortType } from '@/types/sort';

const sortOptions = [
  { label: '인기순', value: 'popularity' },
  { label: '가나다 순', value: 'name' },
] as const;

const SearchArtists = () => {
  const { artistResults, loadMore, loading, hasMore } = useSearchStore();
  const [sortType, setSortType] = useState<ArtistSortType>(null);
  const [openSort, setOpenSort] = useState(false);
  const router = useRouter();

  const sortedArtists = sortType
    ? sortBy(
        artistResults,
        (artist) =>
          sortType === 'name' ? artist.name : artist.popularity,
        sortType === 'popularity' ? 'desc' : 'asc'
      )
    : artistResults;

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

      <ArtistList
        artists={sortedArtists}
        loading={loading}
        hasMore={hasMore.artist}
        onLoadMore={() => loadMore('artist', 50)}
        onClick={(id) => router.push(`/search/artist/${id}`)}
      />
    </>
  );
};

export default SearchArtists;
