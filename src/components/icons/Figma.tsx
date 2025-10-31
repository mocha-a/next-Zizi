import Image from 'next/image'

function Figma({ className }: { className?: string }) {
  return (
    <div className={ `${className} figma` }>
    <Image
        src='/icons/figma.svg'
        alt='더보기'
        width={0}
        height={0}
    />
    </div>
  )
}

export default Figma