import React from 'react'
import { RecentView } from '@/types/recent';
import RecentPlaylistCard from './RecentPlaylistCard';

interface Props{
  items: RecentView[];
}

const RecentPlaylists = ({ items }: Props) => {
  return (
    <div className='recent'>
      {items.map(playlist => (
        <RecentPlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}

export default RecentPlaylists