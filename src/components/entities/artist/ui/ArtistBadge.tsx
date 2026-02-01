import { ArtistWithImage } from '@/types/spotify';
import Image from 'next/image';
import React from 'react';

interface Props {
  artists: ArtistWithImage[];
}

const ArtistBadge = ({ artists }: Props) => {
  return (
  <div className="artist-badge">
    <div>
      {artists.map((artist, i) => (
        <span key={artist.id} className="artist-badge-img" style={{ zIndex: artists.length - i }}>
          <Image
          src={artist.images?.[0]?.url ?? '/imgs/default-artist.png'}
          alt={artist.name}
          width={32}
          height={32}
          />
        </span>
      ))}
    </div>
    <p className="artist-badge-name">
      {artists.map(artist => artist.name).join(' • ')}
    </p>
    </div>
  )
}

export default ArtistBadge