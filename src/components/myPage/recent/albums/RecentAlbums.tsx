import React from 'react'
import { RecentView } from '@/types/recent';
import RecentAlbumCard from './RecentAlbumCard';

interface Props{
  items: RecentView[];
}

const RecentAlbums = ({ items }: Props) => {
  return (
    <div className='recent'>
      {items.map(album => (
        <RecentAlbumCard key={album.id} album={album} />
      ))}
    </div>
  )
}

export default RecentAlbums