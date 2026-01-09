'use client';

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import Drop from '../icons/Drop';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface BottomDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function BottomDialog({
  open,
  onClose,
  children,
}: BottomDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          width: '390px',
          margin: 0,
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          boxShadow: 24,
        },
      }}
    >
      {/* 헤더 */}
      <Box>
        <IconButton onClick={onClose} sx={{ color: 'inherit' }}>
          <Drop />
        </IconButton>
      </Box>

      {/* 내용 */}
      {children}
    </Dialog>
  );
}
