import Image from 'next/image';
import React from 'react';

import '@/styles/entitiesUI/playlistCard.scss';

interface Props {
  id: number;
  picture?: string;
  thumbnail?: React.ReactNode;

  title: string;
  user: string;
  tracks: number;

  isSelected?: boolean;

  onClick?: () => void;
}

const PlaylistCard = ({ id, picture, thumbnail, title, user, tracks, isSelected, onClick }: Props) => {
  return (
    <div
      key={id}
      className={` playlist-box ${isSelected ? 'selected' : ''}`}
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
    </div>
  );
};

export default PlaylistCard;