'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchStore } from '@/store/searchStore';
import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import AlbumList from '@/components/entities/album/ui/AlbumList';
import { typeSearch } from '@/lib/api/serach';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { AlbumSortType, AlbumSortOptions } from '@/types/sort';
import { Album } from '@/types/deezer/deezer';
import { sortList } from '@/lib/sortList';

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

  console.log(albums);

  const sortedAlbums = (() => {
    if (!sortType) return albums;

    switch (sortType) {
      case 'title':
        return sortList(albums, (a) => a.title);

      case 'artist':
        return sortList(albums, (a) => a.artist.name);

      case 'tracks_desc':
        return sortList(albums, (a) => a.nb_tracks, 'desc');

      case 'tracks_asc':
        return sortList(albums, (a) => a.nb_tracks);

      default:
        return albums;
    }
  })();

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
        loadMore={loadMore}
        onClick={(id) => router.push(`/search/album/${id}`)}
      />
    </>
  );
};

export default SearchAlbums;
