'use client';

import React, { useEffect } from 'react';
import { useSearchStore } from '@/store/searchStore';
import TrackItem from '@/components/common/TrackItem';
import { MapTrack } from '@/types/trackMapper';

const Tracks = () => {
  const { trackResults, fetchSectionIfNeeded } = useSearchStore();

  useEffect(() => {
    fetchSectionIfNeeded('track');
  }, []);

  if (!trackResults) return <div>로딩 중...</div>;

  console.log(trackResults);

  return (
    <div className='track-container tracklist'>
      {trackResults.map((track)=>
        <TrackItem
          key={track.id}
          trackData={MapTrack(track)}
          index={0}
          page=""
        />
      )}
    </div>
  )
}

export default Tracks