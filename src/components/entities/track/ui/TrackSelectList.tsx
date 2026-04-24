import React from 'react'
import { SearchTrack } from '@/types/deezer/search';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';
import TrackSelectItem from './TrackSelectItem';

interface Props {
  tracks: SearchTrack[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const TrackSelectList = ({
  tracks,
  loading,
  hasMore,
  onLoadMore,
}: Props) => {
  return (
    <div className="trackTab-container tracklist">
      <InfiniteScroll
        loadMore={onLoadMore}
        loading={loading}
        hasMore={hasMore}
      >
        {/* 🔥 첫 로딩 (데이터 없을 때) */}
        {loading && !tracks?.length &&
          Array.from({ length: 10 }).map((_, i) => (
            <TrackSkeleton key={i} index={i} />
          ))}

        {/* 🎵 트랙 리스트 */}
        {tracks.map((track, index) => (
          <TrackSelectItem
            key={track.id}
            track={track}
            index={index}
          />
        ))}

        {/* 🔄 무한스크롤 로딩 */}
        {loading && tracks?.length > 0 &&
          Array.from({ length: 3 }).map((_, i) => (
            <TrackSkeleton key={`more-${i}`} index={i} />
          ))}
      </InfiniteScroll>
    </div>
  )
}

export default TrackSelectList