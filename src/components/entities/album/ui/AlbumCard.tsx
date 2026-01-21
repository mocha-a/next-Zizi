import React from 'react';
import Image from 'next/image';

interface props {
  id: string;
  name: string;
  images: { url: string; width: number; height: number }[];
  release_date: string;
  album_type: string;
  artists: { id: string; name: string }[];
  onClick?: () => void;
}

const AlbumCard = ({ id, name, images, release_date, album_type, artists, onClick }: props) => {

  return (
    <div key={id} className='album-box' onClick={onClick}>
      <div className='album-image'>
        <Image
          src={images?.[0]?.url || '/placeholder.png'}
          alt={`${name} cover`}
          width={90}
          height={90}
        />
      </div>
      <div className='album-info'>
        <div className='album-top'>
          <p className='album-name'>{name}</p>
          <p className='album-artist-name'>
            {artists.map(artist => artist.name).join(', ')}
          </p>
        </div>
        <div className='album-release'>
          <span>{release_date.replace(/-/g, ".")}</span>
          <span>{album_type}</span>
        </div>
      </div>
    </div>
  )
}

export default AlbumCard