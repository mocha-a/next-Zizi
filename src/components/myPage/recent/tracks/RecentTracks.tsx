import React from 'react'
import { RecentView } from '@/types/recent';
import RecentTrackCard from './RecentTrackCard';

interface Props{
  items: RecentView[];
  variant?: 'default' | 'select';
}

const RecentTracks = ({ items, variant = 'default' }: Props) => {
  return (
    <ul className={`tracklist ${variant === 'default' ? 'recent' : ''}`}>
      {items.map((track, i) => (
        <RecentTrackCard key={track.id} track={track} index={i} variant={variant}/>
      ))}
    </ul>
  )
}

export default RecentTracks