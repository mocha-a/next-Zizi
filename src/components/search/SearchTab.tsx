'use client';

import React from 'react';
import { useTabStore } from '@/store/tabStore';
import { useSearchStore } from '@/store/searchStore';
import TabsContainer from '@/components/common/TabsContainer';
import AllResults from './results/AllResults';
import Tracks from './results/Tracks';
import Artists from './results/Artists';
import Albums from './results/Albums';
import Playlists from './results/Playlists';

export default function SearchTabs() {
  const { tabValue, setTabValue } = useTabStore();
  const { fetchSectionIfNeeded } = useSearchStore();

  const tabs = [
    { label: '전체', content: <AllResults /> },
    { label: '아티스트', type: "artist", content: <Artists /> },
    { label: '곡', type: "track", content: <Tracks /> },
    { label: '앨범', type: "album", content: <Albums /> },
    { label: '플레이리스트', type: "playlist", content: <Playlists /> },
  ];

  // 탭 클릭 핸들러
  const TabChange = async (index: number) => {
    setTabValue(index);

    switch (index) {
      case 1: // 아티스트
        await fetchSectionIfNeeded('artist');
        break;
      case 2: // 곡
        await fetchSectionIfNeeded('track');
        break;
      case 3: // 앨범
        await fetchSectionIfNeeded('album');
        break;
      case 4: // 플레이리스트
        await fetchSectionIfNeeded('playlist');
        break;
    }
  };

  return <TabsContainer tabs={tabs} tabValue={tabValue} setTabValue={TabChange} fullWidth={false} tabMarginRight="20px"/>;
}