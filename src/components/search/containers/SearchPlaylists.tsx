'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/searchStore';
import { sortBy } from '@/lib/sortBy';
import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import PlaylistList from '@/components/entities/playlist/ui/PlaylistList';
import type { PlaylistSortType } from '@/types/sort';

const sortOptions = [
  { label: '가나다 순', value: 'name' },
  { label: '곡 많은 순', value: 'tracks' },
] as const;

const SearchPlaylists = () => {
  const { playlistResults, loadMore, loading, hasMore } = useSearchStore();
  const [sortType, setSortType] = useState<PlaylistSortType>(null);
  const [openSort, setOpenSort] = useState(false);
  const router = useRouter();

  const sortedPlaylists = sortType
    ? sortBy(
        playlistResults,
        (playlist) =>
          sortType === 'name'
            ? playlist.name
            : playlist.tracks.total,
        sortType === 'tracks' ? 'desc' : 'asc'
      )
    : playlistResults;

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
        hasMore={hasMore.playlist}
        onLoadMore={() => loadMore('playlist', 50)}
        onClick={(id) => router.push(`/search/playlist/${id}`)}
      />
    </>
  );
};

export default SearchPlaylists;
