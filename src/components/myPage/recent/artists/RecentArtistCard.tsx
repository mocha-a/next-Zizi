import React from 'react'
import { useRouter } from 'next/navigation';
import { RecentArtist } from '@/types/recent';
import ArtistCard from '@/components/entities/artist/ui/ArtistCard';

interface Props{
  artist: RecentArtist;
}

const RecentArtistCard = ({ artist }: Props) => {
  const router = useRouter();
  
  return (
    <ArtistCard
      key={artist.id}
      name={artist.name}
      imageUrl={artist.picture_medium}
      fan={artist.nb_fan}
      level={artist.level}
      showFans={true}
      onClick={() => router.push(`/artist/${artist.id}`)}
    />
  )
}

export default RecentArtistCard