'use client';

import InfiniteScroll from '@/components/common/InfiniteScroll';
import AlbumCard from './AlbumCard';
import type { SearchAlbum } from '@/types/deezer/search';

interface Props {
  albums: SearchAlbum[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClick: (id: number) => void;
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
            title={album.title}
            cover={album.cover_medium}
            // release_date={album.release_date}
            record_type={album.record_type}
            artist={album.artist}
            onClick={() => onClick(album.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default AlbumList;