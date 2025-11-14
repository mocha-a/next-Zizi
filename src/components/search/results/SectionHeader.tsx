import React from 'react';
import MoreArrow from '@/components/icons/MoreArrow';
import { useTabStore } from '@/store/tabStore';
import { useSearchStore } from '@/store/searchStore';

interface Props {
  title: string;
  targetIndex?: number;
  type?: string;
}

const SectionHeader = ({ title, targetIndex, type }: Props) => {
  const { setTabValue } = useTabStore();
  const { searchQuery, fetchSearchResults } = useSearchStore();

  const onClick = async () => {
    if (!searchQuery) return;
    
    if (type) await fetchSearchResults(searchQuery, type, 50);
    if (typeof targetIndex === 'number') setTabValue(targetIndex);
  };

  return (
    <div className="section-header" onClick={onClick}>
      <h2>{title}</h2>
      <MoreArrow />
    </div>
  );
};

export default SectionHeader;