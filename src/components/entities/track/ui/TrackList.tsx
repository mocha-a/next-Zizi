'use client';
import React from 'react';
import TrackItem from '@/components/common/TrackItem';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import { Track } from '@/types/deezer/deezer';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';

interface Props {
  tracks: Track[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
} 

const TrackList = ({ tracks, loading, hasMore, onLoadMore }: Props) => {
  return (
    <div className="trackTab-container tracklist">
      <InfiniteScroll
        loadMore={onLoadMore}
        loading={loading}
        hasMore={hasMore}
      >
        {/* 처음 로딩 + 데이터 없음 */}
        {loading && !tracks?.length &&
          Array.from({ length: 10 }).map((_, i) => (
            <TrackSkeleton key={i} index={i}/>
          ))}

        {tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            page=""
          />
        ))}

        {/* 무한스크롤 로딩 */}
        {loading && tracks?.length > 0 &&
          Array.from({ length: 3 }).map((_, i) => (
            <TrackSkeleton key={`more-${i}`} index={i}/>
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default TrackList;