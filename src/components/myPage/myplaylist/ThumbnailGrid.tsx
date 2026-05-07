import React from 'react';
import Image from 'next/image';

import '@/styles/myplaylist/thumbnailGrid.scss';

interface Props {
  thumbnails: string[];
}

const ThumbnailGrid = ({ thumbnails }: Props) => {
  const count = Math.min(thumbnails.length, 4);

  // 2개
  if (count === 2) {
    return (
      <div className="collage collage-2">
        <Image
          src={thumbnails[0]}
          alt="thumbnail"
          fill
          className="img left"
        />
        <Image
          src={thumbnails[1]}
          alt="thumbnail"
          fill
          className="img right"
        />
      </div>
    );
  }

  // 3개
  if (count === 3) {
    return (
      <div className="collage collage-3">
        <div className="big">
          <Image src={thumbnails[0]} alt="thumbnail" fill className="img" />
        </div>

        <div className="small">
          <div>
            <Image src={thumbnails[1]} alt="thumbnail" fill className="img" />
          </div>
          <div>
            <Image src={thumbnails[2]} alt="thumbnail" fill className="img" />
          </div>
        </div>
      </div>
    );
  }

  // 4개
  return (
    <div className="collage collage-4">
      {thumbnails.slice(0, 4).map((src, i) => (
        <div key={i} className="cell">
          <Image src={src} alt="thumbnail" fill className="img" />
        </div>
      ))}
    </div>
  );
};

export default ThumbnailGrid;