'use client';

import InfiniteScroll from '@/components/common/InfiniteScroll';
import AlbumCard from './AlbumCard';
import type { Album } from '@/types/spotify';

interface Props {
  albums: Album[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClick: (id: string) => void;
}

const AlbumList = ({
  albums,
  loading,
  hasMore,
  onLoadMore,
  onClick,
}: Props) => {
  if (!albums?.length) return <div>로딩 중...</div>;

  return (
    <div className="albumTab-container">
      <InfiniteScroll
        loadMore={onLoadMore}
        loading={loading}
        hasMore={hasMore}
      >
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            name={album.name}
            images={album.images}
            release_date={album.release_date}
            album_type={album.album_type}
            artists={album.artists}
            onClick={() => onClick(album.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default AlbumList;