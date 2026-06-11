'use client';

import Snackbar from '@mui/material/Snackbar';
import { useSnackbarStore } from '@/store/useSnackbarStore';

export default function AppSnackbar() {
  const { open, message, hide } = useSnackbarStore();

  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      onClose={hide}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      message={<span className="snackbar-message">{message}</span>}
      className="snackbar-container"
    />
  );
}