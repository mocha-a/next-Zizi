'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import TabsContainer from '@/components/common/TabsContainer';
import Results from '../results/Results';
import SearchArtists from './SearchArtists';
import SearchAlbums from './SearchAlbums';
import SearchPlaylists from './SearchPlaylists';
import SearchTracks from './SearchTracks';

const TAB_TYPES = ['all', 'artist', 'track', 'album', 'playlist'] as const;
type TabType = typeof TAB_TYPES[number];

const typeToIndex = (type?: string) =>
  Math.max(TAB_TYPES.indexOf(type as TabType), 0);

const indexToType = (index: number): TabType =>
  TAB_TYPES[index] ?? 'all';

export default function SearchTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams?.get('query') ?? '';
  const type = searchParams?.get('type') ?? 'all';

  const tabValue = typeToIndex(type);

  const tabs = [
    { label: '전체', content: <Results /> },
    { label: '아티스트', content: <SearchArtists /> },
    { label: '곡', content: <SearchTracks /> },
    { label: '앨범', content: <SearchAlbums /> },
    { label: '플레이리스트', content: <SearchPlaylists /> },
  ];

  const handleTabChange = (index: number) => {
    const nextType = indexToType(index);

    const base = `/search?query=${encodeURIComponent(query)}`;

    router.push(
      nextType === 'all'
        ? base
        : `${base}&type=${nextType}`,
      { scroll: true }
    );
  };

  return (
    <TabsContainer
      tabs={tabs}
      tabValue={tabValue}
      setTabValue={handleTabChange}
      fullWidth={false}
      tabMarginRight='20px'
    />
  );
}