import Image from 'next/image'

function CheckSquareOff({ className }: { className?: string }) {
  return (
    <div className={ `${className} check-square-off` }>
    <Image
        src='/icons/check-square-off.svg'
        alt='약관동의버튼-off'
        width={0}
        height={0}
    />
    </div>
  )
}

export default CheckSquareOff