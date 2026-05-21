import React from 'react';
import AlbumTrackItem from '../ui/AlbumTrackItem'
import { Track } from '@/types/deezer/deezer';
import { formatDuration } from '@/lib/format';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';

interface Props {
  track: Track[];
  duration: number;
  loading: boolean;
}

const AlbumTrackList = ({ track, duration, loading }: Props) => {
  return (
    <div className='album-track'>
      <p className='album-track-summary'>
        <span>{track.length}곡</span>
        <span>{formatDuration(duration)}</span>
      </p>

      {loading ? (
        <ul className="tracklist">
          {Array.from({ length: 8 }).map((_, i) => (
            <TrackSkeleton
              key={i}
              index={i}
            />
          ))}
        </ul>
      ) : (
        <ul className="album-track-list">
          {track?.map((track, i) => (
            <AlbumTrackItem
              key={track.id}
              track={track}
              index={i}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlbumTrackList;