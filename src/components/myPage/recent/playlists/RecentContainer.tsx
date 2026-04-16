import React from 'react'
import { useRouter } from 'next/navigation';
import { RecentView } from '@/types/recent';
import { useRecentDetail } from '@/hooks/useRecentDetail';
import PlaylistCard from '@/components/entities/playlist/ui/PlaylistCard';

interface Props{
  playlist: RecentView;
}

const RecentContainer = ({ playlist }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useRecentDetail({
    type: playlist.type,
    targetId: playlist.targetId,
  });

  console.log(data);

  if (isLoading || !data) return <div>로딩중...</div>;

  return (
    <>
      <PlaylistCard 
        id={data.id}
        picture={data.picture_medium}
        title={data.title}
        user={data.creator.name}
        tracks={data.nb_tracks}
        onClick={() => router.push(`/playlist/${data.id}`)}
      />
    </>
  )
}

export default RecentContainer