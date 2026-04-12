'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import AlbumList from '@/components/entities/album/ui/AlbumList';
import { getArtistAlbums } from '@/lib/api/artist';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { Album } from '@/types/deezer/deezer';
import { SearchArtist } from '@/types/deezer/search';
import { AlbumDetailSortType, AlbumDetailSortOptions } from '@/types/sort';
import { sortList } from '@/lib/sort';

interface Props {
  id: string;
  artist?: SearchArtist;
}

const LIMIT = 50;

const ArtistAlbums = ({ id, artist }: Props) => {
  const [ sortType, setSortType ] = useState<AlbumDetailSortType>(null);
  const [ openSort, setOpenSort ] = useState(false);

  const router = useRouter();

  const {
    list: albums,
    loadMore,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteList<Album>({
    queryKey: ['artist', id, 'albums'],
    queryFn: async (pageParam) => {
      const data = await getArtistAlbums({
        id: Number(id),
        limit: LIMIT,
        index: pageParam,
      });
      
      // 훅이 기대하는 { items: T[] } 구조로 반환
      return { items: data }; 
    },
    limit: LIMIT,
    enabled: !!id,
  });

  const sortedAlbums = (() => {
    if (!sortType) return albums;

    switch (sortType) {
      case 'title':
        return sortList(albums, (a) => a.title);

      case 'latest':
        return sortList(
          albums,
          (a) => new Date(a.release_date).getTime(),
          'desc'
        );

      case 'oldest':
        return sortList(
          albums,
          (a) => new Date(a.release_date).getTime()
        );

      case 'fans':
        return sortList(albums, (a) => a.fans, 'desc');

      default:
        return albums;
    }
  })();

  const label =
    AlbumDetailSortOptions.find((opt) => opt.value === sortType)?.label || '추천순';

  if (!artist) return null;

  return (
    <>
      <div className='album-filter-bar'>
        <SortBtn label={label} setOpenSort={setOpenSort} />
        <BottomDialog open={openSort} onClose={() => setOpenSort(false)}>
          <SortSelect
            value={sortType}
            options={AlbumDetailSortOptions}
            onChange={(v) => {
              setSortType(v);
              setOpenSort(false);
            }}
          />
        </BottomDialog>
      </div>

      <AlbumList
        albums={sortedAlbums}
        artist={artist}
        loading={isLoading || isFetchingNextPage}
        hasMore={hasNextPage}
        loadMore={loadMore}
        onClick={(id) => router.push(`/album/${id}`)}
      />
    </>
  );
};

export default ArtistAlbums;
