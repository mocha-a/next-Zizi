interface PropsType {
  tagbtn: React.ReactNode;
  className?: string;
}

function TagBtn({ tagbtn, className = '' }: PropsType) {
    return (
    <div className={`tagbtn ${className}`}>{tagbtn}</div>
    )
}

export default TagBtn