import Image from 'next/image';

const Eye = ({ className }: { className?: string }) => {
  return (
    <div className={ `${className} eye` }>
      <Image
        src='/icons/eye.svg'
        alt='비밀번호 표시'
        width={20}
        height={20}
    />
    </div>
  )
}

export default Eye