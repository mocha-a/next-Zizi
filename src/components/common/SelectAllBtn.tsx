import Check from "../icons/Check";

interface Props {
  isAllSelected: boolean;
  onClick: () => void;
}

const SelectAllBtn = ({ isAllSelected, onClick }: Props) => {
  return (
    <div className='action-btn' onClick={onClick}>
      <Check />
      <p>
        {isAllSelected ? '전체 해제' : '전체 선택'}
      </p>
    </div>
  );
};

export default SelectAllBtn;