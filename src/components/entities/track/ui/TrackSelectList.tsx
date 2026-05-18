import React from 'react'

import { SearchTrack } from '@/types/deezer/search';
import { useTrackStore } from '@/store/useSelectedTrackStore';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';
import TrackSelectItem from './TrackSelectItem';

interface Props {
  tracks: SearchTrack[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const TrackSelectList = ({ tracks, loading, hasMore, onLoadMore }: Props) => {
  const toggleSelect = useTrackStore(state => state.toggleSelect);
  const selectedIds = useTrackStore(state => state.selectedIds);

  return (
    <div className="trackTab-container tracklist add-tracklist">
      <InfiniteScroll loadMore={onLoadMore} loading={loading} hasMore={hasMore} >
        {/* 첫 로딩 (데이터 없을 때) */}
        {loading && !tracks?.length &&
          Array.from({ length: 10 }).map((_, i) => (
            <TrackSkeleton key={i} index={i} />
          ))}

        {/* 트랙 리스트 */}
        {tracks.map((track, i) => (
          <TrackSelectItem
            key={`${track.id}-${i}`}
            track={track}
            isSelected={selectedIds.includes(track.id)}
            onToggle={toggleSelect}
          />
        ))}

        {/* 무한스크롤 로딩 */}
        {loading && tracks?.length > 0 &&
          Array.from({ length: 3 }).map((_, i) => (
            <TrackSkeleton key={`more-${i}`} index={i} />
          ))}
      </InfiniteScroll>
    </div>
  )
}

export default TrackSelectList