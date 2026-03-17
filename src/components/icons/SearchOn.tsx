import Image from 'next/image'

function SearchOn({ className }: { className?: string }) {
  return (
    <div className={ className }>
    <Image
        src='/icons/search-on.svg'
        alt='검색'
        width={0}
        height={0}
    />
    </div>
  )
}

export default SearchOn