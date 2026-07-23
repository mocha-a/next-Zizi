'use client';
import type { SearchArtist } from '@/types/deezer/search';
import type { Album } from '@/types/deezer/deezer';
import InfiniteScroll from '@/components/common/InfiniteScroll';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import AlbumCard from './AlbumCard';
import EmptyState from '@/components/common/EmptyState';

interface Props {
  query: string;
  albums: Album[];
  artist?: SearchArtist;
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  onClick: (id: number) => void;
}

const AlbumList = ({ query, albums, loading, hasMore, loadMore, onClick, artist }: Props) => {

  // 초기 로딩
  if (!albums.length && loading) {
    return (
      <div className="albumTab-container">
        {Array.from({ length: 10 }).map((_, i) => (
          <MediaSkeleton key={`init-${i}`} size={168}/>
        ))}
      </div>
    );
  }

  // 결과 없음
  if (!albums.length && !hasMore) {
    return <EmptyState
              title="💿"
              keyword={query}
              description={`와 \n 일치하는 앨범이 없어 இᯅஇ`}
              className='search-results'
            />
  }

  return (
    <div className="albumTab-container">
      <InfiniteScroll loadMore={loadMore} loading={loading} hasMore={hasMore} >
        {/* 실제 데이터 */}
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            title={album.title}
            cover={album.cover_medium}
            release_date={album.release_date}
            record_type={album.record_type}
            nb_tracks={album.nb_tracks}
            artist={album.artist || artist}
            onClick={() => onClick(album.id)}
          />
        ))}

        {/* 추가 로딩 */}
        {loading && albums.length > 0 &&
          Array.from({ length: 3 }).map((_, i) => (
            <MediaSkeleton key={`more-${i}`} />
          ))
        }
      </InfiniteScroll>
    </div>
  );
};

export default AlbumList;