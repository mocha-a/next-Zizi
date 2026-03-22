'use client';

import InfiniteScroll from '@/components/common/InfiniteScroll';
import PlaylistCard from './PlaylistCard';
import { Playlist } from '@/types/deezer/deezer';

interface Props {
  playlists: Playlist[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClick: (id: number) => void;
}

const PlaylistList = ({ playlists, loading, hasMore, onLoadMore, onClick }: Props) => {
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
            picture={playlist.picture_medium}
            title={playlist.title}
            user={playlist.user.name}
            tracks={playlist.nb_tracks}
            onClick={() => onClick(playlist.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PlaylistList;
