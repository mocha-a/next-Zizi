import React from 'react'
import Badge from '@mui/material/Badge';

interface Props {
  count: number;
  onDelete: () => void;
}

const TrashButton = ({ onDelete, count }: Props) => {
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
      <button
        type='button'
        className='trash'
        onClick={onDelete}
      >
        🗑️ 삭제
      </button>
    </Badge>
  )
}

export default TrashButton