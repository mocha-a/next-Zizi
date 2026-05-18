import React from 'react'
import { RecentView } from '@/types/recent';
import RecentArtistCard from './RecentArtistCard';

interface Props{
  items: RecentView[];
}

const RecentArtists = ({ items }: Props) => {
  return (
    <div className='recent'>
      {items.map(artist => (
        <RecentArtistCard key={artist.id} artist={artist}/>
      ))}
    </div>
  )
}

export default RecentArtists