import React from 'react'
import Image from 'next/image'

interface Props {
  name: string;
  imageUrl?: string;
  genres?: string[];
  popularity?: number;
}

const ArtistCard = ({ name, imageUrl, genres, popularity }: Props) => {
  return (
    <div className='artist-box'>
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
        {genres && genres.length > 0 && <p>{genres.join(', ')}</p>}
        {popularity !== undefined && <p className='heart'>{popularity}%</p>}
      </div>
    </div>
  )
}

export default ArtistCard