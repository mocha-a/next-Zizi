import React from 'react'
import { RecentAlbum } from '@/types/recent';
import RecentAlbumCard from './RecentAlbumCard';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import EmptyState from '@/components/common/EmptyState';
import CDcase from '@/components/icons/CDcase';

interface Props{
  items: RecentAlbum[];
  isLoading?: boolean;
}

const RecentAlbums = ({ items, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className='recent'>
        {Array.from({ length: 10 }).map((_, i) => (
          <MediaSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        image={<CDcase />}
        title="텅 - ❗"
        description="첫 번째 앨범을 기다리는 중..."
      />
    );
  }

  return (
    <div className='recent'>
      {items.map(album => (
        <RecentAlbumCard key={album.id} album={album} />
      ))}
    </div>
  )
}

export default RecentAlbums