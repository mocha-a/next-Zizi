import React from 'react'
import { useRouter } from 'next/navigation';
import { RecentPlaylist } from '@/types/recent';
import PlaylistCard from '@/components/entities/playlist/ui/playlist/PlaylistCard';

interface Props{
  playlist: RecentPlaylist;
}

const RecentPlaylistCard = ({ playlist }: Props) => {
  const router = useRouter();

  return (
    <PlaylistCard
      picture={playlist.picture_medium}
      title={playlist.title}
      user={playlist.creator?.name}
      tracks={playlist.nb_tracks}
      onClick={() => router.push(`/playlist/${playlist.id}`)}
    />
  )
}

export default RecentPlaylistCard