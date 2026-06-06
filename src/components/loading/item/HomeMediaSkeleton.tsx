import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const HomeMediaSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rectangular" width={150} height={150} sx={{ marginBottom: '10px' }}/>
      <Skeleton variant="rectangular" width="80%" height={15} sx={{  marginBottom: '6px' }} />
      <Skeleton variant="rectangular" width="40%" height={15} />
    </div>
  )
}

export default HomeMediaSkeleton