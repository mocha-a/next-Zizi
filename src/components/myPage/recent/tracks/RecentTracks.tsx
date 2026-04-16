import React from 'react'
import { RecentView } from '@/types/recent';
import TrackItem from './RecentContainer';

interface Props{
  items: RecentView[];
}

const RecentTracks = ({ items }: Props) => {
  return (
    <>
      {items.map((track, i) => (
        <TrackItem key={track.id} track={track} index={i}/>
      ))}
    </>
  )
}

export default RecentTracks