'use client';

import React from 'react';
import MoreArrow from '@/components/icons/MoreArrow';
import { useTabStore } from '@/store/tabStore';
import { useSearchStore } from '@/store/searchStore';
import { SearchCategory } from '@/types/spotify';

interface Props {
  title: string;
  type?: SearchCategory;
  targetIndex?: number; // 클릭 시 이동할 탭 index
}

const SectionHeader = ({ title, type, targetIndex }: Props) => {
  const { setTabValue } = useTabStore();
  const { fetchSectionIfNeeded } = useSearchStore();

  const onClick = async () => {
    if (type) await fetchSectionIfNeeded(type); // 여기서 필요한 데이터 fetch
    if (typeof targetIndex === 'number') setTabValue(targetIndex); // 탭 이동
  };

  return (
    <div className="section-header" onClick={onClick}>
      <h2>{title}</h2>
      <MoreArrow />
    </div>
  );
};

export default SectionHeader;