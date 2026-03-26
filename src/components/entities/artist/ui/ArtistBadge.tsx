import { Artist } from '@/types/deezer/deezer';
import Image from 'next/image';
import React from 'react';
import '@/styles/entitiesUI/artistBadge.scss';

interface Props {
  contributors: Artist[];
}

const ArtistBadge = ({ contributors }: Props) => {
  if (!contributors || contributors.length === 0) return null;

  return (
    <div className="artist-badge">
      <div className="artist-badge__avatars">
        {contributors.map((artist, i) => (
          <span
            key={artist.id}
            className="artist-badge-img"
            style={{ zIndex: contributors.length - i }}
            title={artist.name}
          >
            <Image
              src={artist.picture_medium ?? '/imgs/default-artist.png'}
              alt={artist.name}
              width={32}
              height={32}
            />
          </span>
        ))}
      </div>
      <div className="artist-badge__names">
        {contributors.map((artist, i) => (
          <span key={artist.id ?? i} className="artist-item">
            {artist.name}
            {i !== contributors.length - 1 && ', '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArtistBadge;
