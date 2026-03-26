'use client';

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';
import PageTitle from '@/components/common/PageTitle'
import ChartTab from '@/components/chart/ChartTab';
import Footer from '@/components/common/Footer';
import Dialog from '@mui/material/Dialog';
import TrackDialogContent from '@/components/common/TrackDialogContent';
import { useTrackDialog } from '@/store/useTrackDialog';


export default function PageClient() {
  const pathname = usePathname();
  const { open, track, closeDialog } = useTrackDialog();

  useEffect(() => {
    closeDialog();
  },[pathname])

  return (
    <div className='chart-container'>
      {/* page title */}
      <PageTitle text='차트'/>
      
      {/* tab 및 tabContents */}
      <ChartTab />

      <div className='chart-footer'>
        <Footer/>
      </div>

      <Dialog open={open} onClose={closeDialog}>
        {track && (
          <TrackDialogContent trackData={track}/>
        )}
      </Dialog>
    </div>
  )
}