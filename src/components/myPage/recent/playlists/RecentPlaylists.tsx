import React from 'react'
import { RecentPlaylist } from '@/types/recent';
import RecentPlaylistCard from './RecentPlaylistCard';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import EmptyState from '@/components/common/EmptyState';
import CDcase from '@/components/icons/CDcase';

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

  if (items.length === 0) {
    return (
      <EmptyState
        image={<CDcase />}
        title="텅 - ❗"
        description="첫 번째 플레이리스트를 기다리는 중..."
      />
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