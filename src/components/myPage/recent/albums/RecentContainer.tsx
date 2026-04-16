import React from 'react';
import { useRouter } from 'next/navigation';
import { RecentView } from '@/types/recent';
import { useRecentDetail } from '@/hooks/useRecentDetail';
import AlbumCard from '@/components/entities/album/ui/AlbumCard';

interface Props{
  album: RecentView;
}

const RecentContainer = ({ album }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useRecentDetail({
    type: album.type,
    targetId: album.targetId,
  });

  console.log(data);

  if (isLoading || !data) return <div>로딩중...</div>;
  
  return (
    <>
      <AlbumCard
        key={data.id}
        id={data.id}
        title={data.title}
        cover={data.cover_medium}
        release_date={data.release_date}
        record_type={data.record_type}
        nb_tracks={data.nb_tracks}
        artist={data.artist}
        onClick={() => router.push(`/album/${data.id}`)}
      />
    </>
  )
}

export default RecentContainer