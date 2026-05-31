import Skeleton from '@mui/material/Skeleton'
import React from 'react'

const MediaPageSkeleton = () => {
  return (
    <>
      <div className='playlist-detail-img album-detail-img skeleton'>
        <Skeleton variant="rectangular" width={200} height={200} />
      </div>

      <p>
        <Skeleton variant="rectangular" width={230} height={22} />
      </p>
      <Skeleton variant="rectangular" width={180} height={25} sx={{ margin: '10px 0 15px' }}/>
      <div className='skeleton skeleton-title' />

      <div className='playlist-detail-info album-detail-info'>
        <Skeleton variant="rectangular" width={180} height={15} sx={{ margin: '15px 0' }}/>
      </div>

      <div className='playlist-detail-creator album-detail-artist'>
        <div className='creator-badge artist-badge'>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="rectangular" width={100} height={15} />
        </div>
      </div>
    </>
  )
}

export default MediaPageSkeleton