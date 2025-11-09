// components/search/SearchTabs.tsx
'use client';

import React from 'react';
import { useTabStore } from '@/store/tabStore';
import TabsContainer from '@/components/common/TabsContainer';
import AllResults from './results/AllResults';
import Tracks from './results/Tracks';
import Artists from './results/Artists';
import Albums from './results/Albums';
import Playlists from './results/Playlists';

export default function SearchTabs() {
  const { tabValue, setTabValue } = useTabStore();

  const tabs = [
    { label: '전체', content: <AllResults /> },
    { label: '아티스트', content: <Artists /> },
    { label: '곡', content: <Tracks /> },
    { label: '앨범', content: <Albums /> },
    { label: '플레이리스트', content: <Playlists /> },
  ];

  return <TabsContainer tabs={tabs} tabValue={tabValue} setTabValue={setTabValue} />;
}
