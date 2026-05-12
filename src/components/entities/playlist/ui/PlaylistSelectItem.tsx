'use client';

import React from 'react';
import { DraggableProvided } from '@hello-pangea/dnd';

import { MyPlaylist } from '@/types/user/myPlaylist';
import ThumbnailGrid from '@/components/myPage/myplaylist/ThumbnailGrid';

import '@/styles/entitiesUI/playlistCard.scss';

interface Props {
  playlist: MyPlaylist;
  isSelected: boolean;
  onToggle: () => void;
  dragHandle?: DraggableProvided['dragHandleProps'];
}

const PlaylistSelectItem = ({ playlist, isSelected, onToggle, dragHandle }: Props) => {
  return (
    <li
      className={`playlist-box ${isSelected ? 'selected' : ''}`}
      onClick={onToggle}
    >
      {/* 왼쪽 */}
      <div className="playlist-image">
        <ThumbnailGrid
          thumbnails={playlist.thumbnails || []}
          className="small-thumbnail"
        />
      </div>

      {/* 가운데 */}
      <div className="playlist-info">
        <p>{playlist.title}</p>
        <p>{playlist.user.name}</p>
        <p>{`총 ${playlist.tracks.length} 곡`}</p>
      </div>

      {/* 오른쪽 */}
      <div className="playlist-right">
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
      </div>
    </li>
  );
};

export default PlaylistSelectItem;