import React from 'react';
import Image from 'next/image';

import '@/styles/myplaylist/thumbnailGrid.scss';

interface Props {
  thumbnails: string[];
  className?: string;
}

const ThumbnailGrid = ({ thumbnails, className }: Props) => {
  const count = Math.min(thumbnails.length, 4);

  // 이미지 없을 때
  if (count === 0) return null;

  // 1~3개는 첫 번째 이미지만 표시
  if (count < 4) {
    return (
      <div className={`collage single ${className || ''}`}>
        <Image
          src={thumbnails[0]}
          alt="thumbnail"
          fill
          className="img"
        />
      </div>
    );
  }

  // 4개일 때만 그리드
  return (
    <div className={`collage collage-4 ${className || ''}`}>
      {thumbnails.slice(0, 4).map((src, i) => (
        <div key={i} className="cell">
          <Image src={src} alt="thumbnail" fill className="img" />
        </div>
      ))}
    </div>
  );
};

export default ThumbnailGrid;