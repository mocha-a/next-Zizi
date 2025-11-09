import Image from 'next/image'

function PlayBorder({ className }: { className?: string }) {
  return (
    <div className={ `${className} play-border` }>
    <Image
        src='/icons/play-border.svg'
        alt='재생버튼-border'
        width={0}
        height={0}
    />
    </div>
  )
}

export default PlayBorder