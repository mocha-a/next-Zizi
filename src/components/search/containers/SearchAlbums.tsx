'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { typeSearch } from '@/lib/search';
import { useSearchStore } from '@/store/searchStore';
import { sortBy } from '@/lib/sortBy';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import AlbumList from '@/components/entities/album/ui/AlbumList';

import { AlbumSortType, AlbumSortOptions } from '@/types/sort';
import { Album } from '@/types/spotify';

const LIMIT = 50;

const SearchAlbums = () => {
  const { searchQuery } = useSearchStore();
  const router = useRouter();

  const [ albums, setAlbums ] = useState<Album[]>([]);
  const [ offset, setOffset ] = useState(0);
  const [ hasMore, setHasMore ] = useState(true);
  const [ loading, setLoading ] = useState(false);

  const [ sortType, setSortType ] = useState<AlbumSortType>(null);
  const [ openSort, setOpenSort ] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchInitial = async () => {
      setLoading(true);
      const data = await typeSearch(searchQuery, 'album', LIMIT, 0);
      const items = data.albums?.items ?? [];

      setAlbums(items);
      setOffset(items.length);
      setHasMore(items.length === LIMIT);
      setLoading(false);
    };

    fetchInitial();
  }, [searchQuery]);

  const loadMore = async () => {
    if (!searchQuery || loading || !hasMore) return;

    setLoading(true);
    const data = await typeSearch(searchQuery, 'album', LIMIT, offset);
    const items = data.albums?.items ?? [];

    setAlbums((prev) => [...prev, ...items]);
    setOffset((prev) => prev + items.length);
    setHasMore(items.length === LIMIT);
    setLoading(false);
  };

  const sortedAlbums = sortType
    ? sortBy(
        albums,
        (album) =>
          sortType === 'name'
            ? album.name
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
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
        onClick={(id) => router.push(`/search/album/${id}`)}
      />
    </>
  );
};

export default SearchAlbums;
