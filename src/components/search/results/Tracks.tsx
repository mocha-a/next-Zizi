'use client';

import React, { useEffect } from 'react';
import { useSearchStore } from '@/store/searchStore';
import TrackItem from '@/components/common/TrackItem';
import { MapTrack } from '@/types/trackMapper';
import InfiniteScroll from '../InfiniteScroll';

const Tracks = () => {
  const { trackResults, fetchSectionIfNeeded } = useSearchStore();

  useEffect(() => {
    fetchSectionIfNeeded('track');
  }, []);

  if (!trackResults) return <div>로딩 중...</div>;

  return (
    <div className='track-container tracklist'>
      <InfiniteScroll type="track">
      {trackResults.map((track)=>
        <TrackItem
          key={track.id}
          trackData={MapTrack(track)}
          index={0}
          page=""
        />
      )}
      </InfiniteScroll>
    </div>
  )
}

export default Tracks