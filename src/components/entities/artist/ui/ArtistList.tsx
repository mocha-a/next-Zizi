'use client';

import InfiniteScroll from '@/components/common/InfiniteScroll';
import ArtistCard from './ArtistCard';
import type { Artist } from '@/types/spotify';

interface props {
  artists: Artist[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClick: (id: string) => void;
}

const ArtistList = ({
  artists,
  loading,
  hasMore,
  onLoadMore,
  onClick,
}: props) => {
  if (!artists.length && loading) return <div>로딩 중...</div>;
  if (!artists.length && !hasMore) return <div>검색 결과 없음</div>;

  return (
    <div className="artistTab-container">
      <InfiniteScroll
        loadMore={onLoadMore}
        loading={loading}
        hasMore={hasMore}
      >
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            imageUrl={artist.images[0]?.url}
            genres={artist.genres}
            popularity={artist.popularity}
            onClick={() => onClick(artist.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ArtistList;
