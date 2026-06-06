import React from 'react';
import { useRouter } from 'next/navigation';
import { RecentAlbum } from '@/types/recent';
import AlbumCard from '@/components/entities/album/ui/AlbumCard';

interface Props{
  album: RecentAlbum;
}

const RecentAlbumCard = ({ album }: Props) => {
  const router = useRouter();
  
  return (
    <AlbumCard
      id={album.id}
      title={album.title}
      cover={album.cover_medium}
      release_date={album.release_date}
      record_type={album.record_type}
      nb_tracks={album.nb_tracks}
      artist={album.artist}
      onClick={() => router.push(`/album/${album.id}`)}
    />
  )
}

export default RecentAlbumCard