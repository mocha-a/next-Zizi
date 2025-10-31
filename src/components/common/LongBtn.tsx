interface PropsType {
  longbtn: React.ReactNode;
  className?: string;
}

function LongBtn({ longbtn, className = '' }: PropsType) {
    return (
    <div className={`longbtn ${className}`}>{longbtn}</div>
    )
}

export default LongBtn