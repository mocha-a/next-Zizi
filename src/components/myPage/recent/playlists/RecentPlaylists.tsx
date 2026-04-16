import React from 'react'
import { RecentView } from '@/types/recent';
import RecentContainer from './RecentContainer';

interface Props{
  items: RecentView[];
}

const RecentPlaylists = ({ items }: Props) => {
  return (
    <>
      {items.map(playlist => (
        <RecentContainer key={playlist.id} playlist={playlist} />
      ))}
    </>
  )
}

export default RecentPlaylists