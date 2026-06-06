import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const ArtistSkeleton = () => {
  return (
    <div className='artist-box'>
      <div className='artist-image'>
        <Skeleton variant="circular" width={98} height={98} />
      </div>
      <div className='artist-box-info'>
        <Skeleton variant="rectangular" width="50%" height={15} sx={{ marginBottom: '6px' }} />
        <Skeleton variant="rectangular" width="20%" height={15}  />
      </div>
    </div>
  )
}

export default ArtistSkeleton