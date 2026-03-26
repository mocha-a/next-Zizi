import React from 'react';
import AlbumTrackItem from '../ui/AlbumTrackItem'
import { Track } from '@/types/deezer/deezer';

interface Props {
  track: Track[];
}

const AlbumTrack = ({ track }: Props) => {
  console.log(track);
  
  return (
    <ul className="album-track-list">
      {track?.map((track, i) => (
        <AlbumTrackItem
          key={track.id}
          track={track}
          index={i}
        />
      ))}
    </ul>
  )
}

export default AlbumTrack