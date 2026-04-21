import Skeleton from '@mui/material/Skeleton'
import React from 'react'

const ResultsArtistSkeleton = () => {
  return (
    <div className='artist-box'>
      <div className='artist-image'>
        <Skeleton variant="circular" width={98} height={98} />
      </div>
      <div className='artist-box-info'>
        <Skeleton variant="text" sx={{ fontSize: '0.8125rem', width: '50%', marginBottom: '6px' }} />
        <Skeleton variant="text" sx={{ fontSize: '0.8125rem', width: '50%' }} />
      </div>
    </div>
  )
}

export default ResultsArtistSkeleton