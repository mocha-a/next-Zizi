import React from 'react'
import { RecentPlaylist } from '@/types/recent';
import RecentPlaylistCard from './RecentPlaylistCard';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';

interface Props{
  items: RecentPlaylist[];
  isLoading?: boolean;
}

const RecentPlaylists = ({ items, isLoading }: Props) => {
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
      {items.map(playlist => (
        <RecentPlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}

export default RecentPlaylists