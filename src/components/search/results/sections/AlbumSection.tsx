'use client';
import React from 'react';
import Link from 'next/link';
import { SearchAlbum } from '@/types/deezer/search';
import AlbumCard from '@/components/entities/album/ui/AlbumCard';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import SectionHeader from '../../ui/SectionHeader';

interface Props {
  data: SearchAlbum[];
  loading: boolean;
}

const AlbumSection = ({ data, loading }: Props) => {
  return (
    <div className='allReslts allReslts-album'>
      <SectionHeader title="앨범" targetIndex={3} type="album" />

      {/* 로딩 상태 */}
      {loading &&
        Array.from({ length: 5 }).map((_, i) => (
          <MediaSkeleton key={`album-skeleton-${i}`} />
        ))
      }

      {/* 실제 데이터 */}
      {!loading &&
        data.map((album) => 
          <Link key={album.id} href={`/album/${album.id}`}>
            <AlbumCard
              id={album.id}
              title={album.title}
              cover={album.cover_medium}
              record_type={album.record_type}
              artist={album.artist}
            />
          </Link>
        )}
    </div>
  );
};

export default AlbumSection;