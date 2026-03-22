import { Artist } from '@/types/deezer/deezer';
import Image from 'next/image';
import React from 'react';

interface Props {
  contributors: Artist[]; // 항상 배열로 받음
}

const ArtistBadge = ({ contributors }: Props) => {
  if (!contributors || contributors.length === 0) return null;

  return (
    <div className="artist-badge">
      <div>
        {contributors.map((artist, i) => (
          <span
            key={artist.id}
            className="artist-badge-img"
            style={{ zIndex: contributors.length - i }}
            title={artist.role ? `${artist.name} (${artist.role})` : artist.name}
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
      <p className="artist-badge-name">
        {contributors.map(artist => artist.name).join(' • ')}
      </p>
    </div>
  );
};

export default ArtistBadge;