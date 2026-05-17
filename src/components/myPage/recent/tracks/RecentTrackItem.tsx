import React from 'react'
import { useRecentDetail } from '@/hooks/useRecentDetail';
import { RecentView } from '@/types/recent';
import TrackItem from '@/components/common/TrackItem';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';
import TrackSelectItem from '@/components/entities/track/ui/TrackSelectItem';
import { useTrackStore } from '@/store/useSelectedTrackStore';

import '@/styles/myPage/myPage.scss';

interface Props{
  track: RecentView;
  index: number;
  variant?: 'default' | 'select';
}

const RecentTrackCard = ({ track, index, variant = 'default' }: Props) => {
  const toggleSelect = useTrackStore(state => state.toggleSelect);
  const selectedIds = useTrackStore(state => state.selectedIds);

  const { data, isLoading } = useRecentDetail({
    type: track.type,
    targetId: track.targetId,
  });

  if (isLoading || !data) {
    return (
      <TrackSkeleton index={index} mode={variant === 'select' ? 'add' : 'default'} />
    );
  }

  return (
    <>
      {variant === 'select' ? (
        <TrackSelectItem
          track={data}
          isSelected={selectedIds.includes(data.id)}
          onToggle={() => toggleSelect(data)}
        />
      ) : (
        <TrackItem track={data} index={index} />
      )}
    </>
  )
}

export default RecentTrackCard;