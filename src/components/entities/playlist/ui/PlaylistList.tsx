'use client';
import { Playlist } from '@/types/deezer/deezer';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import PlaylistCard from './PlaylistCard';

interface Props {
  playlists: Playlist[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClick: (id: number) => void;
}

const PlaylistList = ({ playlists, loading, hasMore, onLoadMore, onClick }: Props) => {
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
    return <div>검색 결과 없음</div>;
  }

  return (
    <div className="playlistTab-container">
      <InfiniteScroll
        loadMore={onLoadMore}
        loading={loading}
        hasMore={hasMore}
      >
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
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
