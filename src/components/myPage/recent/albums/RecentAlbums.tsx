import React from 'react'
import { RecentView } from '@/types/recent';
import RecentAlbumItem from './RecentAlbumItem';

interface Props{
  items: RecentView[];
}

const RecentAlbums = ({ items }: Props) => {
  return (
    <>
      {items.map(album => (
        <RecentAlbumItem key={album.id} album={album} />
      ))}
    </>
  )
}

export default RecentAlbums