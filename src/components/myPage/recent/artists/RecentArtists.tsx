import React from 'react'
import { RecentArtist } from '@/types/recent';
import RecentArtistCard from './RecentArtistCard';
import ArtistSkeleton from '@/components/loading/item/ArtistSkeleton';
import EmptyState from '@/components/common/EmptyState';
import CDcase from '@/components/icons/CDcase';

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

  if (items.length === 0) {
    return (
      <EmptyState
        image={<CDcase />}
        title="텅 - ❗"
        description="첫 번째 아티스트를 기다리는 중..."
      />
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