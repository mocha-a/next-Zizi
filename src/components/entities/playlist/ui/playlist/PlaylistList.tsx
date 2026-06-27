'use client';
import { Playlist } from '@/types/deezer/deezer';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import PlaylistCard from './PlaylistCard';
import EmptyState from '@/components/common/EmptyState';

interface Props {
  query: string;
  playlists: Playlist[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClick: (id: number) => void;
}

const PlaylistList = ({ query, playlists, loading, hasMore, onLoadMore, onClick }: Props) => {
  // 초기 로딩
  if (!playlists.length && loading) {
    return (
      <div className="playlistTab-container">
        {Array.from({ length: 10 }).map((_, i) => (
          <MediaSkeleton key={`init-${i}`} />
        ))}
      </div>
    );
  }

  // 검색 결과 없음
  if (!playlists.length && !hasMore) {
  return <EmptyState
            title="📋"
            keyword={query}
            description={`와 \n 일치하는 플레이리스트가 없어 இᯅஇ`}
            className="search-results"
          />
  }

  return (
    <div className="playlistTab-container">
      <InfiniteScroll loadMore={onLoadMore} loading={loading} hasMore={hasMore} >
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            picture={playlist.picture_medium}
            title={playlist.title}
            user={playlist.user.name}
            tracks={playlist.nb_tracks}
            onClick={() => onClick(playlist.id)}
          />
        ))}

        {/* 추가 로딩 */}
        {loading && playlists.length > 0 &&
          Array.from({ length: 3 }).map((_, i) => (
            <MediaSkeleton key={`more-${i}`} />
          ))
        }
      </InfiniteScroll>
    </div>
  );
};

export default PlaylistList;
