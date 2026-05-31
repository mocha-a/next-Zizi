import React from 'react'
import { useRouter } from 'next/navigation';
import { RecentView } from '@/types/recent';
import { useRecentDetail } from '@/hooks/useRecentDetail';
import PlaylistCard from '@/components/entities/playlist/ui/playlist/PlaylistCard';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';

interface Props{
  playlist: RecentView;
}

const RecentPlaylistCard = ({ playlist }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useRecentDetail({
    type: playlist.type,
    targetId: playlist.targetId,
  });

  if (isLoading || !data) {
    return (
      <MediaSkeleton />
    ); 
  }
  console.log(data);
  return (
    <PlaylistCard
      picture={data.picture_medium}
      title={data.title}
      user={data.creator?.name}
      tracks={data.nb_tracks}
      onClick={() => router.push(`/playlist/${data.id}`)}
    />
  )
}

export default RecentPlaylistCard