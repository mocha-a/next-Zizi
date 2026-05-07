'use client';

import React from 'react';
import Image from 'next/image';
import { DraggableProvided } from '@hello-pangea/dnd';
import { SearchTrack } from '@/types/deezer/search';
import TagBtn from '@/components/common/TagBtn';

import '@/styles/track/trackSelectItem.scss';

interface Props {
  track: SearchTrack;
  isSelected: boolean;
  onToggle: (track: SearchTrack) => void;
  dragHandle?: DraggableProvided['dragHandleProps'];
  mode?: 'select' | 'new';
}

function TrackSelectItem({ track, isSelected, onToggle, mode, dragHandle }: Props) {
  console.log(track);
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
        {mode === 'new' ? (
          <div
            {...dragHandle}
            style={{
              cursor: 'grab',
              padding: '4px',
              userSelect: 'none',
            }}
          >
            ≡
          </div>
        ) : (
          <TagBtn tagbtn="+" className={`${isSelected ? 'active' : ''}`} />
        )}
      </div>
    </li>
  );
}

export default TrackSelectItem;