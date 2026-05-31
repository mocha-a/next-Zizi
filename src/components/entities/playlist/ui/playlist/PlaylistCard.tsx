import Image from 'next/image';
import React from 'react';
import { DraggableProvided } from '@hello-pangea/dnd';

import '@/styles/entitiesUI/playlistCard.scss';

interface Props {
  picture?: string;
  thumbnail?: React.ReactNode;

  title: string;
  user: string;
  tracks: number;

  isSelected?: boolean;
  isEditMode?: boolean;

  dragHandle?: DraggableProvided['dragHandleProps'];

  onClick?: () => void;
}

const PlaylistCard = ({ picture, thumbnail, title, user, tracks, isSelected, isEditMode, dragHandle, onClick }: Props) => {
  return (
    <div
      className={`playlist-box ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="playlist-image">
        {thumbnail ? (
          thumbnail
        ) : (
          picture && (
            <Image
              src={picture}
              alt={`${title} cover`}
              width={90}
              height={90}
            />
          )
        )}
      </div>

      <div className="playlist-info">
        <p>{title}</p>
        <p>{user}</p>
        <p>{`총 ${tracks} 곡`}</p>
      </div>

      {isEditMode && (
        <div
          className="playlist-drag-handle"
          {...dragHandle}
        >
          ≡
        </div>
      )}
    </div>
  );
};

export default PlaylistCard;