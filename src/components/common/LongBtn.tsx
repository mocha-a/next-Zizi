interface PropsType {
  label: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function LongBtn({ label, className = '', onClick }: PropsType) {
  return (
    <button className={`longbtn ${className}`} onClick={onClick}>
      {label}
    </button>
  )
}

export default LongBtn