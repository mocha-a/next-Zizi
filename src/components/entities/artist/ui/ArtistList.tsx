'use client';

import InfiniteScroll from '@/components/common/InfiniteScroll';
import ArtistCard from './ArtistCard';
import type { SearchArtist } from '@/types/deezer/search';

interface Props {
  artists: SearchArtist[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClick: (id: string) => void;
}

const ArtistList = ({ artists, loading, hasMore, onLoadMore }: Props) => {
  console.log(artists);
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
            key={artist.id} // React key
            id={artist.id}  // ArtistCard prop
            name={artist.name}
            imageUrl={artist.picture_medium}
            fan={artist.nb_fan}
            onClick={(id) => console.log('clicked', id)}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ArtistList;