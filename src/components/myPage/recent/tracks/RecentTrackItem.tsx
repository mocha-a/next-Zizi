import React from 'react'
import { useRecentDetail } from '@/hooks/useRecentDetail';
import { RecentView } from '@/types/recent';
import TrackItem from '@/components/common/TrackItem';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';
import TrackSelectItem from '@/components/entities/track/ui/TrackSelectItem';

interface Props{
  track: RecentView;
  index: number;
  variant?: 'default' | 'select';
}

const RecentTrackCard = ({ track, index, variant = 'default' }: Props) => {
  const { data, isLoading } = useRecentDetail({
    type: track.type,
    targetId: track.targetId,
  });

   if (isLoading || !data) {
    return (
      <ul className='tracklist recent'>
        <TrackSkeleton index={index} />
      </ul>
    );
  }

  return (
    <ul className='tracklist recent'>
      {variant === 'select' ? (
        <TrackSelectItem track={data} index={index} />
      ) : (
        <TrackItem track={data} index={index} page="" />
      )}
    </ul>
  )
}

export default RecentTrackCard