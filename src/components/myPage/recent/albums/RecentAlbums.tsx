import React from 'react'
import { RecentAlbum } from '@/types/recent';
import RecentAlbumCard from './RecentAlbumCard';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';

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

  return (
    <div className='recent'>
      {items.map(album => (
        <RecentAlbumCard key={album.id} album={album} />
      ))}
    </div>
  )
}

export default RecentAlbums