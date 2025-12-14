import React from 'react'
import Image from 'next/image'

interface Props {
  id: string;
  name: string;
  images: { url: string; width: number; height: number }[];
  release_date: string;
  album_type: string;
  artists: { id: string; name: string }[];
}

const AlbumCard = ({ id, name, images, release_date, album_type, artists }: Props) => {

  return (
    <div key={id} className='album-box'>
      <div className='album-image'>
        <Image
          src={images?.[0]?.url || '/placeholder.png'}
          alt={`${name} cover`}
          width={90}
          height={90}
        />
      </div>
      <div className='album-detail'>
        <div className='album-top'>
          <p className='album-name'>{name}</p>
          <p className='albumA-name'>
            {artists.map(artist => artist.name).join(', ')}
          </p>
        </div>
        <div className='album-bottom'>
          <span>{release_date.replace(/-/g, ".")}</span>
          <span>{album_type}</span>
        </div>
      </div>
    </div>
  )
}

export default AlbumCard