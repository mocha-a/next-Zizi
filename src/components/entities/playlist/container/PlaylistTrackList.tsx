import React from 'react'

import { formatDuration } from '@/lib/format';
import { Track } from '@/types/deezer/deezer';
import TrackItem from '@/components/common/TrackItem';

interface Props {
  track: Track[];
  duration: number;
}

const PlaylistTrackList = ({ track, duration }: Props) => {
  console.log(track);

  return (
    <div className='playlist-track'>
      <div className='playlist-track-summary'>
        
        <div>
          <span>{track.length}곡</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>
      <ul className="tracklist">
        {track?.map((track, i) => (
          <TrackItem
            key={track.id}
            track={track}
            index={i}
            page={''}
          />
        ))}
      </ul>
    </div>
  )
}

export default PlaylistTrackList