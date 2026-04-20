import React from 'react'
import Skeleton from '@mui/material/Skeleton';

interface Props{
  page?: string;
}

const TrackSkeleton = ({ page }: Props) => {
  return (
    <li>
      {/* 좌측 */}
      <div className="trackitem-left">
        {page === 'home' && (
          <Skeleton variant="text" width={20} height={20} />
        )}

        <div className="trackitem-image">
          <Skeleton variant="rounded" width={45} height={45} />
        </div>
      </div>

      {/* 중앙 */}
      <div className="trackitem-center">
        {page === 'chart' && (
          <Skeleton variant="text" width={20} height={20} />
        )}

        <div>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={80} height={15} />
        </div>
      </div>
    </li>
  )
}

export default TrackSkeleton