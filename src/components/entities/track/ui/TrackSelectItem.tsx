'use client';

import React from 'react';
import Image from 'next/image';
import { SearchTrack } from '@/types/deezer/search';

import '@/styles/track/trackSelectItem.scss';
import TagBtn from '@/components/common/TagBtn';

interface Props {
  track: SearchTrack;
  index: number;
  isSelected: boolean;
  onToggle: (track: SearchTrack) => void;
}

function TrackSelectItem({ track, isSelected, onToggle }: Props) {
  return (
    <li
      className={`select-track-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onToggle(track)}
    >
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
        <TagBtn tagbtn='+' className={`${isSelected ? 'active' : ''}`}/>
      </div>
    </li>
  );
}

export default TrackSelectItem;