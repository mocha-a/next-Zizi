'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Dialog from '@mui/material/Dialog';
import TrackDialogContent from '@/components/common/TrackDialogContent';
import { useTrackDialog } from '@/store/useTrackDialog';

export default function GlobalTrackDialog() {
  const pathname = usePathname();
  const { open, track, closeDialog } = useTrackDialog();

  useEffect(() => {
    closeDialog();
  }, [pathname, closeDialog]);

  return (
    <Dialog open={open} onClose={closeDialog}>
      {track && (
        <TrackDialogContent trackData={track} />
      )}
    </Dialog>
  );
}