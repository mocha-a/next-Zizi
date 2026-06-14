interface PropsType {
  label: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

function LongBtn({ label, className = '', onClick, disabled = false, }: PropsType) {
  return (
    <button className={`longbtn ${className}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

export default LongBtn