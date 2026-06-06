import React from 'react'
import { RecentArtist } from '@/types/recent';
import RecentArtistCard from './RecentArtistCard';
import ArtistSkeleton from '@/components/loading/item/ArtistSkeleton';

interface Props{
  items: RecentArtist[];
  isLoading?: boolean;
}

const RecentArtists = ({ items, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className='recent'>
        {Array.from({ length: 10 }).map((_, i) => (
          <ArtistSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className='recent'>
      {items.map(artist => (
        <RecentArtistCard key={artist.id} artist={artist}/>
      ))}
    </div>
  )
}

export default RecentArtists