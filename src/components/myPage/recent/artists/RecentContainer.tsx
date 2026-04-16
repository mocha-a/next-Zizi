import React from 'react'
import { useRouter } from 'next/navigation';
import { RecentView } from '@/types/recent';
import { useRecentDetail } from '@/hooks/useRecentDetail';

import ArtistCard from '@/components/entities/artist/ui/ArtistCard';

interface Props{
  artist: RecentView;
}

const RecentContainer = ({ artist }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useRecentDetail({
    type: artist.type,
    targetId: artist.targetId,
  });

  if (isLoading || !data) return <div>로딩중...</div>;
  
  return (
    <div>
      <ArtistCard
        key={data.id}
        name={data.name}
        imageUrl={data.picture_medium}
        fan={data.nb_fan}
        level={data.level}
        showFans={true}
        onClick={() => router.push(`/artist/${data.id}`)}
      />
    </div>
  )
}

export default RecentContainer