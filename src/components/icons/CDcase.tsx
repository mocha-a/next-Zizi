import React from 'react'
import Image from 'next/image'

const CDcase = ({ className }: { className?: string }) => {
  return (
    <div className={ className }>
    <Image
      src='/imgs/empty.png'
      alt='빈케이스'
      width={727}
      height={619}
    />
    </div>
  )
}

export default CDcase