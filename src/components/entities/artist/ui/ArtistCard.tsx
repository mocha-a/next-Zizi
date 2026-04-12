import React from 'react';
import Image from 'next/image';
import { formatFans } from '@/lib/format';
import Fans from '@/components/icons/Fans';

interface Props {
  name: string;
  imageUrl: string;
  fan?: number;
  level?: {
    label: string;
    src?: string;
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
        {level ? (
          level.src ? (
            /* GIF 이미지가 있는 경우 */
            <Image
              src={level.src} 
              alt={level.label} 
              width={1}
              height={1}// 크기 조절
            />
          ) : (
            /* 일반 텍스트인 경우 */
            <span>{level.label}</span>
          )
        ) : null}
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