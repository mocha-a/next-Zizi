import Image from 'next/image'

function Fans({ className }: { className?: string }) {
  return (
    <div className={ className }>
    <Image
        src='/icons/fans.svg'
        alt='팔로워'
        width={0}
        height={0}
    />
    </div>
  )
}

export default Fans;