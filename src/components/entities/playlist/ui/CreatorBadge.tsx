import Image from 'next/image';
import React from 'react';
import { BadgeUser } from '@/types/userBadge';

import '@/styles/entitiesUI/creatorBadge.scss';

interface Props {
  creator: BadgeUser | null | undefined;
  KRCode?: string;
}

const CreatorBadge = ({ creator, KRCode }: Props) => {
  if (!creator) return null;

  const name = creator.name || '알 수 없는 사용자';
  const countryCode = (KRCode || creator.country)?.trim().toLowerCase();

  return (
    <div className="creator-badge">
      <div className="creator-profile-wrapper">
        <span className="creator-badge-img">
          <Image
            src={creator.image  || '/imgs/default.png'}
            alt={name}
            width={32}
            height={32}
          />
        </span>

        {countryCode && (
          <span
            className={`fi fi-${countryCode} country-flag`}
          ></span>
        )}
      </div>

      <span className="creator-badge__name">{name}</span>
    </div>
  );
};

export default CreatorBadge;