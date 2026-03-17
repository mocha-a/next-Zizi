import Image from 'next/image';
import React from 'react';

interface Props {
  id: number;
  picture: string;
  title: string;
  user: string;
  tracks: number
  onClick?: () => void;
}

const PlaylistCard = ({ id, picture, title, user, tracks, onClick }: Props) => {

  return (
  <div key={id} className='playlist-box' onClick={onClick}>
    <div className='playlist-image'>
      {picture && (
      <Image
        src={picture}
        alt={`${title} cover`}
        width={90}
        height={90}
      />
      )}
    </div>
    <div className='playlist-info'>
      <p>{title}</p>
      <p>{`총 ${tracks} 곡`}</p>
      <p>{user}</p>
    </div>
  </div>
)}

export default PlaylistCard;