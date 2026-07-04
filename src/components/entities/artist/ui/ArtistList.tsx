'use client';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import ArtistSkeleton from '@/components/loading/item/ArtistSkeleton';
import EmptyState from '@/components/common/EmptyState';
import { Artist } from '@/types/deezer/deezer';
import ArtistCard from './ArtistCard';

interface Props {
  query: string;
  artists: Artist[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onClick: (id: number) => void;
}

const ArtistList = ({ query, artists, loading, hasMore, onLoadMore, onClick }: Props) => {

  if (!artists.length && loading) {
    return (
      <div className="artistTab-container">
        {Array.from({ length: 10 }).map((_, i) => (
          <ArtistSkeleton key={i} />
        ))}
      </div>
    );
  }

  // 검색 결과 없음
  if (!artists.length && !hasMore) {
    return <EmptyState
              title="🎤"
              keyword={query}
              description={`와 \n 일치하는 아티스트가 없어 இᯅஇ`}
              className='search-results'
            />
  }

  return (
    <div className="artistTab-container">
      <InfiniteScroll loadMore={onLoadMore} loading={loading} hasMore={hasMore} >
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

        {/* 무한스크롤 로딩 */}
        {loading && artists.length > 0 && 
          Array.from({ length: 3 }).map((_, i) => (
            <ArtistSkeleton key={`more-${i}`} />
        ))}
        
      </InfiniteScroll>
    </div>
  );
};

export default ArtistList;