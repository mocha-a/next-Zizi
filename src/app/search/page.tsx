'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

import SearchLayout from './SearchLayout';
import TrendingSearches from '@/components/search/ui/TrendingSearches';
import TrendingTags from '@/components/search/ui/TrendingTags';
import SearchTabs from '@/components/search/containers/SearchTab';

import '@/styles/search/search.scss';

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query');

  return (
    <SearchLayout>
      {!query ? (
        // 검색 전
        <>
          <TrendingSearches />
          <TrendingTags />
        </>
      ) : (
        // 검색 후
        <SearchTabs />
      )}
    </SearchLayout>
  );
}