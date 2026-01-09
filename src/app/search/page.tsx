import React from 'react';

import SearchLayout from './SearchLayout';
import TrendingSearches from '@/components/search/ui/TrendingSearches';
import TrendingTags from '@/components/search/ui/TrendingTags';

import '../../styles/search/search.scss';

function Page() {
  return (
    <SearchLayout>
      <TrendingSearches />
      <TrendingTags />
    </SearchLayout>
  );
}

export default Page