import React from 'react';
import Image from 'next/image';
import { formatFans } from '@/lib/formatFans';

interface Props {
  name: string;
  imageUrl: string;
  fan?: number;
  level?: string;
  showFans: boolean;
  onClick?: () => void;
}


const ArtistCard = ({ name, imageUrl, fan, level, showFans, onClick }: Props) => {
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
        {level&& <p>{level}</p>}
        <p className='artist-name'>{name}</p>
        {showFans&& <p>{formatFans(fan ?? 0)}</p>}
      </div>
    </div>
  )
}

export default ArtistCard;