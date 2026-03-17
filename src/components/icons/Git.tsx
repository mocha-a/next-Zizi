import Image from 'next/image'

function Git({ className }: { className?: string }) {
  return (
    <div className={ `${className} git` }>
    <Image
        src='/icons/git.svg'
        alt='더보기'
        width={0}
        height={0}
    />
    </div>
  )
}

export default Git