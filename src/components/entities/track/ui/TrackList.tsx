'use client';

import React from 'react';
import TrackItem from '@/components/common/TrackItem';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import { MapTrack } from '@/types/trackMapper';
import { Track } from '@/types/spotify';

interface TracksProps {
  tracks: Track[];
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
            trackData={MapTrack(track)}
            index={index}
            page=""
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Tracks;