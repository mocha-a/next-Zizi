import React from 'react';
import AlbumTrackItem from '../ui/AlbumTrackItem'

interface Props {
  album?: {
    tracks: {
      items: {
        id: string;
        name: string;
        artists: { name: string }[];
      }[];
    };
  } | null;
}

const AlbumTrack = ({ album }: Props) => {
  const items = album?.tracks.items ?? [];
  return (
    <ul className="album-track-list">
      {items.map((track, i) => (
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