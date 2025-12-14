import Image from 'next/image'

function CheckSquareOn({ className }: { className?: string }) {
  return (
    <div className={ `${className} check-square-on` }>
    <Image
        src='/icons/check-square-on.svg'
        alt='약관동의버튼-on'
        width={0}
        height={0}
    />
    </div>
  )
}

export default CheckSquareOn