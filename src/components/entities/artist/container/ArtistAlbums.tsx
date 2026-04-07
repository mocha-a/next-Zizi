'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sortBy } from '@/lib/sortBy';
import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import AlbumList from '@/components/entities/album/ui/AlbumList';
import { getArtistAlbums } from '@/lib/api/artist';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { Album } from '@/types/deezer/deezer';
import { SearchArtist } from '@/types/deezer/search';
import { AlbumSortType, AlbumSortOptions } from '@/types/sort';

interface Props {
  id: string;
  artist: SearchArtist;
}

const LIMIT = 50;

const ArtistAlbums = ({ id, artist }: Props) => {
  const [ sortType, setSortType ] = useState<AlbumSortType>(null);
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
  
  console.log(albums);

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
      <div className='album-filter-bar'>
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
      </div>

      <AlbumList
        albums={sortedAlbums}
        artist={artist}
        loading={isLoading || isFetchingNextPage}
        hasMore={hasNextPage}
        loadMore={loadMore}
        onClick={(id) => router.push(`/search/album/${id}`)}
      />
    </>
  );
};

export default ArtistAlbums;
