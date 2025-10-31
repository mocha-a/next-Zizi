import Image from 'next/image'

function MoreArrow({ className }: { className?: string }) {
  return (
    <div className={ `${className} more-arrow` }>
    <Image
        src='/icons/more-arrow.svg'
        alt='더보기'
        width={5}
        height={10}
    />
    </div>
  )
}

export default MoreArrow