import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface Props {
  showSubText?: boolean;
  width?: string | number;
}

const ArtistSkeleton = ({ showSubText = true, width = '50%' }: Props) => {
  return (
    <div className='artist-box'>
      <div className='artist-image'>
        <Skeleton variant="circular" width={98} height={98} />
      </div>
      <div className='artist-box-info'>
        <Skeleton variant="rounded" width={width} height={15} sx={{ marginBottom: '6px' }} />

        {showSubText && (
          <Skeleton
            variant="rounded"
            width="40%"
            height={15}
          />
        )}
      </div>
    </div>
  )
}

export default ArtistSkeleton