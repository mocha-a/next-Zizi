import React from 'react'
import { RecentView } from '@/types/recent';
import RecentTrackItem from './RecentTrackItem';

interface Props{
  items: RecentView[];
  variant?: 'default' | 'select';
}

const RecentTracks = ({ items, variant = 'default' }: Props) => {
  return (
    <ul className='tracklist recent'>
      {items.map((track, i) => (
        <RecentTrackItem key={track.id} track={track} index={i} variant={variant}/>
      ))}
    </ul>
  )
}

export default RecentTracks