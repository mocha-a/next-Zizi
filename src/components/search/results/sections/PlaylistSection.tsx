import React from 'react';
import Link from 'next/link';
import { SearchPlaylist } from '@/types/deezer/search';
import PlaylistCard from '@/components/entities/playlist/ui/PlaylistCard';
import SectionHeader from '../../ui/SectionHeader';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';

interface Props {
  data: SearchPlaylist[];
  loading: boolean;
}

const PlaylistSection = ({ data, loading }: Props) => {
  return (
    <div className='allReslts allReslts-playlist'>
      <SectionHeader title="플레이리스트" targetIndex={4} type="playlist"/>

      {/* 로딩 상태 */}
      {loading &&
        Array.from({ length: 5 }).map((_, i) => (
          <MediaSkeleton key={`album-skeleton-${i}`} />
        ))
      }

      {/* 실제 데이터 */}
      {!loading &&
        data.map((playlist)=>
          <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
            <PlaylistCard
              id={playlist.id}
              picture={playlist.picture_medium}
              title={playlist.title}
              user={playlist.user.name}
              tracks={playlist.nb_tracks}
            />
          </Link>
        )}
    </div>
  )
}

export default PlaylistSection