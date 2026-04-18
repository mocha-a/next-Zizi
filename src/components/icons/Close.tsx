'use client';
import Image from 'next/image'

function Close({ className, onClick }: { className?: string, onClick?: () => void }) {

  return (
    <button className={ `${className} close` } onClick={onClick}>
      <Image
          src='/icons/close.svg'
          alt='닫기버튼'
          width={0}
          height={0}
      />
    </button>
  )
}

export default Close