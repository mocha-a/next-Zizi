'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface BottomDialogProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

export default function BottomDialog({ open, onClose, children, title }: BottomDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="bottom-dialog"
      slots={{
        transition: Transition,
      }}
      slotProps={{
        paper: {
          sx: {
            width: '390px',
            margin: 0,
            padding: "10px 0",
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            boxShadow: 24,
          },
        },
      }}
    >
    {/* 헤더 */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: "10px 18px",
      }}
    >
      <h2 className="password-find-title"> {title} </h2>

      <IconButton 
      onClick={onClose} 
      sx={{ 
        padding: '2px 5px 4px 7px', 
        color: 'currentColor',
        '&:hover, &:active, &:focus': {
          backgroundColor: '#E9F7FF',
        },
      }}>
        <span className="dialog-close"> ×</span>
      </IconButton>
    </Box>

      {/* 내용 */}
      {children}
    </Dialog>
  );
}
