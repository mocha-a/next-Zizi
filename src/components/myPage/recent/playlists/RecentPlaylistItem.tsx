import React from 'react'
import { useRouter } from 'next/navigation';
import { RecentView } from '@/types/recent';
import { useRecentDetail } from '@/hooks/useRecentDetail';
import PlaylistCard from '@/components/entities/playlist/ui/PlaylistCard';
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
      <div className='recent'>
        <MediaSkeleton />
      </div>
    ); 
  }

  return (
    <div className='recent'>
      <PlaylistCard 
        id={data.id}
        picture={data.picture_medium}
        title={data.title}
        user={data.creator.name}
        tracks={data.nb_tracks}
        onClick={() => router.push(`/playlist/${data.id}`)}
      />
    </div>
  )
}

export default RecentPlaylistCard