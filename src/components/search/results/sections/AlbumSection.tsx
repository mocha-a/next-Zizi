'use client';
import React from 'react';
import Link from 'next/link';
import { SearchAlbum } from '@/types/deezer/search';
import AlbumCard from '@/components/entities/album/ui/AlbumCard';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import SectionHeader from '../../ui/SectionHeader';
import EmptyState from '@/components/common/EmptyState';

interface Props {
  data: SearchAlbum[];
  loading: boolean;
  query: string;
}

const AlbumSection = ({ data, loading, query }: Props) => {
  return (
    <div className='allReslts allReslts-album'>
      <SectionHeader title="앨범" type="album" />

      {loading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <MediaSkeleton key={`album-skeleton-${i}`} />
        ))
      ) : data.length > 0 ? (
        data.map((album) => (
          <Link key={album.id} href={`/album/${album.id}`}>
            <AlbumCard
              id={album.id}
              title={album.title}
              cover={album.cover_medium}
              record_type={album.record_type}
              artist={album.artist}
            />
          </Link>
        ))
      ) : (
        <EmptyState
          title="💿"
          keyword={query}
          description={`와 \n 일치하는 앨범이 없어 இᯅஇ`}
          className="search-results"
        />
      )}
    </div>
  );
};

export default AlbumSection;