'use client';
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  className?: string;
  onBack?: () => void;
}

function Back({ className, onBack }: Props) {
  const router = useRouter();

  const goBack = () => {
    onBack?.();
    router.back();
  }

  return (
    <button className={ `${className} back` } onClick={goBack} type="button">
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