import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const HomeMediaSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rectangular" width={150} height={150} sx={{ marginBottom: '10px' }}/>
      <Skeleton variant="text" sx={{ fontSize: '13px', width: '50%', marginBottom: '6px' }} />
      <Skeleton variant="text" sx={{ fontSize: '13px', width: '50%' }} />
    </div>
  )
}

export default HomeMediaSkeleton