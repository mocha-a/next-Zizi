'use client';

import React, { useEffect, useState } from 'react';
import { useSearchStore } from '@/store/searchStore';
import AlbumCard from '../card/AlbumCard';
import SortSelect from '@/components/common/SortSelect';
import { sortBy } from '@/lib/sortBy';
import type { AlbumSortType } from '@/types/sort';


const Albums = () => {
  const { albumResults, fetchSectionIfNeeded } = useSearchStore();
  const [ sortType, setSortType ] = useState<AlbumSortType>(null);

  const albumSortOptions = [
    { label: '가나다 순', value: 'name' },
    { label: '최신 순', value: 'new' },
    { label: '오래된 순', value: 'old' },
  ] as const

  useEffect(() => {
    fetchSectionIfNeeded('album');
  }, []);

  if (!albumResults) return <div>로딩 중...</div>;

  const sortedAlbums = sortType
    ? sortBy(
        albumResults,
        (album) => {
          switch (sortType) {
            case 'name':
              return album.name
            case 'new':
            case 'old':
              return new Date(album.release_date).getTime()
            default:
              return album.name
          }
        },
        sortType === 'old' ? 'asc' : 'desc'
      )
    : albumResults


  return (
    <>
      <SortSelect
        value={sortType}
        options={albumSortOptions}
        onChange={setSortType}
      />
      <div className="album-container">
        {sortedAlbums.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            name={album.name}
            images={album.images}
            release_date={album.release_date}
            album_type={album.album_type}
            artists={album.artists}
          />
        ))}
      </div>
    </>
  );
};

export default Albums;
