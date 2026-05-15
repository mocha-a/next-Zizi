import Image from 'next/image'

function Plus({ className }: { className?: string }) {
  return (
    <div className={ className }>
    <Image
        src='/icons/Plus.svg'
        alt='차트'
        width={0}
        height={0}
    />
    </div>
  )
}

export default Plus