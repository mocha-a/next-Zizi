import Image from 'next/image';

const EyeOff = ({ className }: { className?: string }) => {
  return (
    <div className={ `${className} eyeOff` }>
      <Image
        src='/icons/eye-off.svg'
        alt='비밀번호 숨기기'
        width={20}
        height={20}
    />
    </div>
  )
}

export default EyeOff