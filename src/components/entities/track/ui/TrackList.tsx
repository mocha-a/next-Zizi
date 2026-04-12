'use client';

import React from 'react';
import TrackItem from '@/components/common/TrackItem';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import { Track } from '@/types/deezer/deezer';

interface Props {
  tracks: Track[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
} 

const TrackList = ({ tracks, loading, hasMore, onLoadMore }: Props) => {
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
            track={track}
            index={index}
            page=""
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default TrackList;