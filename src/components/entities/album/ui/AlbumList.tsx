'use client';

import InfiniteScroll from '@/components/common/InfiniteScroll';
import AlbumCard from './AlbumCard';
import type { SearchArtist } from '@/types/deezer/search';
import type { Album } from '@/types/deezer/deezer';

interface Props {
  albums: Album[];
  artist?: SearchArtist;
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  onClick: (id: number) => void;
}

const AlbumList = ({ albums, loading, hasMore, loadMore, onClick, artist }: Props) => {
  if (!albums?.length) return <div>로딩 중...</div>;

  return (
    <div className="albumTab-container">
      <InfiniteScroll
        loadMore={loadMore}
        loading={loading}
        hasMore={hasMore}
      >
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            title={album.title}
            cover={album.cover_medium}
            release_date={album.release_date}
            record_type={album.record_type}
            artist={album.artist || artist}
            onClick={() => onClick(album.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default AlbumList;