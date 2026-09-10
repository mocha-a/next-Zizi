import React from 'react';
import Image from 'next/image';
import { formatFans } from '@/lib/format';
import Fans from '@/components/icons/Fans';

import '@/styles/entitiesUI/artistCard.scss'

interface Props {
  name: string;
  imageUrl: string;
  fan?: number;
  level?: {
    label: string;
    className: string;
  } | null;
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
      <div className='artist-box-info'>
        {level && <span className={`artist-level ${level.className}`}>{level.label}</span>}
        <p className='artist-name'>{name}</p>
        {showFans&& 
        <div className='artist-fans'>
          <Fans />
          <p>{formatFans(fan ?? 0)}</p>
        </div>
        }
      </div>
    </div>
  )
}

export default ArtistCard;