import Image from 'next/image'

function HomeOff({ className }: { className?: string }) {
  return (
    <div className={ className }>
    <Image
        src='/icons/home-off.svg'
        alt='홈'
        width={0}
        height={0}
    />
    </div>
  )
}

export default HomeOff