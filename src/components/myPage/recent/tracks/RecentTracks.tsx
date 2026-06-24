import React from 'react'
import { RecentTrack } from '@/types/recent';
import RecentTrackCard from './RecentTrackCard';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';
import EmptyState from '@/components/common/EmptyState';
import CDcase from '@/components/icons/CDcase';

interface Props{
  items: RecentTrack[];
  variant?: 'default' | 'select';
  isLoading?: boolean;
}

const RecentTracks = ({ items, variant = 'default', isLoading }: Props) => {
  if (isLoading) {
    return (
      <ul className={`tracklist ${variant === 'default' ? 'recent' : ''}`}>
        {Array.from({ length: 10 }).map((_, i) => (
          <TrackSkeleton key={i} index={i} />
        ))}
      </ul>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        image={<CDcase />}
        title="텅 - ❗"
        description="첫 번째 플레이를 기다리는 중..."
      />
    );
  }

  return (
    <ul className={`tracklist ${variant === 'default' ? 'recent' : ''}`}>
      {items.map((track, i) => (
        <RecentTrackCard
          key={track.id}
          track={track}
          index={i}
          variant={variant}
        />
      ))}
    </ul>
  );
};

export default RecentTracks