import React from 'react'
import Badge from '@mui/material/Badge';

interface Props {
  count: number;
  setShowDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrashButton = ({ setShowDeletePopup, count }: Props) => {
  return (
    <Badge 
      badgeContent={count}
      className='delete-bar'
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: '#058cd7',
          color: '#fff',
          fontFamily: 'var(--font-Galmuri9)',
          fontSize: '10px',
          transform: 'scale(1.1) translate(0%, -50%) translateX(18px)',
        },
      }}
    >
      <div onClick={() => setShowDeletePopup(true)} >
        <div className='trash'>🗑️ 삭제</div>
      </div>
    </Badge>
  )
}

export default TrashButton