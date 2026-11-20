'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

import '@/styles/common/splash.scss';

const Splash = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="splash-overlay">
      <div className="splash-CD">
        <Image
          src="/imgs/myPage/CDcase.png"
          alt="CD case"
          width={310}
          height={264}
          className="splash-CDcase"
          priority
        />
        <Image
          src="/imgs/myPage/CD.png"
          alt="CD"
          width={253}
          height={253}
          className="splash-CDimage"
        />
      </div>
    </div>
  )
}

export default Splash