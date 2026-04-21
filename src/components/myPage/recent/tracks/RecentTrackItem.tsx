import React from 'react'
import { useRecentDetail } from '@/hooks/useRecentDetail';
import { RecentView } from '@/types/recent';
import TrackItem from '@/components/common/TrackItem';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';

interface Props{
  track: RecentView;
  index: number;
}

const RecentTrackCard = ({ track, index }: Props) => {
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
      <TrackItem
        key={data.id}
        track={data}
        index={index}
        page=""
      />
    </ul>
  )
}

export default RecentTrackCard