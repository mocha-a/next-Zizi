'use client';

import React, { useState } from 'react'
import PageTitle from '@/components/common/PageTitle'
import ChartTab from '@/components/chart/ChartTab';
import Footer from '@/components/common/Footer';
import Dialog from '@mui/material/Dialog';
import { mapLastFmTrack } from '@/types/trackMapperForLastFm';
import { TrackItemData, PlayableTrack } from '@/types/trackItem';
import TrackDialogContent from '@/components/common/TrackDialogContent';


export default function PageClient() {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const [ selectedTrack, setSelectedTrack ] = useState<TrackItemData | null>(null);

    const handleYouTubeSearch = ({ artist, name }: PlayableTrack) => {
      // console.log(artist.name, name);
      const query = `${artist.name} ${name}`;
      const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleOpenDialog = (track: unknown) => {
        // console.log("재생:", track.name);
        const popupTrack = mapLastFmTrack(track as any); //
        setSelectedTrack(popupTrack); // 선택된 트랙 저장
        setIsOpen(true);         // 팝업 열기
    };

  return (
    <div className='chart-container'>
      {/* page title */}
      <PageTitle text='차트'/>
      
      {/* tab 및 tabContents */}
      <ChartTab onPlayClick={handleYouTubeSearch} onOpenDialog={handleOpenDialog}/>

      <div className='chart-footer'>
        <Footer/>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        {selectedTrack && (
          <TrackDialogContent trackData={selectedTrack}/>
        )}
      </Dialog>
    </div>
  )
}