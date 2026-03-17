import Image from 'next/image'

function Dot3({ className }: { className?: string }) {
  return (
    <div className={ `${className} dot3` }>
    <Image
        src='/icons/dot3.svg'
        alt='더보기'
        width={0}
        height={0}
    />
    </div>
  )
}

export default Dot3