import Skeleton from '@mui/material/Skeleton'
import React from 'react'

interface Props {
  size?: number;
}

const MediaSkeleton = ({ size = 90 }: Props) => {
  return (
    <div className="album-box playlist-box">
      <div className="album-image">
        <Skeleton variant="rectangular" width={size} height={size} />
      </div>

      <div className="album-info">
        <div className="album-name">
          <Skeleton variant="rectangular" width="80%" height={15} />
        </div>

        <div className="album-artist-name">
          <Skeleton variant="rectangular" width="50%" height={12} />
        </div>

        <div className="album-details">
          <Skeleton variant="rectangular" width="60%" height={12} />
        </div>
      </div>
    </div>
  )
}

export default MediaSkeleton