import React from 'react';
import Image from 'next/image';

interface Props {
  id: number;
  name: string;
  imageUrl: string;
  fan?: number;
  onClick?: () => void;
}


const ArtistCard = ({ name, imageUrl, fan, onClick }: Props) => {
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
        <p>{fan}</p>
        {/* {genres && (
          <p className='artist-genre'>
            {mapGenres(genres)}
          </p>
        )} */}
      </div>
    </div>
  )
}

export default ArtistCard;