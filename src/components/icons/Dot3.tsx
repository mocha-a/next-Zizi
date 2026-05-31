import Image from 'next/image'

interface Props{
  className?: string;
  opacity?: number;
}

function Dot3({ className, opacity = 1 }: Props) {
  return (
    <div className={ `${className} dot3` } style={{ opacity }}>
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