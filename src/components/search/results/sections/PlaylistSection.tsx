import React from 'react';
import Link from 'next/link';
import { SearchPlaylist } from '@/types/deezer/search';
import PlaylistCard from '@/components/entities/playlist/ui/playlist/PlaylistCard';
import SectionHeader from '../../ui/SectionHeader';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import EmptyState from '@/components/common/EmptyState';

interface Props {
  data: SearchPlaylist[];
  loading: boolean;
  query: string
}

const PlaylistSection = ({ data, loading, query }: Props) => {
  return (
    <div className='allReslts allReslts-playlist'>
      <SectionHeader title="플레이리스트" type="playlist" />

      {loading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <MediaSkeleton key={`playlist-skeleton-${i}`} />
        ))
      ) : data.length > 0 ? (
        data.map((playlist) => (
          <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
            <PlaylistCard
              picture={playlist.picture_medium}
              title={playlist.title}
              user={playlist.user.name}
              tracks={playlist.nb_tracks}
            />
          </Link>
        ))
      ) : (
        <EmptyState
          title="📋"
          keyword={query}
          description={`와 \n 일치하는 플레이리스트가 없어 இᯅஇ`}
          className="search-results"
        />
      )}
    </div>
  );
};

export default PlaylistSection;