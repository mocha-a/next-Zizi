import React from 'react'
import { formatDuration } from '@/lib/format';
import { Track } from '@/types/deezer/deezer';
import TrackItem from '@/components/common/TrackItem';

import '@/styles/playlist/playlist.scss';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';

interface Props {
  track: Track[];
  duration: number;
  isLoading?: boolean;
}

const PlaylistTrackList = ({ track, duration, isLoading }: Props) => {
  return (
    <div className='playlist-track'>
      <div className='playlist-track-summary'>
        <span>{track.length}곡</span>
        <span>{formatDuration(duration)}</span>
      </div>
      <ul className="tracklist">
        {isLoading && !track?.length &&
          Array.from({ length: 10 }).map((_, i) => (
            <TrackSkeleton key={i} index={i}/>
        ))}

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