import React from 'react'
import { RecentTrack } from '@/types/recent';
import TrackItem from '@/components/common/TrackItem';
import TrackSelectItem from '@/components/entities/track/ui/TrackSelectItem';
import { useTrackStore } from '@/store/useSelectedTrackStore';

import '@/styles/myPage/myPage.scss';

interface Props{
  track: RecentTrack;
  index: number;
  variant?: 'default' | 'select';
}

const RecentTrackCard = ({ track, index, variant = 'default' }: Props) => {
  const toggleSelect = useTrackStore(state => state.toggleSelect);
  const selectedIds = useTrackStore(state => state.selectedIds);

  return (
    <>
      {variant === 'select' ? (
        <TrackSelectItem
          track={track}
          isSelected={selectedIds.includes(track.id)}
          onToggle={() => toggleSelect(track)}
        />
      ) : (
        <TrackItem
          track={track}
          index={index}
        />
      )}
    </>
  );
};

export default RecentTrackCard;