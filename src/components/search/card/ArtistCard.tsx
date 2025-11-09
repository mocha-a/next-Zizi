import React from 'react'
import Image from 'next/image'

interface Props {
  name: string;
  imageUrl?: string;
}

const ArtistCard = ({ name, imageUrl }: Props) => {
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
    <p className='artist-name'>{name}</p>
    </div>
  )
}

export default ArtistCard