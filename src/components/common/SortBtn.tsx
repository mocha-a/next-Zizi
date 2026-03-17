import React from 'react';
import Drop from '../icons/Drop';

interface props{
  label: string; 
  setOpenSort: React.Dispatch<React.SetStateAction<boolean>>;
};

const SortBtn = ({ label, setOpenSort }: props) => {
  return (
    <div className='sortBtn-wrapper'>
      <button
          className='sortBtn'
          onClick={() => setOpenSort(true)}
      >
          <div>{label}</div>
          <Drop />
      </button>
    </div>
  )
}

export default SortBtn