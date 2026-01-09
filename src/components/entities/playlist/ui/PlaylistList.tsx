'use client';

import InfiniteScroll from '@/components/common/InfiniteScroll';
import PlaylistCard from './PlaylistCard';
import type { Playlist } from '@/types/spotify';

interface PlaylistListProps {
  playlists: Playlist[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClick: (id: string) => void;
}

const PlaylistList = ({
  playlists,
  loading,
  hasMore,
  onLoadMore,
  onClick,
}: PlaylistListProps) => {
  if (!playlists.length && loading) {
    return <div>로딩 중...</div>;
  }

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
            images={playlist.images}
            name={playlist.name}
            owner={playlist.owner}
            tracks={playlist.tracks}
            onClick={() => onClick(playlist.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PlaylistList;
