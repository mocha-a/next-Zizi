import { Creator } from '@/types/deezer/deezer';
import Image from 'next/image';
import React from 'react'

import '@/styles/entitiesUI/creatorBadge.scss';

interface Props {
  creator: Creator;
}

const CreatorBadge = ({ creator }: Props) => {
  if (!creator) return null;

  return (
     <div className="creator-badge">
      <div className="creator-profile-wrapper">
        <span className="creator-badge-img">
          <Image
            src={creator.picture_medium ?? '/imgs/default-user.png'}
            alt={creator.name}
            width={32}
            height={32}
          />
        </span>
        <span className={`fi fi-${creator.country?.trim().toLowerCase()} country-flag`}></span>
      </div>
      <span className="creator-badge__name">{creator.name}</span>
    </div>
  )
}

export default CreatorBadge