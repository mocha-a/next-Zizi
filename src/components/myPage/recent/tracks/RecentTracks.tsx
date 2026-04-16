import React from 'react'
import { RecentView } from '@/types/recent';
import RecentTrackItem from './RecentTrackItem';

interface Props{
  items: RecentView[];
}

const RecentTracks = ({ items }: Props) => {
  return (
    <>
      {items.map((track, i) => (
        <RecentTrackItem key={track.id} track={track} index={i}/>
      ))}
    </>
  )
}

export default RecentTracks