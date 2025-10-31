import Image from 'next/image'

function PlayBk({ className }: { className?: string }) {
  return (
    <div className={ `${className} play-bk` }>
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