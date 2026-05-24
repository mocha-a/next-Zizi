import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import PlayBk from '@/components/icons/PlayBk';
import Dot3 from '@/components/icons/Dot3';

interface PropsType {
  index: number;
}

const AlbumTrackSkeleton = ({ index }: PropsType) => {
  return (
    <li className="album-track-item">
      <div className="album-track-left">
        <span className="album-track-num" style={{opacity: "0.3"}}>
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="album-track-center">
        <p><Skeleton variant="rectangular" width={120} height={15} /></p>
        <Skeleton variant="rectangular" width={80} height={13} />
      </div>

      <div className="album-track-right">
        <PlayBk className="icons-play" opacity={0.3} />
        <Dot3 className="icons-dot"  opacity={0.3} />
      </div>
    </li>
  );
};

export default AlbumTrackSkeleton;