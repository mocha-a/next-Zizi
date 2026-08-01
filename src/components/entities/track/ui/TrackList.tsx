'use client';

import React from 'react';
import TrackItem from '@/components/common/TrackItem';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';
import EmptyState from '@/components/common/EmptyState';
import { Track } from '@/types/deezer/deezer';

interface Props {
  query: string;
  tracks: Track[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const TrackList = ({ query, tracks, loading, hasMore, onLoadMore }: Props) => {

  // 처음 로딩
  if (!tracks.length && loading) {
    return (
      <div className="trackTab-container tracklist">
        {Array.from({ length: 10 }).map((_, i) => (
          <TrackSkeleton key={i} index={i} />
        ))}
      </div>
    );
  }

  // 검색 결과 없음
  if (!tracks.length && !hasMore) {
    return (
      <EmptyState
        title="🎵"
        keyword={query}
        description={`와 \n 일치하는 트랙이 없어 இᯅஇ`}
        className="search-results"
      />
    );
  }

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

        {/* 무한스크롤 로딩 */}
        {loading &&
          tracks.length > 0 &&
          Array.from({ length: 3 }).map((_, i) => (
            <TrackSkeleton key={`more-${i}`} index={i} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default TrackList;