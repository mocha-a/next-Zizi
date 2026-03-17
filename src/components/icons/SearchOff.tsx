import Image from 'next/image'

function SearchOff({ className }: { className?: string }) {
  return (
    <div className={ className }>
    <Image
        src='/icons/search-off.svg'
        alt='검색'
        width={0}
        height={0}
    />
    </div>
  )
}

export default SearchOff