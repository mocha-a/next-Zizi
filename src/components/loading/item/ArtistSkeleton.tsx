import React from 'react';
import Skeleton from '@mui/material/Skeleton';

interface Props {
  showSubText?: boolean;
}

const ArtistSkeleton = ({ showSubText = true }: Props) => {
  return (
    <div className='artist-box'>
      <div className='artist-image'>
        <Skeleton variant="circular" width={98} height={98} />
      </div>
      <div className='artist-box-info'>
        <Skeleton variant="rounded" width="50%" height={15} sx={{ marginBottom: '6px' }} />

        {showSubText && (
          <Skeleton
            variant="rectangular"
            width="40%"
            height={15}
          />
        )}
      </div>
    </div>
  )
}

export default ArtistSkeleton