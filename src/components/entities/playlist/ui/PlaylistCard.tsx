import Image from 'next/image';
import React from 'react';

interface Props {
  id: string;
  images: { url: string; width: number; height: number }[];
  name: string;
  owner: { 
    display_name: string; 
    id: string; 
    external_urls: { spotify: string } 
  };
  tracks: { 
    href: string; 
    total: number 
  };
  onClick?: () => void;
}

const PlaylistCard = ({ id, name, images, owner, tracks, onClick }: Props) => {
  return (
  <div key={id} className='playlist-box' onClick={onClick}>
    <div className='playlist-image'>
      {images[0]?.url && (
      <Image
        src={images[0].url}
        alt={`${name} cover`}
        width={90}
        height={90}
      />
      )}
    </div>
    <div className='playlist-detail'>
      <p>{name}</p>
      <p>{`총 ${tracks.total} 곡`}</p>
      <p>{owner.display_name}</p>
    </div>
  </div>
)}

export default PlaylistCard;