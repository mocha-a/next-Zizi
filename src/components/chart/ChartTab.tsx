'use client';

import React from 'react'
import { useTabStore } from '@/store/tabStore';
import TabsContainer from '@/components/common/TabsContainer';
import ChartTabContent from './ChartTabContent';
import type { PlayableTrack, TrackItemData } from '@/types/trackItem';

interface Props {
  onOpenDialog: (track: TrackItemData) => void;
  onPlayClick: (track: PlayableTrack) => void;
}

function ChartTab({ onOpenDialog, onPlayClick }: Props) {
    const { tabValue, setTabValue } = useTabStore();
        
    const tabs = [
    { label: '인기차트', content: <ChartTabContent tabType={'top'} onOpenDialog={onOpenDialog} onPlayClick={onPlayClick}/> },
    { label: '장르별', content: <ChartTabContent tabType={'genre'} onOpenDialog={onOpenDialog} onPlayClick={onPlayClick}/> },
    { label: '무드별', content: <ChartTabContent tabType={'mood'} onOpenDialog={onOpenDialog} onPlayClick={onPlayClick}/> },
    ];

  return (
    <TabsContainer tabs={tabs} tabValue={tabValue} setTabValue={setTabValue} fullWidth={true} width={true}/>
  )
}

export default ChartTab