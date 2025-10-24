import Image from 'next/image'

function ChartOff({ className }: { className?: string }) {
  return (
    <div className={ className }>
    <Image
        src='/icons/chart-off.svg'
        alt='차트'
        width={0}
        height={0}
    />
    </div>
  )
}

export default ChartOff