import React from 'react'
import { RecentView } from '@/types/recent';
import RecentContainer from './RecentContainer';

interface Props{
  items: RecentView[];
}

const RecentArtists = ({ items }: Props) => {
  return (
    <>
      {items.map(artist => (
        <RecentContainer key={artist.id} artist={artist}/>
      ))}
    </>
  )
}

export default RecentArtists