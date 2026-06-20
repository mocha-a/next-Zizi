interface PropsType {
  tagbtn: React.ReactNode;
  className?: string;
  onClick?: () => void;
  readonly?: boolean;
}

const TagBtn = ({ tagbtn, className, onClick, readonly = false }: PropsType) => {
  return (
    <div
      className={`tagbtn ${readonly ? 'readonly' : ''} ${className ?? ''}`}
      onClick={onClick}
    >
      {tagbtn}
    </div>
  );
};

export default TagBtn;