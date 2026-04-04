'use client';

import { useMemo, useState } from 'react';
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
import { AlbumSortType, AlbumSortOptions, RecordFilterOptions, RecordFilterType } from '@/types/sort';

interface Props {
  id: string;
  artist: SearchArtist;
}

const LIMIT = 50;

const ArtistAlbums = ({ id, artist }: Props) => {
  const [ sortType, setSortType ] = useState<AlbumSortType>(null);
  const [ openSort, setOpenSort ] = useState(false);
  const [ openFilter, setOpenFilter ] = useState(false);
  const [ recordFilter, setRecordFilter ] = useState<RecordFilterType>('all');
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

  const sortedAndFilteredAlbums = useMemo(() => {

    const filtered = albums.filter((item) => {
      if (recordFilter === 'all') return true;

      if (recordFilter === 'album') {
        return item.record_type === 'album';
      }

      if (recordFilter === 'single') {
        return item.record_type === 'single' || item.record_type === 'ep';
      }

      if (recordFilter === 'compile') {
        return item.record_type === 'compile';
      }

      return true;
    });

    if (!sortType) return filtered;

    return sortBy(
      filtered,
      (album) =>
        sortType === 'name'
          ? album.title 
          : new Date(album.release_date || 0).getTime(),
      sortType === 'old' ? 'asc' : 'desc'
    );
  }, [albums, sortType, recordFilter]);
  
  const filterLabel = 
    RecordFilterOptions.find((opt) => opt.value === recordFilter)?.label || '전체';

  const label =
    AlbumSortOptions.find((opt) => opt.value === sortType)?.label || '추천순';


  return (
    <>
      <div className='album-filter-bar'>
        {/* <SortBtn label={filterLabel} setOpenSort={setOpenFilter} />
        <BottomDialog open={openFilter} onClose={() => setOpenFilter(false)}>
          <SortSelect
            value={recordFilter}
            options={RecordFilterOptions}
            onChange={(v) => {
              setRecordFilter(v || 'all');
              setOpenFilter(false);
            }}
          />
        </BottomDialog> */}

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
        albums={sortedAndFilteredAlbums}
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
