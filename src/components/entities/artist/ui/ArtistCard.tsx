import React from 'react';
import Image from 'next/image';
import { mapGenres } from '@/types/spotify';

interface Props {
  name: string;
  imageUrl?: string;
  genres?: string[];
  popularity?: number;
  onClick?: () => void;
}


const ArtistCard = ({ name, imageUrl, genres, onClick }: Props) => {
  return (
    <div className='artist-box' onClick={onClick}>
      <div className='artist-image'>
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={name}
          width={98}
          height={98}
        />
      </div>
      <div>
        <p className='artist-name'>{name}</p>
        {genres && (
          <p className='artist-genre'>
            {mapGenres(genres)}
          </p>
        )}
      </div>
    </div>
  )
}

export default ArtistCard;