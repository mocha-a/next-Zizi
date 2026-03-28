import React from 'react';
import AlbumTrackItem from '../ui/AlbumTrackItem'
import { Track } from '@/types/deezer/deezer';
import { formatDuration } from '@/lib/format';

interface Props {
  track: Track[];
  duration: number;
}

const AlbumTrackList = ({ track, duration }: Props) => {
  console.log(track);
  
  return (
    <div className='album-track'>
      <p className='album-track-summary'>
        <span>{track.length}곡</span>
        <span>{formatDuration(duration)}</span>
      </p>
      <ul className="album-track-list">
        {track?.map((track, i) => (
          <AlbumTrackItem
            key={track.id}
            track={track}
            index={i}
          />
        ))}
      </ul>
    </div>
  )
}

export default AlbumTrackList;