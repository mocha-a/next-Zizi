'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { sortBy } from '@/lib/sortBy';
import SortBtn from '@/components/common/SortBtn';
import SortSelect from '@/components/common/SortSelect';
import BottomDialog from '@/components/common/Dialog';
import AlbumList from '@/components/entities/album/ui/AlbumList';
import { Album } from '@/types/spotify';
import { AlbumSortType, AlbumSortOptions } from '@/types/sort';

interface ArtistAlbumsProps {
  id: string;
}

const LIMIT = 50;

const ArtistAlbums = ({ id }: ArtistAlbumsProps) => {
  const [ albums, setAlbums ] = useState<Album[]>([]);
  const [ offset, setOffset ] = useState(0);
  const [ hasMore, setHasMore ] = useState(true);
  const [ loading, setLoading ] = useState(false);

  const [ sortType, setSortType ] = useState<AlbumSortType>(null);
  const [ openSort, setOpenSort ] = useState(false);
  const router = useRouter();

  const fetchAlbums = async (currentOffset: number) => {
  if (loading || !hasMore) return;

  setLoading(true);
  try {
    const res = await axios.get(`/api/spotify/artist/${id}/albums`, {
      params: { limit: LIMIT, offset: currentOffset },
    });

    const { items, total } = res.data;

    setAlbums((prev) =>
      currentOffset === 0 ? items : [...prev, ...items]
    );
    setOffset(currentOffset + LIMIT);
    setHasMore(currentOffset + LIMIT < total);
    } catch (err) {
      console.error('앨범 조회 실패', err);
    } finally {
      setLoading(false);
    }
  };

  // 최초 로드
  useEffect(() => {
    setAlbums([]);
    setOffset(0);
    setHasMore(true);
    fetchAlbums(0);
  }, [id]);

  console.log(albums);
  console.log(offset);

  const sortedAlbums = useMemo(() => {
    if (!sortType) return albums;

    return sortBy(
      albums,
      (album) =>
        sortType === 'name'
          ? album.name
          : new Date(album.release_date).getTime(),
      sortType === 'old' ? 'asc' : 'desc'
    );
  }, [albums, sortType]);

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
        onLoadMore={() => fetchAlbums(offset)}
        onClick={(id) => router.push(`/search/album/${id}`)}
      />
    </>
  );
};

export default ArtistAlbums;
