import React from 'react'
import { RecentView } from '@/types/recent';
import RecentPlaylistItem from './RecentPlaylistItem';

interface Props{
  items: RecentView[];
}

const RecentPlaylists = ({ items }: Props) => {
  return (
    <>
      {items.map(playlist => (
        <RecentPlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </>
  )
}

export default RecentPlaylists