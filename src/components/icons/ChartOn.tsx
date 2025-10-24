import Image from 'next/image'

function ChartOn({ className }: { className?: string }) {
  return (
    <div className={ className }>
    <Image
        src='/icons/chart-on.svg'
        alt='차트'
        width={0}
        height={0}
    />
    </div>
  )
}

export default ChartOn