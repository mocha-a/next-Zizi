import Image from 'next/image'

function Play({ className }: { className?: string }) {
  return (
    <div className={ `${className} play` }>
    <Image
        src='/icons/play.svg'
        alt='재생버튼'
        width={0}
        height={0}
    />
    </div>
  )
}

export default Play