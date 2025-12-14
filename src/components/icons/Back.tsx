'use client';

import Image from 'next/image'
import { useRouter } from 'next/navigation'

function Back({ className }: { className?: string }) {
  const router = useRouter();

  const goBack = () => {
    router.back(); // 이전 페이지로 이동
    // 특정 페이지로 이동 원할 시 router.push('/page-name')
  }

  return (
    <button className={ `${className} back` } onClick={goBack}>
      <Image
          src='/icons/back.svg'
          alt='뒤로가기버튼'
          width={0}
          height={0}
      />
    </button>
  )
}

export default Back