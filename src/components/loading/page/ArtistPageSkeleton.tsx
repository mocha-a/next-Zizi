import React from 'react'
import Skeleton from '@mui/material/Skeleton'
import Back from '@/components/icons/Back';

const ArtistPageSkeleton = () => {
  return (
    <>
      <section className="artist-top">
        <div className="artist-img">
          <Skeleton variant="rectangular" width="100%" height="100%" className='fade-mask'/>

          <div className="artist-backBtn">
            <Back className ='detailHeader' />
          </div>

          <h1 className="artist-name">
            <Skeleton variant="rectangular" width={120} height={35} />
          </h1>
        </div>

        <div className="artist-info">
          <Skeleton variant="rectangular"width={150} height={22} sx={{ margin: '12px 0 2px' }}/>
          <Skeleton variant="rectangular" width={200} height={22} />
        </div>
      </section>
    </>
  )
}

export default ArtistPageSkeleton