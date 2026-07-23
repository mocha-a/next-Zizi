'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { sortList } from '@/lib/sort';
import { typeSearch } from '@/lib/api/serach';
import { Album } from '@/types/deezer/deezer';
import { AlbumSortType, AlbumSortOptions } from '@/constants/sort';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import AlbumList from '@/components/entities/album/ui/AlbumList';

const LIMIT = 50;

const SearchAlbums = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';

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
    queryKey: ['SearchAlbum', query],
    queryFn: (page) =>
      typeSearch(query, 'album', LIMIT, page),
    limit: LIMIT,
    enabled: !!query,
  });

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
        onClick={(id) => router.push(`/album/${id}`)}
      />
    </>
  );
};

export default SearchAlbums;
