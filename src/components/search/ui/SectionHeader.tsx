'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTabStore } from '@/store/tabStore';
import { useSearchStore } from '@/store/searchStore';
import { SearchCategory } from '@/types/spotify';

interface Props {
  title: string;
  type?: SearchCategory;
  targetIndex?: number;
}

const SectionHeader = ({ title, type, targetIndex }: Props) => {
  const router = useRouter();
  const { setTabValue } = useTabStore();
  const { searchQuery } = useSearchStore();

  const onClick = () => {
    if (typeof targetIndex === 'number') {
      setTabValue(targetIndex);
    }
    
    if (type && searchQuery) {
      const base = `/search/${encodeURIComponent(searchQuery)}`;
      router.push(`${base}?type=${type}`, { scroll: true });
    }
  };

  return (
    <div className="section-header" onClick={onClick}>
      <h2>{title}</h2>
    </div>
  );
};

export default SectionHeader;