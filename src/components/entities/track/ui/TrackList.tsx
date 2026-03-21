'use client';

import React from 'react';
import TrackItem from '@/components/common/TrackItem';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import { SearchTrack } from '@/types/deezer/search';

interface TracksProps {
  tracks: SearchTrack[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
} 

const Tracks = ({ tracks, loading, hasMore, onLoadMore }: TracksProps) => {
  if (!tracks?.length) return <div>로딩 중...</div>;

  return (
    <div className="trackTab-container tracklist">
      <InfiniteScroll
        loadMore={onLoadMore}
        loading={loading}
        hasMore={hasMore}
      >
        {tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            trackData={track}
            index={index}
            page=""
            onPlayClick={(track) => console.log('play', track)}
            onMoreClick={(track) => console.log('more', track)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Tracks;