import Image from 'next/image'

interface Props{
  className?: string;
  opacity?: number;
}

function PlayBk({ className, opacity = 1 }: Props) {
  return (
    <div className={ `${className} play-bk` } style={{ opacity }}>
    <Image
        src='/icons/play-bk.svg'
        alt='재생버튼-black'
        width={0}
        height={0}
    />
    </div>
  )
}

export default PlayBk