import React from 'react'
import { useRecentDetail } from '@/hooks/useRecentDetail';
import { RecentView } from '@/types/recent';
import TrackItem from '@/components/common/TrackItem';

interface Props{
  track: RecentView;
  index: number;
}

const RecentContainer = ({ track, index }: Props) => {
  const { data, isLoading } = useRecentDetail({
    type: track.type,
    targetId: track.targetId,
  });

  if (isLoading || !data) return <div>로딩중...</div>;

  return (
    <ul className='tracklist'>
      <TrackItem
        key={data.id}
        track={data}
        index={index}
        page=""
      />
    </ul>
  )
}

export default RecentContainer