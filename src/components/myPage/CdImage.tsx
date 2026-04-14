import Image from 'next/image'
import React, { useState } from 'react'

const CdImage = () => {
  const [ playing, setPlaying ] = useState(false);

  const handleClick = () => {
    if (playing) return; // 연타 방지

    setPlaying(true);

    setTimeout(() => {
      setPlaying(false);
    }, 1500);
  };
  
  return (
    <div className={`zizi-CD ${playing ? "spin" : ""}`} onClick={handleClick}>
      <Image
        src='/imgs/myPage/CDcase.png'
        alt='CDcase'
        width={120}
        height={102}
        className='CDcase-image'
      />
      <Image
        src='/imgs/myPage/CD.png'
        alt='CD'
        width={98}
        height={98}
        className='CD-image'
      />
    </div>
  )
}

export default CdImage