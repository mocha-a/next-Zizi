import Image from 'next/image';

function Drop({ className }: { className?: string }) {
  return (
    <div className={ `${className} drop` }>
    <Image
        src='/icons/drop.svg'
        alt='더보기'
        width={9}
        height={7}
    />
    </div>
  )
}

export default Drop