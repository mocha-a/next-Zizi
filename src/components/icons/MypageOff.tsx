import Image from 'next/image'

function MypageOff({ className }: { className?: string }) {
  return (
    <div className={ className }>
    <Image
        src='/icons/mypage-off.svg'
        alt='마이페이지'
        width={0}
        height={0}
    />
    </div>
  )
}

export default MypageOff