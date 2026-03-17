interface PropsType {
  label: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function ShortBtn({ label, active, onClick }: PropsType) {
    return (
     <button className={`shortbtn ${active ? 'active' : 'basic'}`} onClick={onClick}>
        {label}
    </button>
    )
}

export default ShortBtn