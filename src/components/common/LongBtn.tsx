interface PropsType {
  label: React.ReactNode;
  className?: string;
}

function LongBtn({ label, className = '' }: PropsType) {
    return (
    <button className={`longbtn ${className}`}>{label}</button>
    )
}

export default LongBtn