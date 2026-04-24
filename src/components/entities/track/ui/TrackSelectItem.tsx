'use client';

import React from 'react';
import Image from 'next/image';

import '@/styles/track/trackSelectItem.scss';
import { SearchTrack } from '@/types/deezer/search';

interface Props {
  track: SearchTrack;
  index: number;
}

function TrackSelectItem({ track, index }: Props) {
  return (
    <li className="select-track-item">
      {/* 왼쪽 */}
      <div className="trackitem-left">
        <div className="trackitem-image">
          <Image
            src={track?.album?.cover_medium || '/default.png'}
            alt="album"
            width={45}
            height={45}
          />
        </div>
      </div>

      {/* 가운데 */}
      <div className="trackitem-center">
        <div>
          <p>{track?.title}</p>
          <span>{track?.artist?.name}</span>
        </div>
      </div>

      {/* 오른쪽 (선택 UI) */}
      <div className="trackitem-right">
        <div className="select-circle" />
      </div>
    </li>
  );
}

export default TrackSelectItem;