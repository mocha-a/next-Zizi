import Image from 'next/image'

function HomeOn({ className }: { className?: string }) {
  return (
    <div className={ className }>
    <Image
        src='/icons/home-on.svg'
        alt='홈'
        width={0}
        height={0}
    />
    </div>
  )
}

export default HomeOn