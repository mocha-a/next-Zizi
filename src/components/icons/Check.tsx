import Image from 'next/image'

function Check({ className }: { className?: string }) {
  return (
    <div className={ `${className} check` }>
    <Image
        src='/icons/check.svg'
        alt='선택버튼'
        width={0}
        height={0}
    />
    </div>
  )
}

export default Check