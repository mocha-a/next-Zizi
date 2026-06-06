import React from 'react'
import { RecentTrack } from '@/types/recent';
import RecentTrackCard from './RecentTrackCard';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';

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