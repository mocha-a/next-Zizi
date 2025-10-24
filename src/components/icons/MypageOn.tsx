import Image from 'next/image'

function MypageOn({ className }: { className?: string }) {
  return (
    <div className={ className }>
    <Image
        src='/icons/mypage-on.svg'
        alt='마이페이지'
        width={0}
        height={0}
    />
    </div>
  )
}

export default MypageOn