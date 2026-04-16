import React from 'react'
import { RecentView } from '@/types/recent';
import RecentArtistItem from './RecentArtistItem';

interface Props{
  items: RecentView[];
}

const RecentArtists = ({ items }: Props) => {
  return (
    <>
      {items.map(artist => (
        <RecentArtistItem key={artist.id} artist={artist}/>
      ))}
    </>
  )
}

export default RecentArtists