import React from 'react';
import Image from 'next/image';
import { SearchArtist } from '@/types/deezer/search';

interface props {
  id: number;
  title: string;
  cover: string;
  record_type: string;
  artist: SearchArtist;
  onClick?: () => void;
}

const AlbumCard = ({ id, title, cover, record_type, artist, onClick }: props) => {

  return (
    <div key={id} className='album-box' onClick={onClick}>
      <div className='album-image'>
        <Image
          src={cover || '/placeholder.png'}
          alt={`${title} cover`}
          width={168}
          height={168}
        />
      </div>
      <div className='album-info'>
        <div className='album-top'>
          <p className='album-name'>{title}</p>
          <p className='album-artist-name'>
            {artist.name}
          </p>
        </div>
        <div className='album-release'>
          <span>{record_type}</span>
        </div>
      </div>
    </div>
  )
}

export default AlbumCard