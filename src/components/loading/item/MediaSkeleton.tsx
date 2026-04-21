import Skeleton from '@mui/material/Skeleton'
import React from 'react'

const MediaSkeleton = () => {
  return (
    <div className="album-box">
      <div className="album-image">
        <Skeleton variant="rectangular" width={90} height={90} />
      </div>

      <div className="album-info">
        <div className="album-name">
          <Skeleton variant="text" width="70%" sx={{ fontSize: '13px' }} />
        </div>

        <div className="album-artist-name">
          <Skeleton variant="text" width="50%" sx={{ fontSize: '10px' }} />
        </div>

        <div className="album-details">
          <Skeleton variant="text" width="60%" sx={{ fontSize: '10px' }} />
        </div>
      </div>
    </div>
  )
}

export default MediaSkeleton