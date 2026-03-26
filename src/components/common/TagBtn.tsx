interface PropsType {
  tagbtn: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const TagBtn =({ tagbtn, className, onClick }: PropsType) => {
  return (
    <div className={`tagbtn ${className}`} onClick={onClick}>
      {tagbtn}
    </div>
  )
}

export default TagBtn