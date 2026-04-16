import React from 'react'
import { RecentView } from '@/types/recent';
import AlbumItem from './RecentContainer';

interface Props{
  items: RecentView[];
}

const RecentAlbums = ({ items }: Props) => {
  return (
    <>
      {items.map(album => (
        <AlbumItem key={album.id} album={album} />
      ))}
    </>
  )
}

export default RecentAlbums