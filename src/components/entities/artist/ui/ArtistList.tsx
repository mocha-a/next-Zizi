'use client';

import InfiniteScroll from '@/components/common/InfiniteScroll';
import ArtistCard from './ArtistCard';
import { Artist } from '@/types/deezer/deezer';

interface Props {
  artists: Artist[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClick: (id: number) => void;
}

const ArtistList = ({ artists, loading, hasMore, onLoadMore, onClick }: Props) => {
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
            imageUrl={artist.picture_medium}
            fan={artist.nb_fan}
            level={artist.level}
            showFans={true}
            onClick={() => onClick(artist.id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ArtistList;