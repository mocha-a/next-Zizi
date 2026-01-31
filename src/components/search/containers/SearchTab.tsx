'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTabStore } from '@/store/tabStore';
import { useSearchStore } from '@/store/searchStore';
import TabsContainer from '@/components/common/TabsContainer';

import Results from '../results/Results';
import SearchArtists from './SearchArtists';
import SearchAlbums from './SearchAlbums';
import SearchPlaylists from './SearchPlaylists';
import SearchTracks from './SearchTracks';

interface SearchTabsProps {
  type?: string;
}

const TAB_TYPES = ['all', 'artist', 'track', 'album', 'playlist'] as const;
type TabType = typeof TAB_TYPES[number];

const typeToIndex = (type?: string) =>
  Math.max(TAB_TYPES.indexOf(type as TabType), 0);

const indexToType = (index: number): TabType =>
  TAB_TYPES[index] ?? 'all';

export default function SearchTabs({ type }: SearchTabsProps) {
  const router = useRouter();
  const { tabValue, setTabValue } = useTabStore();
  const { searchQuery } = useSearchStore();

  const tabs = [
    { label: '전체', content: <Results /> },
    { label: '아티스트', content: <SearchArtists /> },
    { label: '곡', content: <SearchTracks /> },
    { label: '앨범', content: <SearchAlbums /> },
    { label: '플레이리스트', content: <SearchPlaylists /> },
  ];

  /* ✅ URL(type) → tab 동기화 */
  useEffect(() => {
    setTabValue(typeToIndex(type));
  }, [type, setTabValue]);

  /* ✅ 탭 클릭 → URL 변경 */
  const handleTabChange = (index: number) => {
    const nextType = indexToType(index);
    const base = `/search/${encodeURIComponent(searchQuery)}`;

    router.push(
      nextType === 'all' ? base : `${base}?type=${nextType}`,
      { scroll: true }
    );
  };

  return (
    <TabsContainer
      tabs={tabs}
      tabValue={tabValue}
      setTabValue={handleTabChange}
      fullWidth={false}
      tabMarginRight="20px"
    />
  );
}
